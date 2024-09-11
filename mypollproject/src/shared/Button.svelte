<script>
export let  type='primary';
export let flat=false;
export let inverse=false;

</script>

<button class={type} class:flat={flat} class:inverse={inverse} on:click>
    <slot></slot>
</button>



<style>
button{
    padding:8px 12px;
    font-weight: bold;
    border :0;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 1px 2px 3px rgb(0,0,0,0.3);
}
.primary{
    background-color: rgb(247, 29, 29);
    color:white
}
.secondary{
    background-color: rgb(7, 162, 7);
    color:white
}

.primary.inverse{
    background-color: white;
    color:rgb(247, 29, 29);
    border: 1px solid rgb(247, 29, 29);
}
.secondary.inverse{
    background-color: white;
    color: rgb(7, 162, 7);
    border: 1px solid  rgb(7, 162, 7);
}

.flat{
    box-shadow: none;
}
</style>