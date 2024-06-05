<script lang="ts">
    import { metaTagsStore } from "$lib/index.js";
    metaTagsStore.set({ 
        appName:"KitDocs",title:"KitDocs",description:"Build documentation site using SvelteKit and kitDocs.",
        url:"https://kitdocs.dev/docs",image:"https://kitdocs.dev/images/backdrop.png",ogType:"article" 
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

<h1 data-section data-md="header" id="what-is-kitdocs">
    What is kitDocs?
</h1>
<p data-md="p">KitDocs is a powerful tool that enables you to create documentation websites rapidly using SvelteKit and markdown.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="getting-started">
    Getting Started
</h2>
<p data-md="p">To get started using kitDocs we need to follow the following steps.</p>
<ul data-md="list">
    <li>Install package</li>
    <li>Add plugin to <code data-md="inline-code">vite.config.ts</code></li>
    <li>Create <code data-md="inline-code">pages</code> folder and create markdowns</li>
    <li>Organize project structure</li>
    <li>Create layout</li>
    <li>Create page</li>
</ul>
<div data-md="space"></div>
<h2 data-section data-md="header" id="installation">
    Installation
</h2>
<p data-md="p">To install kitDocs use your favorite npm package manager.</p>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#DCDCAA">npm</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">install</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">kitdocs@latest</span></span>
</code></pre>
</div>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#DCDCAA">bun</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">install</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">kitdocs@latest</span></span>
</code></pre>
</div>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#DCDCAA">pnpm</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">install</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">kitdocs@latest</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="add-plugin">
    Add plugin
</h2>
<p data-md="p">In order ro convert your markdown file to svelte pages, we need to add <code data-md="inline-code">kitDocsPlugin</code> from <code data-md="inline-code">kitdocs/plugin</code>.</p>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#C586C0">import</span><span style="color:#E6E6E6"> &#123; </span><span style="color:#9CDCFE">sveltekit</span><span style="color:#E6E6E6"> } </span><span style="color:#C586C0">from</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">&#039;@sveltejs/kit/vite&#039;</span><span style="color:#E6E6E6">;</span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#E6E6E6"> &#123; </span><span style="color:#9CDCFE">defineConfig</span><span style="color:#E6E6E6"> } </span><span style="color:#C586C0">from</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">&#039;vite&#039;</span><span style="color:#E6E6E6">;</span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">kitDocsPlugin</span><span style="color:#E6E6E6">, &#123; </span><span style="color:#C586C0">type</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">Options</span><span style="color:#E6E6E6"> </span><span style="color:#C586C0">as</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">kitDocsPluginOptions</span><span style="color:#E6E6E6"> } </span><span style="color:#C586C0">from</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">&quot;kitdocs/plugin&quot;</span><span style="color:#E6E6E6">;</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#569CD6">const</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">kitDocsOptions</span><span style="color:#D4D4D4">:</span><span style="color:#4EC9B0">kitDocsPluginOptions</span><span style="color:#E6E6E6"> </span><span style="color:#D4D4D4">=</span><span style="color:#E6E6E6"> &#123;</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#9CDCFE">appName:</span><span style="color:#CE9178">&quot;KitDocs&quot;</span><span style="color:#E6E6E6">,</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#9CDCFE">domainUrl:</span><span style="color:#CE9178">&quot;https://kitdocs.dev&quot;</span><span style="color:#E6E6E6">,</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#9CDCFE">defaultImage:</span><span style="color:#CE9178">&quot;https://kitdocs.dev/images/backdrop.png&quot;</span><span style="color:#E6E6E6">,</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#9CDCFE">devMode:</span><span style="color:#569CD6">true</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#E6E6E6">}</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#C586C0">export</span><span style="color:#E6E6E6"> </span><span style="color:#C586C0">default</span><span style="color:#E6E6E6"> </span><span style="color:#DCDCAA">defineConfig</span><span style="color:#E6E6E6">(&#123;</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#9CDCFE">plugins:</span><span style="color:#E6E6E6"> [</span></span>
<span class="line"><span style="color:#E6E6E6">        </span><span style="color:#DCDCAA">sveltekit</span><span style="color:#E6E6E6">(),</span></span>
<span class="line"><span style="color:#E6E6E6">        </span><span style="color:#DCDCAA">kitDocsPlugin</span><span style="color:#E6E6E6">(</span><span style="color:#CE9178">&quot;docs&quot;</span><span style="color:#E6E6E6">,</span><span style="color:#9CDCFE">kitDocsOptions</span><span style="color:#E6E6E6">)</span><span style="color:#6A9955">//[H]</span></span>
<span class="line"><span style="color:#E6E6E6">    ]</span></span>
<span class="line"><span style="color:#E6E6E6">});</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="pages-directory">
    Pages directory
