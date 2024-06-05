import { marked } from 'marked';
import type {  CurrentPage } from "../index.js"
import type { Tokens } from "marked"

/** handle html */
export default function(token:Tokens.Paragraph | Tokens.Generic,page:CurrentPage){
    if(token.type!=="hr"){
        page.content+= marked.parse(token.raw)
    }
}