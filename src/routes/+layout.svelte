<script>
	import Header from './Header.svelte';
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>Check out <a href="https://projects.mrarich.com">more projects</a> by Alex.</p>
	</footer>
</div>
