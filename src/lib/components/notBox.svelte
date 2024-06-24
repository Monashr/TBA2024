<script>
	export let data;
	export let name;
</script>

<div class="minimal-box">
	{name}
	{data}
</div>

<style>
	.minimal-box {
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
</style>
