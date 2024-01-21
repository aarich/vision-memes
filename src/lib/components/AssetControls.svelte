<script lang="ts">
	import type { Asset } from '$lib/assets/types';
	import ControllerDropdown from './ControllerDropdown.svelte';
	import ControllerSlider from './ControllerSlider.svelte';

	export let onDelete: VoidFunction;
	export let asset: Asset;

	$: label = asset.label;

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
			<table class="table table-borderless">
				<tbody>
					{#each asset.settings as control (control.setting?.label)}
						<tr>
							<td style="width: 20%">{control.setting?.label}</td>
							<td>
								{#if control.isSlider()}
									<ControllerSlider {control} />
								{:else if control.isDropdown()}
									<ControllerDropdown {control} />
								{:else if control.isCheckbox()}
									<input type="checkbox" class="form-check-input" bind:checked={control.value} />
								{:else if control.isLabelForText()}
									<textarea bind:value={control.value} class="form-control" />
								{:else if control.isText()}
									<input bind:value={control.value} class="form-control" />
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="text-center">
				<button on:click={onDelete} class="btn btn-outline-danger btn-sm">Delete</button>
			</div>
		</div>
	</div>
</div>
