import fs from "fs"
import path from "path"
import { marked } from 'marked';
import { readFolder } from "./utils.js"
import heading from "./handlers/heading.js"
import paragraph from "./handlers/paragraph.js"
import code from "./handlers/code.js"
import list from "./handlers/list.js"
import html from "./handlers/html.js"
import type { AppJsonData } from "../index.js";
import type { CurrentPage,PageData,Options,MetaData } from "./types.js"
export type { CurrentPage,PageData,Options,MetaData }

/** Plugin to convert markdown files to svelte routes 
 * @param baseFolder the base folder where docs will be created at example: docs for src/(docs)/docs */
export default async function plugin(baseFolder:string,options:Options){
    // return plugin
    return {
		name: 'kitdocs',
		async handleHotUpdate(data:{ file:string,server:any }){
            const runFunc = ( data.file.endsWith(".md") && data.server.config.mode==="development" )
            if(!runFunc) return
            // if server api file does not exists create one
            const serverApiPath = `src/routes/(docs)/${baseFolder}/+server.ts`;
            if(!fs.existsSync(path.dirname(serverApiPath))) fs.mkdirSync(path.dirname(serverApiPath))
            if(!fs.existsSync(serverApiPath)){
                const serverApiData = `import { json } from "@sveltejs/kit";
                import { cookieSet } from "kitdocs/utils";
                import type { DocTheme } from "kitdocs"
                import type { RequestHandler } from "./$types.js";
                
                export const POST:RequestHandler = async(event)=>{
                    // set theme
                    const currentTheme = (event.cookies.get("theme") || "light") as DocTheme
                    cookieSet(event,"theme",(currentTheme==="dark" ? "light" : "dark"))
                    return json({ message:"test" })
                }`
                fs.writeFileSync(serverApiPath,serverApiData,{})
            }
            // if devMode is set to true, delete all generated directories in docs folder
            if(options?.devMode && fs.existsSync(`src/routes/(docs)/${baseFolder}`)){
                const markdowns:string[] = readFolder(`src/routes/(docs)/${baseFolder}`,true)
                for(const markdownPath of markdowns){ fs.rmSync(markdownPath, { recursive: true, force: true }) }
                fs.rmSync(`src/routes/(docs)/${baseFolder}/+page.svelte`, { recursive: true, force: true })
            }
            // run code
            const appJsonPath = `${process.cwd()}/src/app.json`;
            // create default src/app.json file
            if(!fs.existsSync(appJsonPath)){
                const defaultAppJsonData = {
                    projectName:"kitDocs",socialMedia:[{name: "twitter",link: "https://x.com/developedByAnt"}],
                    navLinks:[{text: "Home",href: "/",external: false},{text: "Documentation",href: "/docs",external: false}],
                    footerLinks:[ {title:"",links:[{text: "Home",href: "/",external: false},{text: "Documentation",href: "/docs",external: false}]} ],
                    kitDocs:{}
                }
                fs.writeFileSync(appJsonPath,JSON.stringify(defaultAppJsonData,null,4))
            }
            // read app.json data
            const appJsonData:AppJsonData = JSON.parse(fs.readFileSync(appJsonPath).toString())
            const newDataRes = await handleMarkdowns(baseFolder,options)
            const newData:AppJsonData['kitDocs'] = {} 
            for(const data of newDataRes){
                // Create layout object key
                if(!(data.layout in newData)) newData[data.layout] = []
                // add page(data) to the correct layout
                newData[data.layout].push(data)
            }
            // For some reason layout links are showing in reversed, so we need to reversed theme
            for(const layout of Object.keys(newData)){
                newData[layout] = newData[layout].toReversed()
            }
            // Update kitDocs object in json data
            appJsonData['kitDocs'] = newData
            // Save all changes made
            fs.writeFileSync(appJsonPath,JSON.stringify(appJsonData,null,4))


            // create page for markdown that changed
            // if(options.singleFileMode){
            //     const singleFileResult = await handleSingleMarkdown(data.file,outPutDir,options)
            //     const layout = Object.keys(singleFileResult)[0]
            //     if(singleFileResult && layout in appJsonData.kitDocs){
            //         const mdPageData = singleFileResult[layout][0]
            //         const index = appJsonData.kitDocs[layout].findIndex(data=>data.href===mdPageData.href)
            //         appJsonData.kitDocs[layout][index] = mdPageData
            //     }
            // }
            // loop all markdown files
            // else appJsonData['kitDocs'] = await mdToSvelte(outPutDir,options)
            // save updates
            // fs.writeFileSync(appJsonPath,JSON.stringify(appJsonData,null,4))
        }
    }
}

