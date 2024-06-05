import type { MetaData, CurrentPage } from "../index.js"
import type { Tokens } from "marked"
import utils from "../utils.js"

/** Handle heading or metadata */
export default function(token:Tokens.Heading | Tokens.Generic,page:CurrentPage){
    // return meta data
    if(Object.keys(page.metaData).length===0 && token.depth===2 && token.text.includes("layout:")){
        const metaData:MetaData = {}
        // console.log(token)
        for(const data of token.text.split("\n")){
            const [key,value] = data.split(": ") as [string,string]
            metaData[key.trim()] = value.trim()
        }
        // add meta data
        page.metaData = metaData
    }
    // add code to page
    else{
        const id = utils.slug(token.text).trim().toLowerCase()
        const code = `<h${token.depth} data-section data-md="header" id="${id}">\n    ${token.text}\n</h${token.depth}>\n`
        page.content += code
        // add header to page headers
        page.headers.push({ id,text:token.text })
    }
}