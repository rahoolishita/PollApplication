<script>
    import{scale,fade,slide} from 'svelte/transition'
    import {flip} from 'svelte/animate'
    // import {onMount,onDestroy} from 'svelte'
    import questionStore from '../stores/store';
    import { onMount } from 'svelte';
  
import Polldetails from "./questiondetails.svelte";


async function fetchPolls() {
    try {
     questionStore.fetchPolls();
    } catch (error) {
        console.error('Error fetching polls:', error);
    }
}
onMount(() => {
   
    fetchPolls();
});

// onDestroy(()=>{
//     console.log('components destroyed');
//     unsub();
// })
</script>

<div class="poll-list">
<!-- easy way to automatically unsubscribe from the store -->
{#each $questionStore as poll (poll._id)}
<div in:fade out:scale|local animate:flip={{duration:500}}>
<Polldetails {poll}/>
</div>
{/each}
</div>

<style>

    .poll-list{
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
</style>