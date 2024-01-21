<script lang="ts">
	import { View } from '$lib/assets/view';
	import AssetCollectionControls from '$lib/components/AssetCollectionControls.svelte';
	import HelpModal from '$lib/components/HelpModal.svelte';
	import BackgroundSelectionModal from '$lib/components/canvas/BackgroundSelectionModal.svelte';
	import SaveCanvasButton from '$lib/components/canvas/SaveCanvasButton.svelte';
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
		fileInput.value = '';
	};

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

<div class="my-3 text-center w-auto" bind:this={viewParent}></div>

<div class="container">
	<div class="mb-3">
		<div class="row row-cols-auto gx-3">
			<div class="col btn-group">
				<button type="button" class="btn btn-outline-secondary" on:click={() => fileInput.click()}>
					Add Image
				</button>
				<button type="button" class="btn btn-outline-secondary" on:click={addImageByURL}>
					Add Image by URL
				</button>

				<input
					class="d-none"
					type="file"
					id="formFile"
					accept="image/*"
					on:change={handleFileUpload}
					bind:this={fileInput}
				/>
				<button
					type="button"
					class="btn btn-outline-secondary"
					on:click={() => view?.addText().then(() => (view = view))}
				>
					Add Text
				</button>
				<button
					type="button"
					class="btn btn-outline-secondary"
					data-bs-toggle="modal"
					data-bs-target="#bgSelect"
				>
					Choose a background
				</button>
			</div>

			<div class="col">
				<HelpModal />
			</div>
			<div class="col">
				<SaveCanvasButton {view} />
			</div>
		</div>

		<BackgroundSelectionModal onSelect={(newImage) => view?.setBackground(newImage)} />
	</div>

	{#if view}
		<AssetCollectionControls {view} />
	{/if}
</div>
