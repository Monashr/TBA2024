<script>
    export let BoxColor = "invisible";
    export let value = "B";
</script>

{#if BoxColor == "red"}

<div 
    style="border: 2px solid {BoxColor};"
>
    {value}
</div>

{:else }

<div 
    style="border: 2px solid {BoxColor}; border-radius: 8px;"
>
    {value}
</div>

{/if}

<style>
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50px;
        min-width: 50px;
        margin: 0px 10px;
        background-color: white;
    }
</style>