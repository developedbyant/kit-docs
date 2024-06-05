<script lang="ts">
    import { metaTagsStore } from "$lib/index.js";
    metaTagsStore.set({ 
        appName:"KitDocs",title:"Script",description:"DescriptionHere.",
        url:"https://kitdocs.dev/docs/special-tags/script",image:"https://kitdocs.dev/images/backdrop.png",ogType:"article" 
    });
    import Test from "../../../../Test.svelte";
    let loading = $state(false);
    const onclick = ()=> loading = !loading
    /** Copy text to clipboard (Added by kitdocs) */
    async function copyText(e:MouseEvent){
        const copyButton = e.target as HTMLButtonElement
        const code = copyButton.parentElement?.querySelector("code")?.innerText as string
        await navigator.clipboard.writeText(code)
        copyButton.innerText = "Copied"
        // Set button text back to copy after 5 milliseconds
        setTimeout(()=>{ copyButton.innerText = "Copy" },1000)
    }
</script>

<h1 data-section data-md="header" id="script-tag">
    Script tag
</h1>
<p data-md="p">The <code data-md="inline-code">script</code> tag let add custom JavaScript or TypeScript code to your markdown 
files.<br>
To add it to your page, simple add the <code data-md="inline-code">script</code> tag in you markdown files and that code 
will be added to your page.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="example">
    Example
</h2>
<p data-md="p">In this example we are importing a component and writing variable <code data-md="inline-code">loading</code></p>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">Test</span><span style="color:#D4D4D4"> </span><span style="color:#C586C0">from</span><span style="color:#D4D4D4"> </span><span style="color:#CE9178">&quot;../../../../Test.svelte&quot;</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">let</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">loading</span><span style="color:#D4D4D4"> = $</span><span style="color:#DCDCAA">state</span><span style="color:#D4D4D4">(</span><span style="color:#569CD6">false</span><span style="color:#D4D4D4">);</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">const</span><span style="color:#D4D4D4"> </span><span style="color:#DCDCAA">onclick</span><span style="color:#D4D4D4"> = ()</span><span style="color:#569CD6">=&gt;</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">loading</span><span style="color:#D4D4D4"> = !</span><span style="color:#9CDCFE">loading</span></span>
<span class="line"><span style="color:#808080">&lt;/</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
</code></pre>
</div>
<p data-md="p">After that you can use it in the same markdown file.</p>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">Test</span><span style="color:#D4D4D4"> </span><span style="color:#C586C0">from</span><span style="color:#D4D4D4"> </span><span style="color:#CE9178">&quot;../../../../Test.svelte&quot;</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">let</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">loading</span><span style="color:#D4D4D4"> = $</span><span style="color:#DCDCAA">state</span><span style="color:#D4D4D4">(</span><span style="color:#569CD6">false</span><span style="color:#D4D4D4">);</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">const</span><span style="color:#D4D4D4"> </span><span style="color:#DCDCAA">onclick</span><span style="color:#D4D4D4"> = ()</span><span style="color:#569CD6">=&gt;</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">loading</span><span style="color:#D4D4D4"> = !</span><span style="color:#9CDCFE">loading</span></span>
<span class="line"><span style="color:#808080">&lt;/</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">button</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">&#123;onclick}</span><span style="color:#808080">&gt;</span><span style="color:#E6E6E6">Login</span><span style="color:#808080">&lt;/</span><span style="color:#569CD6">button</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">span</span><span style="color:#808080">&gt;</span><span style="color:#E6E6E6">loading:</span><span style="color:#569CD6">&#123;</span><span style="color:#9CDCFE">loading</span><span style="color:#569CD6">}</span><span style="color:#808080">&lt;/</span><span style="color:#569CD6">span</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#808080">&lt;</span><span style="color:#4EC9B0">Test</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">bg</span><span style="color:#E6E6E6">=</span><span style="color:#CE9178">&quot;purple&quot;</span><span style="color:#808080">&gt;</span><span style="color:#E6E6E6">Button</span><span style="color:#808080">&lt;/</span><span style="color:#4EC9B0">Test</span><span style="color:#808080">&gt;</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="preview-code">
    Preview code
</h2>
<button {onclick}>Login</button>
<span>loading:{loading}</span>
<Test bg="purple">Button</Test>
