import { writable } from 'svelte/store';

// Initialize an empty store
const questionStore = writable([]);

// Fetch polls from the Poll Service
async function fetchPolls() {
    try {
        const response = await fetch('http://localhost:3001/polls');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Remove duplicates based on _id
        const uniqueData = Array.from(new Map(data.map(item => [item._id, item])).values());

        console.log(uniqueData)
        questionStore.set(uniqueData);
    } catch (error) {
        console.error('Error fetching polls:', error);
    }
}

// Add a new poll
async function addPoll(poll) {
    console.log('hi i am reached ')
    try {
        const response = await fetch('http://localhost:3001/polls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(poll)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        if (response.ok) {
            console.log('everything ok here ')
        }
        fetchPolls(); // Refresh the poll list
    } catch (error) {
        console.error('Error adding poll:', error);
    }
}

// Update a poll's votes
async function updateVote(pollId, vote) {
    try {
        const response = await fetch('http://localhost:3002/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pollId, vote })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        fetchPolls(); // Refresh the poll list
    } catch (error) {
        console.error('Error updating vote:', error);
    }
}

// Fetch results (not strictly necessary if you’re fetching polls)
async function fetchResults() {
    try {
        const response = await fetch('http://localhost:3003/results');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        questionStore.set(data);
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

// Delete a poll
async function deletePoll(pollId) {
    try {
        const response = await fetch(`http://localhost:3001/polls/${pollId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        fetchPolls(); // Refresh the poll list
    } catch (error) {
        console.error('Error deleting poll:', error);
    }
}
export default {
    subscribe: questionStore.subscribe,
    fetchPolls,
    addPoll,
    updateVote,
    deletePoll,
    fetchResults
};