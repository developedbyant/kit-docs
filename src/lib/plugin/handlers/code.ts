import utils, { codeHighlighter } from "../utils.js"
import type {  CurrentPage } from "../index.js"
import type { Tokens } from "marked"

/** Return code highlighted */
const template = async(code:string,lang:any)=>`<div data-md="code">
    <button onclick={copyText}>Copy</button>
    ${await codeHighlighter(code,lang,"slack-dark")}
</div>
`

/** handle code */
export default async function(token:Tokens.Code | Tokens.Generic,page:CurrentPage){
    // remove lines to highlight from code lang
    const lang = token.lang.toLowerCase().trim();
    const highLightedCode = await template(token.text,lang);
    page.content+= highLightedCode
    // add copy text function to script tag
    if(!page.code.includes('copyText(e:MouseEvent)')) page.code+=utils.copyTextFunc()
}