<script lang="ts">
    import { appStore } from "../index.js";
    const { onThemeChange }:{ onThemeChange:(newTheme:"dark"|"light")=>void } = $props()
    const onclick = ()=> onThemeChange($appStore.theme==="dark" ? "light" : "dark")
</script>

<button aria-label="Change theme color" {onclick}>
    {#if $appStore.theme==="dark"}
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.9 4.9 1.4 1.4" />
            <path d="m17.7 17.7 1.4 1.4" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.3 17.7-1.4 1.4" />
            <path d="m19.1 4.9-1.4 1.4" />
        </svg>
    {/if}
</button>

<style>
    button{
        all: unset;
        cursor: pointer;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        stroke: var(--sb-icon-color);
        background: var(--sb-foreground);
        padding: 5px;
        border: 1.5px solid var(--sb-border-color);
        border-radius: 5px;
    }
    button:hover{
        opacity: 80%;
    }
    /* mobile */
    @media(max-width:700px){
        button{
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
    }
</style>