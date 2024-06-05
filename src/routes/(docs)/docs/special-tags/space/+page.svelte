<script lang="ts">
    import { metaTagsStore } from "$lib/index.js";
    metaTagsStore.set({ 
        appName:"KitDocs",title:"Space",description:"The warning tag let you add custom warning message to your page.",
        url:"https://kitdocs.dev/docs/special-tags/space",image:"https://kitdocs.dev/images/backdrop.png",ogType:"article" 
    });    /** Copy text to clipboard (Added by kitdocs) */
    async function copyText(e:MouseEvent){
        const copyButton = e.target as HTMLButtonElement
        const code = copyButton.parentElement?.querySelector("code")?.innerText as string
        await navigator.clipboard.writeText(code)
        copyButton.innerText = "Copied"
        // Set button text back to copy after 5 milliseconds
        setTimeout(()=>{ copyButton.innerText = "Copy" },1000)
    }
</script>

<h1 data-section data-md="header" id="space-tag">
    Space tag
</h1>
<p data-md="p">The warning tag let you add custom warning message to your page.
To add it to your page, simple add the <code data-md="inline-code">warning</code> tag follow by the content inside of it.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="example">
    Example
</h2>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">space</span><span style="color:#808080">&gt;&lt;/</span><span style="color:#569CD6">space</span><span style="color:#808080">&gt;</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="preview">
    Preview
</h2>
<div data-md="warning">You most update to version 0.0.5</div>
