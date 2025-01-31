<script>
	export let onClose = () => undefined;
	export let variant;

	export function showModal() {
		dialog.showModal();
		document.body.classList.add('stop-scroll');
	}

	export function closeModal() {
		document.body.classList.remove('stop-scroll');
		dialog.close();
	}

	let dialog;
</script>

<!-- svelte-ignore  a11y_no_noninteractive_element_interactions a11y_click_events_have_key_events-->
<dialog
	class={variant}
	bind:this={dialog}
	on:close={() => {
		onClose();
		document.body.classList.remove('stop-scroll');
		dialog.close();
	}}
	on:click|self={() => {
		closeModal();
	}}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div on:click|stopPropagation>
		<slot></slot>
	</div>
</dialog>

<style>
	dialog {
		position: fixed;
		margin: auto;
		border: none;
		z-index: 9999;

		height: fit-content;
		width: var(--width, initial);
		max-width: var(--max-width, initial);
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.25);
	}

	.test-klasa {
		/* cisto iz primjera */
		border-radius: 16px;
		height: 200px;
	}
</style>
