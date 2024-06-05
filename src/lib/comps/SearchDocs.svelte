<script lang="ts">
    import { scale,fade } from "svelte/transition";
    import { appStore,appJsonDataStore } from "../index.js";
    let value:string = ""
    let result:{title:string,href:string,description:string}[] = []
    let docLinks = Object.values($appJsonDataStore.kitDocs).flatMap(data => data.map(item => ({ title: item.title, href: item.href }))).slice(0,4)
    /** handle clicks */
    function onclick(e:MouseEvent){
        const target = e.target as HTMLDivElement
        const close = target.classList.contains('container')
        // close search docs
        if(close) appStore.update(data=>{
            data['isSearchOpen'] = false
            return data
        }) 
    }
    /** reset all stages */
    function resetAll(){
        [value,result] = ["",[]]
        // close search docs
        appStore.update(data=>{ data['isSearchOpen'] = false ; return data })
    }
    /** search generated docs */
    function search(e:KeyboardEvent){
        const links = Object.values($appJsonDataStore.kitDocs).flatMap(data => data.map(item => ({ title: item.title, href: item.href, description: item.description })))
        const searchResult = links.filter(data=>data.href.match(new RegExp(value,"ig"))||data.title.match(new RegExp(value,"ig"))||data.description.match(new RegExp(value,"ig"))).slice(0,6)
        if(searchResult){
            result = searchResult.map(data=>{
                return {
                    title:data.title.replace(new RegExp(value, 'gi'), '<span style="color:var(--sb-main-color)">$&</span>'),
                    description:data.description.replace(new RegExp(value, 'gi'), '<span style="color:var(--sb-main-color)">$&</span>'),
                    href:data.href
                }
            })
        }else result = []
    }
</script>

{#snippet Search()}
<div class="search">
    <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    </div>
    <input bind:value type="text" placeholder="search..." onkeyup={search}>
</div>
{/snippet}

{#snippet NoResult()}
<div class="noResult">
    <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m7 15 5 5 5-5" />
            <path d="m7 9 5-5 5 5" />
        </svg>
    </div>
    <p>No results found, try another input</p>
</div>
{/snippet}

{#if $appStore.isSearchOpen}
    <div class="container" role="none" transition:fade="{{ duration:300 }}" {onclick}>
        <div class="content" transition:scale="{{ duration:200 }}">
            {@render Search()}
            {#if result.length>0}
                <ul class="links">
                    {#each result as link (link.href)}
                        <a href={link.href} class="link" onclick={resetAll}>
                            <p class="title">{@html link.title}</p>
                            <p class="desc">{@html link.description}</p>
                        </a>
                    {/each}
                </ul>
            {:else if result.length===0 && value.trim()===""}
                <ul class="links">
                    {#each docLinks as link (link.href)}
                        <a href={link.href} class="link" onclick={resetAll}>{link.title}</a>  
                    {/each}
                </ul>
            {:else}
                {@render NoResult()}
            {/if}
        </div>
    </div>
{/if}

<style>
    .container{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0; left: 0;
        background: var(--sb-blur-bg);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }
    .content{
        max-width: 500px;
        max-height: auto;
        width: 100%;
        height: fit-content;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: var(--sb-foreground);
        padding: var(--sb-padding);
        color: var(--sb-text-color);
        border-radius: var(--sb-radius);
        border: 2px solid var(--sb-border-color);
        box-shadow: 1px 2px 3px var(--sb-shadow);
    }

    .search{
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 2px solid var(--sb-border-color);
        padding: 10px;
    }
    .icon{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        stroke: var(--sb-icon-color);
    }
    .search input{
        border: none;
        width: 100%;
        background-color: transparent;
        padding: 5px 0;
        font-size: 15px;
        font-weight: 400;
        color: var(--sb-text-color);
    }
    .search input:focus{
        outline: none;
    }
    .content{
        padding: 10px;
        font-size: 15px;
        font-weight: 300;
    }
    .links{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .link{
        text-decoration: none;
        font-size: 16px;
        font-weight: 400;
        color: var(--sb-text-color);
        padding: 5px;
        border-radius: 5px;
    }
    .link:hover{
        background-color: var(--sb-background);
    }
    .desc{
        font-size: 13px;
        font-weight: 200;
    }
    .noResult{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        align-items: center;
        padding: 10px;
        font-size: 15px;
        font-weight: 300;
    }
</style>