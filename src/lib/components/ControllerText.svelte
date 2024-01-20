<script lang="ts">
	import type { ControlBehavior, NumberControl } from '$lib/assets/types';

	export let control: ControlBehavior<string>;
</script>

<input bind:value={control.value} />
