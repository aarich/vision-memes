<script lang="ts">
	import type { Asset } from '$lib/assets/types';
	import ControllerCheckbox from './ControllerCheckbox.svelte';
	import ControllerSlider from './ControllerSlider.svelte';

	export let asset: Asset;
	$: label = asset?.label;
</script>

<h2>{label}</h2>

{#each asset.settings as control (control.setting?.label)}
	<span>
		{control.setting?.label}

		{#if control.isSlider()}
			<ControllerSlider {control} />
		{:else if control.isCheckbox()}
			<ControllerCheckbox {control} />
		{:else if control.isText()}
			<input bind:value={control.value} on:change={() => (asset = asset)} />
		{/if}
	</span>
{/each}
