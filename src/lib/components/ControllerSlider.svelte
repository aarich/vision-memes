<script lang="ts">
	import type { ControlBehavior, NumberControl } from '$lib/assets/types';

	export let control: ControlBehavior<number>;
	$: setting = control.setting as NumberControl;
</script>

<input
	type="range"
	bind:value={control.value}
	min={setting.min}
	max={setting.max}
	step={(setting.max - setting.min) / 40}
	class="form-range"
/>
