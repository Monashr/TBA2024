<script>
	export let BoxColor = 'white';
	export let textcolor = '';
	export let fontsize = '20px';
	export let value = 'B';
</script>

{#if BoxColor == '#7c5bca'}
	<div
		style="border: 2px solid {BoxColor}; border-radius: 8px; font-size: 25px; color: white; background-color: {BoxColor}"
	>
		{value}
	</div>
{:else if textcolor == '#7c5bca'}
	<div
		style="border: 2px solid {BoxColor}; border-radius: 8px; font-size: {fontsize}; color: #7c5bca"
	>
		{value}
	</div>
{:else}
	<div style="border: 2px solid {BoxColor}; border-radius: 8px; font-size: {fontsize};">
		{value}
	</div>
{/if}

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50px;
		min-width: 50px;
		margin: 0px 10px;
		background-color: white;
	}
</style>
