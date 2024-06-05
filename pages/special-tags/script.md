---
layout: Special tags
title: Script
description: DescriptionHere.
---
<script>
    import Test from "../../../../Test.svelte";
    let loading = $state(false);
    const onclick = ()=> loading = !loading
</script>

# Script tag
The `script` tag let add custom JavaScript or TypeScript code to your markdown 
files.<br>
To add it to your page, simple add the `script` tag in you markdown files and that code 
will be added to your page.

## Example
In this example we are importing a component and writing variable `loading`
```svelte
<script>
    import Test from "../../../../Test.svelte";
    let loading = $state(false);
    const onclick = ()=> loading = !loading
</script>
```
After that you can use it in the same markdown file.
```svelte
<script>
    import Test from "../../../../Test.svelte";
    let loading = $state(false);
    const onclick = ()=> loading = !loading
</script>

<button {onclick}>Login</button>
<span>loading:{loading}</span>
<Test bg="purple">Button</Test>
```

## Preview code
<button {onclick}>Login</button>
<span>loading:{loading}</span>
<Test bg="purple">Button</Test>