<script lang="ts">
    import { appStore } from "../index.js";
    /** Indicate is side nav is open or not */
    let open = $derived($appStore.isSideNavOpen)
    /** Open or close side nav when click on burger button */
    const onclick = ()=> appStore.update(data=>{ data['isSideNavOpen'] = !data['isSideNavOpen'] ; return data })
</script>

<button class:open {onclick}>
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
</button>

<style>
    button{
        all: unset;
        min-width: 35px;
        width: 35px;
        height: 25px;
        cursor: pointer;
        display: none;
        justify-content: space-between;
        flex-direction: column;
        overflow: hidden;
    }
    .one,.two,.three{
        width: 100%;
        height: 4px;
        border-radius: 20px;
        background-color: var(--sb-icon-color);
        transition: transform 0.2s ease-in-out;
    }

    button.open .two{
        transform: translateX(100%);
    }
    button.open .one{
        transform: rotate(40deg) translate(6px, 9px);
    }
    button.open .three{
        transform: rotate(-40deg) translate(6px, -9px);
    }
    /* mobile */
    @media(max-width:700px){
        button{ display: flex; }
    }
</style>