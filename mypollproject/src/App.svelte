<script>
	export let name;
	import Header from './components/header.svelte'
	import Footer from './components/footer.svelte'
	import Tabs from './shared/Tabs.svelte'
	import Createpollform from './components/createquestoinForm.svelte'
    import Polllist from './components/questionlist.svelte';
	let items=['current questions', 'Add new question'];
	let activeItem='current questions';
	const handlechange = (e) =>{
		activeItem=e.detail;
	}
	
const handleadd=(e)=>{
	activeItem='current Poll';
}

</script>
<Header />
<main>
	<Tabs {items} {activeItem} on:tabchange ={handlechange}/>
	{#if activeItem==='current questions'}
	<Polllist />
	{:else}
	<Createpollform  on:add={handleadd}/>
	{/if}
</main>
<Footer />

<style>
	main {
		max-width: 960px;
		margin: 40px auto;
	}

	h1 {
		color: #ff3c00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	
</style>