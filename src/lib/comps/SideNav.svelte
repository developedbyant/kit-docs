<script lang="ts">
    import { page } from "$app/stores";
    import { appStore,appJsonDataStore } from "../index.js";
    /** Indicate if side nav is open or not */
    let isSideNavOpen = $derived($appStore.isSideNavOpen)
    /** Close nav when top nav's links are clicked */
    const onclick = ()=>{ appStore.update(data=>{ data['isSideNavOpen']=false ; return data })}
</script>

<aside class="sideNav" class:open={isSideNavOpen}>
    {#each Object.entries($appJsonDataStore.kitDocs) as [title,links]}
        <div class="sideNavBlock">
            <span class="sideNavLinkTitle">
                { title }
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </span>
            <ul class="sideNavLinks">
                {#each links as link}
                {@const active = link.href===$page.url.pathname}
                    <li class="sideNavLink" role="none" {onclick}>
                        <a class:active href={link.href}>{ link.title }</a>
                        {#if link.new && link.new==true}
                            <div class="badge">New</div>
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
    {/each}
</aside>

<style>
    /* side navigation ========================== */
    .sideNav{
        padding: 20px 30px 0 0;
        position: sticky;
        height: calc(100vh - var(--sb-nav-height));
        left: 0;
        top: var(--sb-nav-height);
        border-right: 1.5px solid var(--sb-border-color);
        display: flex;
        flex-direction: column;
        gap: 20px;
        overflow-y: auto;
        min-width: fit-content;
    }
    .sideNavBlock{
        display: flex;
        flex-direction: column;
        list-style: inside;
        gap: 10px;
    }
    .sideNavLinks{
        display: flex;
        flex-direction: column;
        list-style: inside;
        gap: 10px;
        margin-left: 10px;
    }
    .sideNavLinkTitle{
        cursor: pointer;
        color: var(--sb-nav-header-color);
        font-size: 17px;
        font-weight: 300;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .sideNavLinkTitle svg{
        width: 25px;
        height: 25px;
        stroke-width: 1.5px;
        stroke: var(--sb-nav-icon-color);
    }
    .sideNavLink{
        font-size: 15px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 2px;
    }
    .sideNavLink a{
        text-decoration: none;
        color: color-mix(in srgb, var(--sb-header-color) 70%, var(--sb-foreground));
    }
    .sideNavLink .badge{
        padding: 4px 7px;
        font-size: 10px;
        font-weight: 300;
        background: var(--sb-second-color);
        color: var(--sb-button-color);
        border-radius: 50px;
    }
    .sideNavLink .active,.sideNavLink:hover > a{
        color: var(--sb-second-color);
    }
    /* mobile */
    @media(max-width:700px){
        .sideNav{
            position: fixed;
            width: 100%;
            background-color: var(--sb-blur-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 1;
            padding: 20px;
            transition: transform 0.2s ease-in-out;
            transform: translateX(-100%);
            height: calc(100vh - var(--sb-nav-height) - var(--sb-nav-height));
            top: calc(var(--sb-nav-height) + var(--sb-nav-height));
        }
        .sideNav.open{
            transform: translateX(0%);
        }
    }
</style>