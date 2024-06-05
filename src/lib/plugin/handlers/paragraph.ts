import utils from "../utils.js"
import type {  CurrentPage } from "../index.js"
import type { Tokens } from "marked"

/** handle paragraph */
export default function(token:Tokens.Paragraph | Tokens.Generic,page:CurrentPage){
    let code = token.text
    // if text contains things like code
    if(token.tokens){
        for(const inToken of token.tokens){
            // handle link in text
            if(inToken.type==="link"){
                // add code
                code = code.replace(inToken.raw,`<a data-md="a" href="${inToken.href}">\n    ${inToken.text}\n</a>`)
            }
            // handle code in text
            else if(inToken.type==="codespan"){
                // add copy text function to script tag
                if(!page.code.includes('copyText(e:MouseEvent)')) page.code+=utils.copyTextFunc()
                // add code
                code = code.replaceAll(inToken.raw,`<code data-md="inline-code">${inToken.text}</code>`)
            }
        }
    }
    // add code to page
    page.content += `<p data-md="p">${code}</p>\n`
}