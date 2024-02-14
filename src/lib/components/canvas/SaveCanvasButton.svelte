<script lang="ts">
	import type { View } from '$lib/assets/view';

	export let view: View | undefined;
</script>

<button type="button" class="btn btn-outline-secondary" on:click={() => view?.downloadImage()}>
	Download
</button>
