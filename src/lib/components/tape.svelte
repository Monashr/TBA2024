<script>
	import Box from './box.svelte';
	import RightArrow from './RightArrow.svelte';
	import LeftArrow from './LeftArrow.svelte';

	export let arr = [];
	export let activeArrow;
	activeArrow = activeArrow;
</script>

<div>
	<LeftArrow active={activeArrow == 'left' ? true : false} />

	{#each arr as arrs, i}
		{#if i == 4}
			<Box BoxColor={'red'} value={arrs} />
		{:else}
			<Box value={arrs} />
		{/if}
	{/each}

	<RightArrow active={activeArrow == 'right' ? true : false} />
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		height: 52px;
		width: 100%;
		background-color: #ded9f6;
		margin-bottom: 10px;
		padding: 5px;
		border-radius: 10px;
	}
</style>
