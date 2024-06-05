<script lang="ts">
    import { metaTagsStore } from "$lib/index.js";
    metaTagsStore.set({ 
        appName:"KitDocs",title:"Code highlight",description:"Highlight some code.",
        url:"https://kitdocs.dev/docs/special-tags/code-highlight",image:"https://kitdocs.dev/images/backdrop.png",ogType:"article" 
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

<h1 data-section data-md="header" id="code-highlight">
    Code highlight
</h1>
<p data-md="p">Highlight code line using tags <code data-md="inline-code">add[line1,line2]</code> to start green highlight and <code data-md="inline-code">remove[line1,line2]</code> to 
highlight with a red color.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="example">
    Example
</h2>
<p data-md="p">This example show you the way we svelte v4 handle reactive variable vs how the 
new svelte v5 handles them.</p>
<div data-md="space"></div>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#E6E6E6">    ```svelte remove[2,7] add[3,5,8]</span></span>
<span class="line"><span style="color:#E6E6E6">    &lt;script&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">        let name = &quot;John&quot;;</span></span>
<span class="line"><span style="color:#E6E6E6">        let name = $state(&quot;John&quot;);</span></span>
<span class="line"><span style="color:#E6E6E6">        /** update variable */</span></span>
<span class="line"><span style="color:#E6E6E6">        const onclick = ()=&gt; &#123; name = &quot;tony&quot; }</span></span>
<span class="line"><span style="color:#E6E6E6">    &lt;/script&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">    &lt;button on:click=&#123;onclick}&gt;Update&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">    &lt;button &#123;onclick}&gt;Update&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">    &lt;h1&gt;Hello &#123;name}&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">    ```</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="preview">
    Preview
</h2>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
<span class="line"style="background: #ff000017;"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">let</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">name</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">&quot;John&quot;</span><span style="color:#D4D4D4">;</span></span>
<span class="line"style="background: #0080001c;"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">let</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">name</span><span style="color:#D4D4D4"> = $</span><span style="color:#DCDCAA">state</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">&quot;John&quot;</span><span style="color:#D4D4D4">);</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#6A9955">/** update variable */</span></span>
<span class="line"style="background: #0080001c;"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">const</span><span style="color:#D4D4D4"> </span><span style="color:#DCDCAA">onclick</span><span style="color:#D4D4D4"> = ()</span><span style="color:#569CD6">=&gt;</span><span style="color:#D4D4D4"> &#123; </span><span style="color:#9CDCFE">name</span><span style="color:#D4D4D4"> = </span><span style="color:#CE9178">&quot;tony&quot;</span><span style="color:#D4D4D4"> }</span></span>
<span class="line"><span style="color:#808080">&lt;/</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
<span class="line"style="background: #ff000017;"><span style="color:#808080">&lt;</span><span style="color:#569CD6">button</span><span style="color:#E6E6E6"> </span><span style="color:#C586C0">on</span><span style="color:#E6E6E6">:</span><span style="color:#4EC9B0">click</span><span style="color:#E6E6E6">=</span><span style="color:#569CD6">&#123;</span><span style="color:#9CDCFE">onclick</span><span style="color:#569CD6">}</span><span style="color:#808080">&gt;</span><span style="color:#E6E6E6">Update</span><span style="color:#808080">&lt;/</span><span style="color:#569CD6">button</span><span style="color:#808080">&gt;</span></span>
<span class="line"style="background: #0080001c;"><span style="color:#808080">&lt;</span><span style="color:#569CD6">button</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">&#123;onclick}</span><span style="color:#808080">&gt;</span><span style="color:#E6E6E6">Update</span><span style="color:#808080">&lt;/</span><span style="color:#569CD6">button</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">h1</span><span style="color:#808080">&gt;</span><span style="color:#E6E6E6">Hello </span><span style="color:#569CD6">&#123;</span><span style="color:#9CDCFE">name</span><span style="color:#569CD6">}</span><span style="color:#808080">&lt;/</span><span style="color:#569CD6">h1</span><span style="color:#808080">&gt;</span></span>
</code></pre>
</div>