</h2>
<p data-md="p">The <code data-md="inline-code">pages</code> directory is where you will place all your markdown files that will be converted to svelte pages.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="create-page">
    Create page
</h2>
<p data-md="p">Inside your <code data-md="inline-code">pages</code> directory create a markdown file that will represent your svelte page.
If the file is named <code data-md="inline-code">index.md</code> it will the folder index page, example folder <code data-md="inline-code">pages/components/index.md</code> will be converted to <code data-md="inline-code">docs/component</code>, folder <code data-md="inline-code">pages/components/button.md</code> will be converted to <code data-md="inline-code">docs/button</code>.
All markdown files/pages should start with meta tag that includes:</p>
<ul data-md="list">
    <li>layout: Page layout</li>
    <li>title: Title for page</li>
    <li>description: Description for page</li>
    <li>new: Indicate if this page is a new feature</li>
</ul>
<div data-md="space"></div>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#E6E6E6">---</span></span>
<span class="line"><span style="color:#E6E6E6">layout: PageLayout</span></span>
<span class="line"><span style="color:#E6E6E6">title: PageTitle</span></span>
<span class="line"><span style="color:#E6E6E6">description: DescriptionHere.</span></span>
<span class="line"><span style="color:#E6E6E6">new: false</span></span>
<span class="line"><span style="color:#569CD6">---</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6">## Page title</span></span>
</code></pre>
</div>
<p data-md="p">Learn more about all <a data-md="a" href="/docs/special-tags">
    Special tags
</a> you can use inside your markdown files.</p>
<div data-md="space"></div>
<h2 data-section data-md="header" id="project-structure">
    Project structure
</h2>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:undefined">src/routes/</span></span>
<span class="line"><span style="color:undefined">├── (docs)/</span></span>
<span class="line"><span style="color:undefined">│   ├── +layout.server.ts</span></span>
<span class="line"><span style="color:undefined">│   ├── +layout.svelte</span></span>
<span class="line"><span style="color:undefined">│   ├── docs/</span></span>
<span class="line"><span style="color:undefined">│   │   └── +server.ts</span></span>
<span class="line"><span style="color:undefined">│   └── docs</span></span>
<span class="line"><span style="color:undefined">└── (app)/</span></span>
<span class="line"><span style="color:undefined">    └── +layout.server.ts/</span></span>
<span class="line"><span style="color:undefined">        └── +layout.svelte</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<h2 data-section data-md="header" id="layout">
    Layout
