---
layout: Special tags
title: Code highlight
description: Highlight some code.
---

# Code highlight
Highlight code line using tags `add[line1,line2]` to start green highlight and `remove[line1,line2]` to 
highlight with a red color.

## Example
This example show you the way we svelte v4 handle reactive variable vs how the 
new svelte v5 handles them.

```markdown
    ```svelte remove[2,7] add[3,5,8]
    <script>
        let name = "John";
        let name = $state("John");
        /** update variable */
        const onclick = ()=> { name = "tony" }
    </script>
    <button on:click={onclick}>Update</button>
    <button {onclick}>Update</button>
    <h1>Hello {name}</h1>
    ```
```

## Preview
```svelte remove[2,7] add[3,5,8]
<script>
    let name = "John";
    let name = $state("John");
    /** update variable */
    const onclick = ()=> { name = "tony" }
</script>
<button on:click={onclick}>Update</button>
<button {onclick}>Update</button>
<h1>Hello {name}</h1>
```