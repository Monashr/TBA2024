<script>
	export let handleClick;
	export let name;
	export let state;
</script>

{#if state == true}
	<button class="minimal-button" on:click={handleClick}>
		{name}
	</button>
{:else if state == 'active'}
	<button class="minimal-button active" on:click={handleClick}>
		{name}
	</button>
{:else}
	<button class="minimal-button" on:click={handleClick} disabled>
		{name}
	</button>
{/if}

<style>
	.minimal-button {
		display: inline-block;
		margin: 0px 4px;
		padding: 10px 20px;
		border: 2px solid #7c5bca;
		border-radius: 8px;
		background-color: #ffffff;
		color: #7c5bca;
		font-size: 16px;
		cursor: pointer;
		transition:
			background-color 0.3s,
			color 0.3s,
			transform 0.1s;
	}

	.minimal-button:hover {
		background-color: #f2e7fe;
	}

	.minimal-button:active {
		background-color: #7c5bca;
		color: #ffffff;
		transform: translateY(2px);
	}

	.minimal-button:disabled {
		background-color: #e8eaed;
		color: #c1c1c1;
		border-color: #c1c1c1;
		cursor: not-allowed;
	}

	.minimal-button.active {
		background-color: #7c5bca;
		color: #ffffff;
	}
</style>
