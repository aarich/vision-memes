<script>
	import Header from './Header.svelte';
	import github from '$lib/images/github.svg';
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
		<p class="pt-3">
			Made with ❤️ by <a href="https://x.com/mr_arich" target="_blank">Alex</a>
		</p>
		<p>
			<a
				href="https://github.com/aarich/vision-memes"
				class="link-underline link-underline-opacity-0 align-middle"
				target="_blank"
			>
				<span class="text-muted">source code on</span>
				<img style="height: 2em;" class="img-fluid" src={github} alt="github" />
			</a>
		</p>
	</footer>
</div>
