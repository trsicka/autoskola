<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
</script>

<div>{page.error?.message}</div>
{#if page.status === 401}
	<button
		onclick={() => {
			goto('/login');
		}}
	>
		Try to login again!
	</button>
{/if}