</h2>
<p data-md="p">Inside directory <code data-md="inline-code">src/routes/(docs)</code> create file <code data-md="inline-code">+layout.server.ts</code> and <code data-md="inline-code">+layout.svelte</code>.</p>
<div data-md="space"></div>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#6A9955">// +layout.server.ts</span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#E6E6E6"> </span><span style="color:#C586C0">type</span><span style="color:#E6E6E6"> &#123; </span><span style="color:#9CDCFE">LayoutServerLoad</span><span style="color:#E6E6E6"> } </span><span style="color:#C586C0">from</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">&#039;./$types.js&#039;</span><span style="color:#E6E6E6">;</span></span>
<span class="line"><span style="color:#C586C0">import</span><span style="color:#E6E6E6"> </span><span style="color:#C586C0">type</span><span style="color:#E6E6E6"> &#123; </span><span style="color:#9CDCFE">DocTheme</span><span style="color:#E6E6E6"> } </span><span style="color:#C586C0">from</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">&quot;kitdocs&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C586C0">export</span><span style="color:#E6E6E6"> </span><span style="color:#569CD6">const</span><span style="color:#E6E6E6"> </span><span style="color:#DCDCAA">load</span><span style="color:#D4D4D4">:</span><span style="color:#4EC9B0">LayoutServerLoad</span><span style="color:#E6E6E6"> </span><span style="color:#D4D4D4">=</span><span style="color:#E6E6E6"> </span><span style="color:#569CD6">async</span><span style="color:#E6E6E6">(</span><span style="color:#9CDCFE">event</span><span style="color:#E6E6E6">)</span><span style="color:#569CD6">=&gt;</span><span style="color:#E6E6E6">&#123;</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#569CD6">const</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">theme</span><span style="color:#E6E6E6"> </span><span style="color:#D4D4D4">=</span><span style="color:#E6E6E6"> (</span><span style="color:#9CDCFE">event</span><span style="color:#E6E6E6">.</span><span style="color:#9CDCFE">cookies</span><span style="color:#E6E6E6">.</span><span style="color:#DCDCAA">get</span><span style="color:#E6E6E6">(</span><span style="color:#CE9178">&quot;theme&quot;</span><span style="color:#E6E6E6">) </span><span style="color:#D4D4D4">||</span><span style="color:#E6E6E6"> </span><span style="color:#CE9178">&quot;light&quot;</span><span style="color:#E6E6E6">) </span><span style="color:#C586C0">as</span><span style="color:#E6E6E6"> </span><span style="color:#4EC9B0">DocTheme</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#C586C0">return</span><span style="color:#E6E6E6"> &#123; </span><span style="color:#9CDCFE">theme</span><span style="color:#E6E6E6"> }</span></span>
<span class="line"><span style="color:#E6E6E6">} </span></span>
</code></pre>
</div>
<div data-md="space"></div>
<div data-md="code">
    <button onclick={copyText}>Copy</button>
    <pre style="background-color:#222222;color:#E6E6E6"><code style="display: flex;flex-direction:column;overflow-x: auto;"><span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">script</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">lang</span><span style="color:#E6E6E6">=</span><span style="color:#CE9178">&quot;ts&quot;</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> </span><span style="color:#CE9178">&quot;kitdocs/sb.css&quot;</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> </span><span style="color:#CE9178">&quot;kitdocs/md.css&quot;</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">appJsonData</span><span style="color:#D4D4D4"> </span><span style="color:#C586C0">from</span><span style="color:#D4D4D4"> </span><span style="color:#CE9178">&quot;../../app.json&quot;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#C586C0">import</span><span style="color:#D4D4D4"> &#123; </span><span style="color:#9CDCFE">Layout</span><span style="color:#D4D4D4">,</span><span style="color:#9CDCFE">appJsonDataStore</span><span style="color:#D4D4D4">,</span><span style="color:#9CDCFE">appStore</span><span style="color:#D4D4D4"> } </span><span style="color:#C586C0">from</span><span style="color:#D4D4D4"> </span><span style="color:#CE9178">&quot;kitdocs&quot;</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#569CD6">const</span><span style="color:#D4D4D4"> &#123; </span><span style="color:#9CDCFE">data</span><span style="color:#D4D4D4">,</span><span style="color:#9CDCFE">children</span><span style="color:#D4D4D4"> } = $</span><span style="color:#DCDCAA">props</span><span style="color:#D4D4D4">()</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#6A9955">// set theme and appJson (src/app.json)</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#9CDCFE">appStore</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">update</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">store</span><span style="color:#569CD6">=&gt;</span><span style="color:#D4D4D4">&#123; </span><span style="color:#9CDCFE">store</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">theme</span><span style="color:#D4D4D4">=</span><span style="color:#9CDCFE">data</span><span style="color:#D4D4D4">.</span><span style="color:#9CDCFE">theme</span><span style="color:#D4D4D4"> ; </span><span style="color:#C586C0">return</span><span style="color:#D4D4D4"> </span><span style="color:#9CDCFE">store</span><span style="color:#D4D4D4"> })</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#9CDCFE">appJsonDataStore</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">set</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">appJsonData</span><span style="color:#D4D4D4">)</span></span>
