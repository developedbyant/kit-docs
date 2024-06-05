import { createCssVariablesTheme, getHighlighter,codeToTokens, type BundledTheme, type BundledLanguage } from "shiki"
import fs from 'fs';
import path from 'path';

/** Highlight code with line high light */
export async function codeHighlighter(rawCode:string,lang:BundledLanguage="svelte",theme:BundledTheme="slack-dark"){
    // highlight or remove code
    const initialLang = lang;
    const regex = /add\[(.*?)\]|remove\[(.*?)\]/g;
    const addRemoveMatch = initialLang.match(regex)
    let [lineToRemove,lineToAdd]:[number[],number[]] = [ [],[] ]
    if(addRemoveMatch && addRemoveMatch.length>0){
        for(const l of addRemoveMatch){
            if(l.includes("remove")) lineToRemove = JSON.parse(l.replace(/remove/i,"")) 
            else if(l.includes("add")) lineToAdd = JSON.parse(l.replace(/add/i,"")) 
        }
    }
    // clean lang
    lang = lang.replace(regex,"").trim() as any
    // run code
    const tokenResult = await codeToTokens(rawCode,{ lang,theme})
    let code = `<pre style="background-color:${tokenResult.bg};color:${tokenResult.fg}"><code style="display: flex;flex-direction:column;overflow-x: auto;">`;
    const [runHighlighter,runUnHighlighter] = [ lineToAdd.length>0,lineToRemove.length>0 ]
    // loop all tokens
    for(const index in tokenResult.tokens){
        const line = tokenResult.tokens[index]
        const highlight = (runHighlighter && lineToAdd.includes(Number(index)+1))
        const unHighlight = (runUnHighlighter && lineToRemove.includes(Number(index)+1))
        // add code
        const style = (highlight || unHighlight) ? `style="${highlight?'background: #0080001c;':''}${unHighlight?'background: #ff000017;':''}"` : ""
        code += `<span class="line"${style}>`;
        for(const token of line){
            const content = token.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/{/g,"&#123;");
            code += `<span style="color:${token.color}">${content}</span>`;
        }
        // close line tag
        code += `</span>\n`;
    }
    // close prep and code tag
    code += `</code></pre>`;
    return code;
}

/** Read folder and return files */
export function readFolder(directory:string,returnFoldersOnly=false, fileList:string[] = []) {
    const files = fs.readdirSync(directory);
    for(const file of files){
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        const isAFolder = stat.isDirectory()
        // if it's a directory
        if(isAFolder){
            // if it's set to return folders only
            if(returnFoldersOnly) fileList.push(filePath)
            // else run function again
            else readFolder(filePath,returnFoldersOnly,fileList)
        }
        // else if if is not return folder only, add file to list
        else if(!returnFoldersOnly) fileList.push(filePath)
    }
    return fileList;
}

// Create a custom CSS variables theme, the following are the default values
const myTheme = createCssVariablesTheme({ 
    name: 'css-variables',
    variablePrefix: '--shiki-',
    variableDefaults: {},
    fontStyle: true
})
const highlighter = await getHighlighter({ themes:[myTheme],langs:[] })


export default new class {
    /** Convert string to url slug */
    slug(data:string){
        // replace multiple spaces to a single space
        data = data.replace(/\s+/g, ' ')
        // remove any character or number from text, make text lower case and trim it
        data = data.replace(/[^\w\s]/g, '').toLowerCase().trim().replace(/\s+/g, '-')
        return data
    }

    /** Capitalize string */
    capitalize = (data:string) => data.charAt(0).toUpperCase()+data.slice(1)

    /** Return copy text function */
    copyTextFunc(){
    return `    /** Copy text to clipboard (Added by kitdocs) */
    async function copyText(e:MouseEvent){
        const copyButton = e.target as HTMLButtonElement
        const code = copyButton.parentElement?.querySelector("code")?.innerText as string
        await navigator.clipboard.writeText(code)
        copyButton.innerText = "Copied"
        // Set button text back to copy after 5 milliseconds
        setTimeout(()=>{ copyButton.innerText = "Copy" },1000)
    }`
    }

}