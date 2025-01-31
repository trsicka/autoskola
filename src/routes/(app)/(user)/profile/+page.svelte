<script>
	let { data } = $props();
</script>

<div class="main-container">
	<header class="header">
		<div class="left-section">Profil</div>
	</header>

	<div>
		<div class="info">
			<div class="osobni-podaci">
				<div>ime prezime: {data.user.instruktor_name}</div>
				<div>OIB: {data.user.oib}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.header {
		height: 89px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30px 10%;

		color: black;
		font-size: 32px;
		background-color: white;

		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	.main-container {
		width: 100%;
	}

	.left-section {
		font-size: 34px;
	}

	.info {
		width: 500px;
		height: max-content;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		margin: 10px;
	}

	.osobni-podaci {
		display: flex;
		align-items: start;
		flex-direction: column;
		padding: 10px;
		gap: 10px;
	}
</style>
