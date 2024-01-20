<script lang="ts">
	import type { ControlBehavior } from '$lib/assets/types';
	export let control: ControlBehavior<boolean>;
</script>

<input type="checkbox" bind:checked={control.value} />
