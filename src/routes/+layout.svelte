<script>
	import Header from './Header.svelte';
	import github from '$lib/images/github.svg';
	import x from '$lib/images/x.svg';
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>

	<footer class="text-center pt-5">
		<div class="container">
			<hr class="mx-5" />
		</div>
		<p class="pt-3 text-muted align-middle">
			by <a href="https://mrarich.com/about" target="_blank">Alex</a>
			&#x2022;
			<a href="https://github.com/aarich/vision-memes" target="_blank">
				<img style="height: 2em;" class="img-fluid" src={github} alt="github" />
			</a>
			<a href="https://x.com/mr_arich" target="_blank">
				<img style="height: 1.6em;" class="img-fluid" src={x} alt="twitter" />
			</a>
		</p>
	</footer>
</div>
