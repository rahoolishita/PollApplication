<script>
    export let items;
    export let activeItem;
    import {createEventDispatcher} from 'svelte';
    let dispatcher=createEventDispatcher();
</script>

<div class="tabs">
    <ul>
        {#each items as item}
        <li on:click={() => dispatcher('tabchange',item)}>
            <div class:active={item===activeItem}>{item}</div>
        </li>
    {/each}
    </ul>
</div>

<style>
.tabs{
    margin-bottom: 40px;
}
ul{
    display:flex;
    justify-content: center;
    list-style-type: none;
}
li{
    margin:0 10px;
   font-size: 18px;
   color:rgb(166, 159, 159);
   cursor:pointer

    
}
    .active{
        border-bottom: 1px solid rgb(233, 76, 62);
        color:rgb(233, 62, 62);
        padding-bottom: 5px;
    }
</style>