<script>
    import questionStore from '../stores/store';
    import Button from '../shared/Button.svelte';

    let values = { question: '', answerA: '', answerB: '' };
    let errors = { question: '', answerA: '', answerB: '' };
    import { createEventDispatcher } from "svelte";
    let dispatcher = createEventDispatcher();
    let valid = false;

    const handlesubmit = async (e) => {
        valid = true;
        if (values.question.trim().length < 5) {
            errors.question = "The question is not valid; it must have more than 5 characters.";
            valid = false;
        } else {
            errors.question = "";
        }
        if (values.answerA.trim().length < 1) {
            errors.answerA = "The answer must be greater than 1 character.";
            valid = false;
        } else {
            errors.answerA = "";
        }
        if (values.answerB.trim().length < 1) {
            errors.answerB = "The answer must be greater than 1 character.";
            valid = false;
        } else {
            errors.answerB = "";
        }
        if (valid) {
            let poll = { ...values, VoteA: 0, VoteB: 0 };
            await questionStore.addPoll(poll);
            dispatcher('add');
            console.log(values);
        }
    }
</script>

<form on:submit|preventDefault={handlesubmit}>
    <div class="form-field">
        <label for="question">Survey Question</label>
        <input type="text" id="question" bind:value={values.question}>
        <div class="error">{errors.question}</div>
    </div>

    <div class="form-field">
        <label for="answer-a">Answer A</label>
        <input type="text" id="answer-a" bind:value={values.answerA}>
        <div class="error">{errors.answerA}</div>
    </div>

    <div class="form-field">
        <label for="answer-b">Answer B</label>
        <input type="text" id="answer-b" bind:value={values.answerB}>
        <div class="error">{errors.answerB}</div>
    </div>
    <Button type='secondary' flat={true}>Add survey Question</Button>
</form>
