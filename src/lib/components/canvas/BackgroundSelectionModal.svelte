<script lang="ts">
	import { IMAGES } from '$lib/images/images';

	export let onSelect: (url: string) => void;
</script>

<div
	class="modal fade"
	id="bgSelect"
	tabindex="-1"
	aria-labelledby="bgSelectLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-lg">
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
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
</div>
