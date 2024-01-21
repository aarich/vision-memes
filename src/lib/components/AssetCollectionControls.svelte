<script lang="ts">
	import type { Asset } from '$lib/assets/types';
	import type { View } from '$lib/assets/view';
	import AssetControls from './AssetControls.svelte';

	export let view: View;
	$: assets = view.assets;

	const onDelete = (asset: Asset) => {
		const label = asset.label ? `"${asset.label}"` : 'this element';
		if (confirm(`Are you sure you want to delete ${label}?\n\nNo backsies.`)) {
			view.onDelete(asset);
			view = view;
		}
	};
</script>

{#if assets.length}
	<div class="accordion" id="accordion">
		{#each assets as asset (asset.id)}
			<AssetControls {asset} onDelete={() => onDelete(asset)} />
		{/each}
	</div>
{/if}
