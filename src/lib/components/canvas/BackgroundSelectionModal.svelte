<script lang="ts">
	import { URLS } from '$lib/constants';
	import { IMAGES } from '$lib/images/images';
	import FileInput from '../FileInput.svelte';

	export let onSelect: (url: string | File) => void;
	let cancelBtn: HTMLElement;

	const handleFileUpload = (file: File) => {
		cancelBtn.click();
		onSelect(file);
	};
</script>

<div
	class="modal fade"
	id="bgSelect"
	tabindex="-1"
	aria-labelledby="bgSelectLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-lg modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="bgSelectLabel">Select a background</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row row-cols-2 g-1">
					{#each IMAGES as image (image)}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="col" on:click={() => onSelect(image)} data-bs-dismiss="modal">
							<img src={image} class="img-fluid" alt={image} />
						</div>
					{/each}
				</div>
				<p class="mt-2">
					Have a recommendation?
					<a href={URLS.X} target="_blank">Send it to me</a>
					or
					<a href={URLS.GH} target="_blank">open a pull request</a>!
				</p>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-outline-secondary"
					data-bs-dismiss="modal"
					bind:this={cancelBtn}>Cancel</button
				>
				<FileInput label="Upload your own" onLoadFile={handleFileUpload} btnClass="btn-secondary" />
			</div>
		</div>
	</div>
</div>

<button
	type="button"
	class="btn btn-outline-secondary"
	data-bs-toggle="modal"
	data-bs-target="#bgSelect"
>
	Set Background
</button>