<span class="line"><span style="color:#808080">&lt;/</span><span style="color:#569CD6">script</span><span style="color:#808080">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E6E6E6">&#123;#</span><span style="color:#C586C0">snippet</span><span style="color:#D4D4D4"> </span><span style="color:#DCDCAA">Logo</span><span style="color:#D4D4D4">()</span><span style="color:#E6E6E6">}</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#808080">&lt;</span><span style="color:#569CD6">a</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">href</span><span style="color:#E6E6E6">=</span><span style="color:#CE9178">&quot;/&quot;</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">class</span><span style="color:#E6E6E6">=</span><span style="color:#CE9178">&quot;logo&quot;</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">aria-label</span><span style="color:#E6E6E6">=</span><span style="color:#CE9178">&quot;Navigate to home page&quot;</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">        Logo</span></span>
<span class="line"><span style="color:#E6E6E6">    </span><span style="color:#808080">&lt;/</span><span style="color:#569CD6">a</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">&#123;/</span><span style="color:#C586C0">snippet</span><span style="color:#E6E6E6">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#808080">&lt;</span><span style="color:#4EC9B0">Layout</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">NavLogo</span><span style="color:#E6E6E6">=</span><span style="color:#569CD6">&#123;</span><span style="color:#9CDCFE">Logo</span><span style="color:#569CD6">}</span><span style="color:#E6E6E6"> </span><span style="color:#9CDCFE">FooterLogo</span><span style="color:#E6E6E6">=</span><span style="color:#569CD6">&#123;</span><span style="color:#9CDCFE">Logo</span><span style="color:#569CD6">}</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#E6E6E6">    &#123;@</span><span style="color:#569CD6">render</span><span style="color:#D4D4D4"> </span><span style="color:#DCDCAA">children</span><span style="color:#D4D4D4">()</span><span style="color:#E6E6E6">}</span></span>
<span class="line"><span style="color:#808080">&lt;/</span><span style="color:#4EC9B0">Layout</span><span style="color:#808080">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#808080">&lt;</span><span style="color:#569CD6">style</span><span style="color:#808080">&gt;</span></span>
<span class="line"><span style="color:#D4D4D4">    </span><span style="color:#D7BA7D">.logo</span><span style="color:#D4D4D4">&#123;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">display</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">flex</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">align-items</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">center</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">justify-content</span><span style="color:#D4D4D4">: </span><span style="color:#CE9178">center</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">width</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">40px</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">height</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">40px</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">min-width</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">40px</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">min-height</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">40px</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">background</span><span style="color:#D4D4D4">: </span><span style="color:#DCDCAA">var</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">--sb-main-color</span><span style="color:#D4D4D4">);</span></span>
<span class="line"><span style="color:#D4D4D4">        </span><span style="color:#9CDCFE">border-radius</span><span style="color:#D4D4D4">: </span><span style="color:#B5CEA8">5px</span><span style="color:#D4D4D4">;</span></span>
<span class="line"><span style="color:#D4D4D4">    }</span></span>
<span class="line"><span style="color:#808080">&lt;/</span><span style="color:#569CD6">style</span><span style="color:#808080">&gt;</span></span>
</code></pre>
</div>
<div data-md="space"></div>
<p data-md="p">Now saved any file in directory <code data-md="inline-code">pages</code> and all the markdown files will be converted to svelte pages.</p>
