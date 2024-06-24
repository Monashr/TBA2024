<script>
	import Tape from './tape.svelte';
	import { data } from '../Logic/haha';
	import Button from './button.svelte';
	import NotBox from './notBox.svelte';
	import Form from './form.svelte';

	let activeArrow = ['stop', 'stop', 'stop', 'stop', 'stop'];
	let tapeName = ['tape1', 'tape2', 'tape3', 'tape4', 'tape5'];

	let Data = data;
	let result = 0;

	let isPaused = false;
	let isRunning = false;
	let Time = 100;

	function handleSubmit(event) {
		const { Mvalue, Nvalue, runningTime } = event.detail;
		Data.insert(Mvalue, Nvalue);
		Time = runningTime;
		Data = Data;
	}

	function reset() {
		location.reload();
	}

	async function handleClick() {
		isRunning = true;
		while (isRunning && Data.state !== 'qf' && Data.state !== 'qe') {
			if (!isPaused) {
				await shiftAndRender();
			}
			await sleep(Time);
		}
	}

	function pause() {
		isPaused = true;
	}

	function resume() {
		isPaused = false;
		handleClick();
	}

	let next = () => {
		activeArrow = Data.next();
		result = Data.countResult();
		Data = Data;
	};

	async function shiftAndRender() {
		Data = Data;
		await new Promise((resolve) => {
			setTimeout(() => {
				activeArrow = Data.next();
				result = Data.countResult();
				Data = Data;
				resolve();
			}, 0);
		});
	}

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
</script>

<div class="container">
	<Form on:submit={handleSubmit} />

	{#each tapeName as tapes, index}
		<Tape arr={Data.trim(tapes)} activeArrow={activeArrow[index]} />
	{/each}

	<div class="buttonBox">
		{#if !isPaused}
			<Button {handleClick} name="Run" state={isRunning ? 'active' : true} />
		{:else}
			<Button {handleClick} name="Run" state={isRunning ? 'active' : false} />
		{/if}

		{#if !isPaused}
			<Button handleClick={pause} name="Pause" state={isRunning ? true : false} />
		{:else}
			<Button handleClick={resume} name="Resume" state={true} />
		{/if}

		<Button handleClick={next} name="Next" state={true} />

		<Button handleClick={reset} name="Reset" state={true} />

		<NotBox data={Data.state} name="State =" />
		<NotBox data={result} name="Result =" />
	</div>
</div>

<style>
	.container {
		width: 50%;
		min-width: 800px;
		height: 70vh;
		min-height: 550px;
		background-color: white;
		box-shadow: 6px 6px 20px 0 rgba(0, 0, 0, 0.2);
		padding: 20px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.buttonBox {
		display: flex;
	}
</style>
