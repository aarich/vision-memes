<script lang="ts">
	import type { ControlBehavior, DropdownControl } from '$lib/assets/types';

	export let control: ControlBehavior<string>;
	$: setting = control.setting as DropdownControl;
	$: value = control.value;
</script>

<select class="form-select" aria-label="Select an option" bind:value={control.value}>
	{#each setting.options as option (option.value)}
		<option selected={option.value === value} value={option.value}>{option.label}</option>
	{/each}
</select>
