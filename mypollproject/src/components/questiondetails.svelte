<script>
    import PollStore from '../stores/store';
    import Button from '../shared/Button.svelte';
    import Card from "../shared/Card.svelte";
    import { tweened } from 'svelte/motion';
    
    export let poll;
    $: totalvotes = poll.VoteA + poll.VoteB;

    const handlevotes = async (option, id) => {
        await PollStore.updateVote(id, option);
    };

    $: percentA = Math.floor(100 / totalvotes * poll.VoteA || 0);
    $: percentB = Math.floor(100 / totalvotes * poll.VoteB || 0);
    
    const tweenedA = tweened(0);
    const tweenedB = tweened(0);

    $: tweenedA.set(percentA);
    $: tweenedB.set(percentB);

    const handleDelete = async (id) => {
        await PollStore.deletePoll(id);
    };
</script>

<Card>
    <div class="polls">
        <h1>{poll.question}</h1>
        <p>Total Votes {totalvotes}</p>
        <div class="answer" on:click={() => handlevotes('a', poll._id)}>
            <div class="percent percent-a" style="width:{$tweenedA}%"></div>
            <span>{poll.answerA} ({poll.VoteA})</span>
        </div>
        <div class="answer" on:click={() => handlevotes('b', poll._id)}>
            <div class="percent percent-b" style="width:{$tweenedB}%"></div>
            <span>{poll.answerB} ({poll.VoteB})</span>
        </div>
        <div class="delete">
            <Button flat={true} on:click={() => handleDelete(poll._id)}>Delete</Button>
        </div>
    </div>
</Card>
<style>
    .polls {
        margin: 20px 0;
    }

    h1 {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }

    p {
        font-size: 1rem;
        color: #666;
    }

    .answer {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 5px;
        cursor: pointer;
        transition:  0.3s ease;
    }

    .answer:hover {
        background: #f1f1f1;
    }

    .percent {
      display: flex;
        height: 100%;
        transition: width 0.5s ease;
    }

   .percent-a {
        color: #4caf50;
    }

.percent-b {
        color: #f44336;
    }

    .delete {
        margin-top: 10px;
        text-align: center;
    }
</style>
