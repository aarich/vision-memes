<script lang="ts">
	import type { Asset } from '$lib/assets/types';
	import AssetControls from './AssetControls.svelte';

	export let assets: Asset[];
</script>

<h1>Settings</h1>

{#each assets as asset}
	<AssetControls {asset} />
{/each}