/** Handle all markdown files in directory pages */
async function handleMarkdowns(baseFolder:string,options:Options) {
    const result:PageData[] = []
    const markdowns:string[] = readFolder("pages")
    // Loop all markdown files
    for(const markdownPath of markdowns.toReversed()){
        const { pageData,slug } = await handleMarkdown(markdownPath,baseFolder)
        // If page's metaData does not includes layout,title and description, skip page
        if(Object.keys(pageData.metaData).length<3) continue
        // else create page
        /** Svelte page's path */
        const svelteRoutePath = `src/routes/(docs)/${slug}/+page.svelte`
        // Create page's folder and sub folders if needed
        fs.mkdirSync(path.dirname(svelteRoutePath), { recursive: true });
        // Create svelte page(route)
        fs.writeFileSync(svelteRoutePath,createPage(pageData,slug,options))
        // return result
        const pageLayout = pageData.metaData.layout
        result.push({
            layout:pageLayout,
            title:pageData.metaData.title,
            href:`/${slug}`,
            description:pageData.metaData.description,
            new:pageData.metaData.new ? true : false,
            headers:pageData.headers
        })
    }
    return result
}

/** Handle markdown file and return current page data and slug */
async function handleMarkdown(markdownPath:string,baseFolder:string) {
    // Clean and convert md path to page slug
    /** Slug for markdown path, this will output something like this:  */
    const slug = `${markdownPath.replace(/\[\d+\]/g, '').replace("/index.md","").replace(".md","")}`
    // get file tokens
    const markdownTokens = marked.lexer(fs.readFileSync(markdownPath).toString())
    /** Current page being build */
    const currentPage:CurrentPage = { code: "", content: "", css: "",metaData: {},headers:[] }
    // Loop all marked's lexer tokens
    for(const token of markdownTokens){
        // heading
        if(token.type==="heading") heading(token,currentPage)
        // paragraph
        else if(token.type==="paragraph" && !token.text.startsWith('<')) paragraph(token,currentPage)
        // space
        else if(token.type==="space") currentPage.content += `<div data-md="space"></div>\n`
        // code
        else if(token.type==="code") await code(token,currentPage)
        // list
        else if(token.type==="list") list(token,currentPage)
        // warning
        else if(token.type==="html" && token.text.startsWith("<warning>")){
            const text = (token.text.split('<warning>')[1].split('</warning>')[0]).trim()
            currentPage.content+= `<div data-md="warning">${text.trim()}</div>\n`
        }
        // style (custom style)
        else if(token.type==="html" && token.text.startsWith("<style>")){
            currentPage.css+= (token.text.split('<style>')[1].split('</style>')[0])
        }
        // script (custom code)
        else if(token.type==="html" && (token.text.startsWith("<script>") || token.text.startsWith('<script lang="ts">') || token.text.startsWith("<script lang='ts'>"))){
            const startTag = token.text.startsWith("<script>") ? "<script>" : token.text.startsWith('<script lang="ts">') ? '<script lang="ts">' : "<script lang='ts'>"
            currentPage.code+= (token.text.split(startTag)[1].split('</script>')[0])
        }
        // any html tag
        else if(token.raw.startsWith("<")) currentPage.content+= `${token.raw}\n`
        // any other tags
        else html(token,currentPage)
    }
    return { pageData:currentPage,slug:slug==="pages"?baseFolder:slug.replace('pages/',`${baseFolder}/`) }    
}

/** Create page tags */
function createPage(page:CurrentPage,slug:string,options:Options){
    const domainUrl = options.domainUrl.endsWith("/") ? options.domainUrl.slice(0,-1) : options.domainUrl
    let pageCode:string = "";
    const metaDataStoreImport = `    import { metaTagsStore } from "${options.localDev?"$lib/index.js":"kitdocs"}";`
    const metaDataSetter = `    metaTagsStore.set({ 
        appName:"${options.appName}",title:"${page.metaData.title}",description:"${page.metaData.description}",
        url:"${domainUrl+"/"+slug}",image:"${options.defaultImage}",ogType:"article" 
    });`
    const metaData = `${metaDataStoreImport}\n${metaDataSetter}`
    // add css
    if(page.code) pageCode += `<script lang="ts">\n${metaData}${page.code}\n</script>\n\n`
    // add page data
    pageCode += page.content
    // add custom style
    if(page.css) pageCode += `\n<style>${page.css}</style>`
    // return page code
    return pageCode
}