<script lang="ts">
	import type { Asset } from '$lib/assets/types';
	import AssetControls from './AssetControls.svelte';

	export let assets: Asset[];
</script>

{#if assets.length}
	<div class="accordion" id="accordion">
		{#each assets as asset (asset.id)}
			<AssetControls {asset} />
		{/each}
	</div>
{/if}
