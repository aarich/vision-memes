<script lang="ts">
	export let label: String;
	export let onLoadFile: (file: File) => void;
	export let btnClass = 'btn-outline-secondary';

	let fileInput: HTMLInputElement;

	const handleFileUpload = () => {
		const file = fileInput.files?.[0];
		file && onLoadFile(file);
		fileInput.value = '';
	};
</script>

<button type="button" class={`btn ${btnClass}`} on:click={() => fileInput.click()}>
	{label}
</button>

<input
	class="d-none"
	type="file"
	id="formFile"
	accept="image/*"
	on:change={handleFileUpload}
	bind:this={fileInput}
/>
