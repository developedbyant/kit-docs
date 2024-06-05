<script lang="ts">
    const { bg,children }:{ bg:string,children:any } = $props()
</script>

<button style="--BG:{bg}">
    {@render children()}
</button>

<style>
    button{
        border: none;
        cursor: pointer;
        background: var(--BG);
        color: var(--sb-button-color);
        font-size: 15px;
        font-weight: 300;
    }
</style>