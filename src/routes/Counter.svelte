<script lang="ts">
	import { View } from '$lib/assets/view';
	import AssetCollectionControls from '$lib/components/AssetCollectionControls.svelte';
	import { onMount } from 'svelte';

	let viewParent: HTMLElement;
	let fileInput: HTMLInputElement;

	$: view = undefined as View | undefined;
	$: assets = view?.assets ?? [];

	onMount(() => {
		view = View.create(viewParent);
	});

	const handleFileUpload = () => {
		const file = fileInput.files?.[0];
		view?.addImage(file!).then(() => (view = view));
	};
</script>

<div bind:this={viewParent}></div>
<input class="" type="file" accept="image/*" on:change={handleFileUpload} bind:this={fileInput} />

<AssetCollectionControls {assets} />
