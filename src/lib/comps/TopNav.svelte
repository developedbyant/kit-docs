<script lang="ts">
    import { page } from "$app/stores";
    import { appStore,appJsonDataStore } from "../index.js";
    import TopNavSearchButton from "./TopNavSearchButton.svelte";
    import TopNavSocialMedia from "./TopNavSocialMedia.svelte";
    import TopNavThemeToggle from "./TopNavThemeToggle.svelte";
    import TopNavBurgerButton from "./TopNavBurgerButton.svelte";
    import type { Snippet,TopNavLinkData } from "../index.js";
    const { Logo,onThemeChange }:{ Logo:Snippet,onThemeChange:(newTheme:"dark"|"light")=>void } = $props()
    const topNavLinks:TopNavLinkData[] = $appJsonDataStore.navLinks
    let isSideNavOpen = $derived($appStore.isSideNavOpen)
    /** Close nav when top nav's links are clicked */
    const closeTopNav = ()=>{ appStore.update(data=>{ data['isSideNavOpen']=false ; return data })}
</script>

<header class="topNavHeader">
    <nav class="topNav">
        {@render Logo()}
        <ul class="topNavLinks" class:open={isSideNavOpen}>
            {#each topNavLinks as link }
                { @const active = (link.href===$page.url.pathname && !link.external ) }
                { @const attributes = { href:link.href, target:link.external?"_blank":"",onclick:closeTopNav } }
                <li class="topNavLink">
                    <a class:active {...attributes}>
                        {link.text}
                    </a>
                </li>  
            {/each}
        </ul>
        <TopNavSearchButton />
        <TopNavSocialMedia />
        <TopNavThemeToggle {onThemeChange} />
        <TopNavBurgerButton /> <!--mobileOnly-->
    </nav>
</header>

<style>
    /* main navigation ========================== */
    .topNavHeader{
        display: flex;
        align-items: center;
        width: 100%;
        height: var(--sb-nav-height);
        min-height: var(--sb-nav-height);
        max-height: var(--sb-nav-height);
        position: sticky;
        top: 0; left: 0;
        box-shadow: 2px 0 0 1.5px var(--sb-border-color);
        z-index: 1;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }
    .topNav{
        max-width: var(--sb-max-width);
        width: 95%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }
    .topNavLinks{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;
        list-style: none;
    }
    .topNavLink a{
        text-decoration: none;
        color: var(--sb-nav-link-color);
        font-size: 16px;
        font-weight: 500;
    }
    .topNavLink a.active{
        color: var(--sb-main-color);
    }
    /* mobile */
    @media(max-width:700px){
        .topNav{
            overflow: hidden;
            gap: 10px;
        }
        .topNavLinks{
            /* display: none; */
            gap: 10px;
            position: fixed;
            top: calc(var(--sb-nav-height) + 1px);
            background: var(--sb-background);
            height: calc(var(--sb-nav-height) - 2px);
            width: 100%;
            opacity: 0%;
            transform: translateX(100%);
            transition: all 0.4s ease-in-out;
        }
        .topNavLinks.open{
            transform: translateX(0%);
            opacity: 100%;
        }
    }
</style>