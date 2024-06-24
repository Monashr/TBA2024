<script>
	export let active = false;
</script>

{#if active}
	<svg
		class="bounce"
		xmlns="http://www.w3.org/2000/svg"
		height="48px"
		viewBox="0 -960 960 960"
		width="48px"
		fill="#7c5bca"><path d="M560-280 360-480l200-200v400Z" /></svg
	>
{:else}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="48px"
		viewBox="0 -960 960 960"
		width="48px"
		fill="#e8eaed"><path d="M560-280 360-480l200-200v400Z" /></svg
	>
{/if}

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-10px);
		}
	}

	.bounce {
		animation: bounce 0.5s ease;
	}
</style>
