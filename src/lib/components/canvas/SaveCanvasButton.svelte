<script lang="ts">
	import type { View } from '$lib/assets/view';

	export let view: View | undefined;
	$: assets = view?.assets;
	$: clazz = `btn btn-outline-${assets?.length ? 'primary' : 'secondary'}`;
</script>

<button type="button" class={clazz} on:click={() => view?.downloadImage()}>Download</button>
