<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import { appStore,metaTagsStore } from "../index.js";
    import { apiRequest } from "../utils.js";
    import SearchDocs from "./SearchDocs.svelte";
    import TopNav from "./TopNav.svelte";
    import SideNav from "./SideNav.svelte";
    import Footer from "./Footer.svelte";
    import PageHeaderLinks from "./PageHeaderLinks.svelte"
    import type { Snippet } from "svelte";
    const { children,NavLogo,FooterLogo,hideSides }:{ children:Snippet,NavLogo:Snippet,FooterLogo:Snippet,hideSides?:boolean } = $props()
    let isDarkMode = $derived($appStore.theme === "dark");
    /** Html div wrapping app */
    let appDiv:HTMLDivElement
    /** Set new theme */
    const onThemeChange = async(newTheme:"dark"|"light")=>{
        const apiResponse = await apiRequest("/docs",{ action:"setTheme"})
        console.log(apiResponse)
        appStore.update(data=>{ data.theme=newTheme;return data})
    }

    /** Scroll up when click on a link */
    onNavigate(data=>{
        const stopFunc  = data.from?.url.href === data.to?.url.href
        if(stopFunc) return
        // scroll up
        appDiv.scrollTo({ top: 0, behavior: 'smooth' });
    })

    // Track scrollY position
	function handleScroll() {
        appStore.update(data=>{ data.scrollY=appDiv.scrollTop ; return data }) 
	}
</script>


<svelte:head>
    <!-- Primary Meta Tags -->
    <title>{$metaTagsStore.title}</title>
    <meta name="title" content={$metaTagsStore.title} />
    <meta name="description" content={$metaTagsStore.description} />
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content={$metaTagsStore.ogType} />
    <meta property="og:url" content={$metaTagsStore.url} />
    <meta property="og:title" content={$metaTagsStore.title} />
    <meta property="og:description" content={$metaTagsStore.description} />
    <meta property="og:image" content={$metaTagsStore.image} />
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={$metaTagsStore.url} />
    <meta property="twitter:title" content={$metaTagsStore.title} />
    <meta property="twitter:description" content={$metaTagsStore.description} />
    <meta property="twitter:image" content={$metaTagsStore.image} />
</svelte:head>
<div class="app" class:dark={isDarkMode} bind:this={appDiv} onscroll={handleScroll}>
    <SearchDocs />
    <TopNav Logo={NavLogo} {onThemeChange} />
    <div class="appContent">
        {#if !hideSides}<SideNav />{/if}
        <main>
            {@render children()}
            <Footer Logo={FooterLogo}/>
        </main>
        <!-- if hideSides true, only show top nav and main content -->
        {#if !hideSides}<PageHeaderLinks />{/if}
    </div>
</div>

<style>
    .app{
        display: flex;
        flex-direction: column;
        background: var(--sb-background);
        color: var(--sb-text-color);
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
    }
    /* app content ========================== */
    .appContent{
        max-width: var(--sb-max-width);
        width: 95%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        gap: 30px;
    }
    /* main ========================== */
    main{
        flex: 1;
        padding: 20px 0;
    }
    /* on mobile */
    @media(max-width:700px){
        .appContent{
            flex-direction: column-reverse;
            gap: 10px;
        }
    }
</style>