<script lang="ts">
    import { appJsonDataStore } from "../index.js";
    import type { Snippet } from "../index.js";
    const { Logo }:{ Logo:Snippet } = $props();
</script>

<footer>
    <div class="content">
        <div class="footerNav">
            <div class="navLinks">
                {#each $appJsonDataStore.footerLinks as linkBlock }
                    <div class="navLink">
                        <span class="title">{linkBlock.title}</span>
                        <ul class="links">
                            {#each linkBlock.links as link }
                                <a class="link" href={link.href}>
                                    {link.text}
                                </a>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>         
        </div>
        {@render Logo()}
    </div>
</footer>

<style>
    footer{
        background: var(--sb-foreground);
        border-radius: 5px;
        margin-top: 20px;
    }
    .content{
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px;
    }
    .navLinks{
        display: flex;
        gap: 40px;
    }
    .navLink{
        display: flex;
        flex-direction: column;
        gap: 10px;
    } 
    .title{
        font-size: 18px;
        font-weight: 400;
        color: var(--sb-header-color);
    }
    .links{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .link{
        text-decoration: none;
        font-size: 14px;
        font-weight: 400;
        color: var(--sb-header-color);
    }
    .link:hover{ color: var(--sb-main-color); }
</style>