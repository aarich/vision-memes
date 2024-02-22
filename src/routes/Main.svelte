<script lang="ts">
	import { View } from '$lib/assets/view';
	import AssetCollectionControls from '$lib/components/AssetCollectionControls.svelte';
	import FileInput from '$lib/components/FileInput.svelte';
	import HelpModal from '$lib/components/HelpModal.svelte';
	import SamplesModal from '$lib/components/SamplesModal.svelte';
	import BackgroundSelectionModal from '$lib/components/canvas/BackgroundSelectionModal.svelte';
	import SaveCanvasButton from '$lib/components/canvas/SaveCanvasButton.svelte';
	import { onMount } from 'svelte';

	let viewParent: HTMLElement;
	let ctrlsGroup: HTMLDivElement;

	$: view = undefined as View | undefined;

	onMount(() => {
		View.create(viewParent).then((createdView) => {
			view = createdView;

			// enable controls
			ctrlsGroup.classList.remove('d-none');
		});
	});

	const handleFileUpload = (file: File) => view?.addImage(file!).then(() => (view = view));

	const addImageByURL = () => {
		const url = prompt('Enter a URL to an image');
		if (url) {
			view?.addImage(url).then(() => (view = view));
		}
	};
</script>

<div class="d-md-none container">
	<div class="alert alert-warning" role="alert">
		Heads up! This tool is best experienced on a computer.
	</div>
</div>

<div class="my-3 text-center w-auto" bind:this={viewParent}>
	<div class="spinner-border m-5" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>

<div class="container">
	<div class="mb-3">
		<div class="row row-cols-auto gx-3">
			<div class="col btn-group d-none" bind:this={ctrlsGroup}>
				<FileInput label="Add Image" onLoadFile={handleFileUpload} />
				<button type="button" class="btn btn-outline-secondary" on:click={addImageByURL}>
					Add Image by URL
				</button>
				<button
					type="button"
					class="btn btn-outline-secondary"
					on:click={() => view?.addText().then(() => (view = view))}
				>
					Add Text
				</button>
				<BackgroundSelectionModal onSelect={(newImage) => view?.setBackground(newImage)} />
			</div>
			<div class="col btn-group">
				<SamplesModal />
				<HelpModal />
				<SaveCanvasButton {view} />
			</div>
		</div>
	</div>

	{#if view}
		<AssetCollectionControls {view} />
	{/if}
</div>
