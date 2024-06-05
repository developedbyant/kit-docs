import type {  CurrentPage } from "../index.js"
import type { Tokens } from "marked"

/** handle list */
export default function(token:Tokens.List | Tokens.Generic,page:CurrentPage){
    let code:string = ""
    for(const item of token.items){
        let itemText = item.text
        // TODO: handle sub list
        // loop all list items
        for(const itemToken of item.tokens){
            // handle token in text
            if(itemToken.type==="text"){
                for(const textToken of itemToken.tokens){
                    // handle code in item
                    if(textToken.type==="codespan"){
                        // add code
                        itemText = itemText.replaceAll(textToken.raw,`<code data-md="inline-code">${textToken.text}</code>`)
                    }
                }
            }
        }
        // create list
        code+= item.type==="list_item" ? `    <li>${itemText}</li>\n` : `    <li>${itemText}</li>\n`
    }
    // add code to page code
    code = !token.ordered ? `<ul data-md="list">\n${code}</ul>\n` : `<ol data-md="list-ordered">\n${code}</ol>\n`
    page.content+= code
}