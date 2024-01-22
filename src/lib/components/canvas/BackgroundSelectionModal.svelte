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
				<p class="mt-2">
					Have a recommendation? Send it to me on <a href="https://x.com/mr_arich" target="_blank"
						>Twitter</a
					>
					or open a
					<a href="https://github.com/aarich/vision-memes" target="_blank">pull request</a>!
				</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
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
	Select Background
</button>
