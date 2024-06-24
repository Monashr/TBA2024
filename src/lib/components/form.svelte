<script>
	import { createEventDispatcher } from 'svelte';

	let Mvalue = 0;
	let Nvalue = 0;
	const dispatch = createEventDispatcher();

	function handleSubmit(event) {
		event.preventDefault();
		dispatch('submit', { Mvalue, Nvalue });
	}
</script>

<div class="form-container">
	<form on:submit={handleSubmit}>
		<div class="form-group">
			<input type="text" bind:value={Mvalue} placeholder="M Value" required />
		</div>
		<div class="form-group">
			<input type="text" bind:value={Nvalue} placeholder="N Value" required />
		</div>
		<button type="submit" class="insert-button">insert</button>
	</form>
</div>

<style>
	form {
		display: flex;
	}

	.form-container {
		margin-bottom: 20px;
	}

	.form-group {
		margin-bottom: 15px;
		display: flex;
	}

	.form-group input {
		width: calc(100% - 20px);
		padding: 10px;
		height: 50px;
		border: 1px solid #ccc;
		border-radius: 10px;
		outline: none;
		box-sizing: border-box;
	}
	.form-group input:focus {
		border-color: #66afe9;
	}

	.insert-button {
		display: block;
		max-height: 50px;
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

	.insert-button:hover {
		background-color: #f2e7fe;
	}

	.insert-button:active {
		background-color: #7c5bca;
		color: #ffffff;
		transform: translateY(2px);
	}
</style>
