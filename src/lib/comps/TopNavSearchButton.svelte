<script lang="ts">
    import { appStore } from "../index.js";
    /** Open search model */
    const onclick = ()=> appStore.update(data=>{ data['isSearchOpen']=true ; return data})
</script>

<button class="btn" {onclick}>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
    </svg>
    <span>Search..</span>
</button>

<style>
    .btn{
        cursor: pointer;
        display: flex;
        align-items: center;
        /* justify-content: flex-start; */
        width: 180px;
        font-size: 15px;
        font-weight: 400;
        gap: 5px;
        padding: 7px 10px;
        border-radius: 50px;
        color: var(--sb-text-color);
        background-color: var(--sb-foreground);
        border: none;
        box-shadow: 0 0 0 2px var(--sb-icon-color-2);
        min-width: fit-content;
    }
    .icon{
        width: 20px;
        height: 20px;
        stroke: var(--sb-icon-color-2);
        stroke-width: 3px;
    }
    /* mobile */
    @media(max-width:700px){
        .btn{
            flex: 1;
            font-size: 12px;
        }
    }
</style>