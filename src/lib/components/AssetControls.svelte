<script lang="ts">
	import type { Asset } from '$lib/assets/types';
	import ControllerDropdown from './ControllerDropdown.svelte';
	import ControllerSlider from './ControllerSlider.svelte';

	export let asset: Asset;
	$: label = asset?.label ?? ' ';
	const id = `collapse${asset.id}`;
	const selector = `#${id}`;
</script>

<div class="accordion-item">
	<h2 class="accordion-header">
		<button
			class="accordion-button"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target={selector}
			aria-expanded="true"
			aria-controls={id}
		>
			{label}
		</button>
	</h2>
	<div {id} class="accordion-collapse collapse show" data-bs-parent="#accordion">
		<div class="accordion-body">
			<ul class="list-group">
				{#each asset.settings as control (control.setting?.label)}
					<li class="list-group-item">
						<span>
							{control.setting?.label}

							{#if control.isSlider()}
								<ControllerSlider {control} />
							{:else if control.isDropdown()}
								<ControllerDropdown {control} />
							{:else if control.isCheckbox()}
								<input type="checkbox" class="form-check-input" bind:checked={control.value} />
							{:else if control.isText()}
								<input bind:value={control.value} on:change={() => (asset = asset)} />
							{/if}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
