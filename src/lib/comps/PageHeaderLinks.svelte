<script lang="ts">
    import { page } from "$app/stores";
    import { appStore,appJsonDataStore } from "../index.js";
    const kit = $appJsonDataStore
    let linksOpen:boolean = $state(false)
    let currentData = $derived(Object.values(kit.kitDocs).flatMap(data => data.map(item => item)).find(data=>data.href===$page.url.pathname))
    let pageLinks = $derived(currentData ? currentData.headers : [])
    let activeID = $state("")
    const openLinks = ()=> linksOpen=!linksOpen
    let scrollY = $derived($appStore.scrollY)

    $effect(()=>{
        const sections = document.querySelectorAll('[data-section]') as NodeListOf<HTMLDivElement>
        sections.forEach(section=>{
            if(scrollY >= (section.offsetTop-80)) activeID = section.id
        })
    })
</script>

<div class="onThisPage">
    <span class="title" onclick={openLinks} role="none">
        On this page
        <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down">
                <path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>
            </svg>
        </div>
    </span>
    <ul class="links" class:linksOpen>
        {#each pageLinks as link}
        {@const active = activeID.toLowerCase().trim()===link.id}
            <li>
                <a href="#{link.id}" class="link" class:active data-section-id onclick={openLinks}>
                    {link.text}
                </a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .onThisPage{
        padding: 10px 0 0 0;
        width: fit-content;
        position: sticky;
        height: calc(100vh - var(--sb-nav-height));
        left: 0;
        top: var(--sb-nav-height);
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-width: fit-content;
    }
    .title{
        cursor: pointer;
        color: var(--sb-header-color);
        font-size: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }
    .icon{
        display: flex;
        align-items: center;
        justify-content: center;
        stroke: var(--sb-icon-color);
        width: 25px;
        height: 25px;
    }
    .links{
        display: flex;
        flex-direction: column;
        gap: 5px;
        list-style: none;
    }
    .link{
        text-decoration: none;
        font-size: 16px;
        font-weight: 400;
        color: var(--sb-text-color);
        padding: 2px 6px;
        border-radius: 5px;
        border: 1px solid transparent;
    }
    .link.active{
        background: var(--sb-foreground);
        border: 1px solid var(--sb-main-color);
    }
    /* on mobile */
    @media(max-width:700px){
        .onThisPage{
            height: fit-content;
            width: 100%;
            border-radius: 5px;
            border: 2px solid var(--sb-border-color);
            background: var(--sb-foreground);
            padding: 5px 10px;
            gap: 0px;
            top: calc(var(--sb-nav-height) + 5px);
        }
        .links{
            overflow: hidden;
            transition: all 0.2s ease-in-out;
            max-height: 0px;
            min-height: 0px;
        }
        .linksOpen{
            margin-top: 10px;
            min-height: 100%;
            max-height: 100%;
        }
    }
</style>