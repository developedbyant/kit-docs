---
layout: Introduction
title: KitDocs
description: Build documentation site using SvelteKit and kitDocs.
---

# What is kitDocs?
KitDocs is a powerful tool that enables you to create documentation websites rapidly using SvelteKit and markdown.

## Getting Started
To get started using kitDocs we need to follow the following steps.
- Install package
- Add plugin to `vite.config.ts`
- Create `pages` folder and create markdowns
- Organize project structure
- Create layout
- Create page

## Installation
To install kitDocs use your favorite npm package manager.
```bash
npm install kitdocs@latest
```
```bash
bun install kitdocs@latest
```
```bash
pnpm install kitdocs@latest
```

## Add plugin
In order ro convert your markdown file to svelte pages, we need to add `kitDocsPlugin` from `kitdocs/plugin`.
```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import kitDocsPlugin, { type Options as kitDocsPluginOptions } from "kitdocs/plugin";//[H]
const kitDocsOptions:kitDocsPluginOptions = {//[H]
	appName:"KitDocs",//[H]
	domainUrl:"https://kitdocs.dev",//[H]
	defaultImage:"https://kitdocs.dev/images/backdrop.png",//[H]
	devMode:true//[H]
}//[H]
export default defineConfig({
	plugins: [
        sveltekit(),
        kitDocsPlugin("docs",kitDocsOptions)//[H]
    ]
});
```

## Pages directory
The `pages` directory is where you will place all your markdown files that will be converted to svelte pages.

## Create page
Inside your `pages` directory create a markdown file that will represent your svelte page.
If the file is named `index.md` it will the folder index page, example folder `pages/components/index.md` will be converted to `docs/component`, folder `pages/components/button.md` will be converted to `docs/button`.
All markdown files/pages should start with meta tag that includes:
- layout: Page layout
- title: Title for page
- description: Description for page
- new: Indicate if this page is a new feature

```markdown
---
layout: PageLayout
title: PageTitle
description: DescriptionHere.
new: false
---

## Page title
```
Learn more about all [Special tags](/docs/special-tags) you can use inside your markdown files.

## Project structure
```text
src/routes/
├── (docs)/
│   ├── +layout.server.ts
│   ├── +layout.svelte
│   ├── docs/
│   │   └── +server.ts
│   └── docs
└── (app)/
    └── +layout.server.ts/
        └── +layout.svelte
```

## Layout
Inside directory `src/routes/(docs)` create file `+layout.server.ts` and `+layout.svelte`.

```ts
// +layout.server.ts
import type { LayoutServerLoad } from './$types.js';
import type { DocTheme } from "kitdocs"

export const load:LayoutServerLoad = async(event)=>{
    const theme = (event.cookies.get("theme") || "light") as DocTheme
    return { theme }
} 
```

```svelte
<script lang="ts">
    import "kitdocs/sb.css";
    import "kitdocs/md.css";
    import appJsonData from "../../app.json"
    import { Layout,appJsonDataStore,appStore } from "kitdocs";
    const { data,children } = $props()
    // set theme and appJson (src/app.json)
    appStore.update(store=>{ store.theme=data.theme ; return store })
    appJsonDataStore.set(appJsonData)
</script>

{#snippet Logo()}
    <a href="/" class="logo" aria-label="Navigate to home page">
        Logo
    </a>
{/snippet}

<Layout NavLogo={Logo} FooterLogo={Logo}>
    {@render children()}
</Layout>

<style>
    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
        background: var(--sb-main-color);
        border-radius: 5px;
    }
</style>
```

Now saved any file in directory `pages` and all the markdown files will be converted to svelte pages.