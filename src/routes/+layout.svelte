<script>
	import Header from './Header.svelte';
	import github from '$lib/images/github.svg';
	import x from '$lib/images/x.svg';
	import { URLS } from '$lib/constants';

	$: showPrivacy = false;
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
			<a href={URLS.GH} target="_blank">
				<img style="height: 2em;" class="img-fluid" src={github} alt="github" />
			</a>
			<a href={URLS.X} target="_blank">
				<img style="height: 1.6em;" class="img-fluid" src={x} alt="twitter" />
			</a>
			&#x2022;
			<span class="align-middle">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<span on:mouseover={() => (showPrivacy = true)} on:mouseout={() => (showPrivacy = false)}>
					Privacy
				</span>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<span
					style="position: absolute; padding-top: 0.25em;"
					on:mouseover={() => (showPrivacy = true)}
					on:mouseout={() => (showPrivacy = false)}
					class={`${showPrivacy ? '' : 'd-none'} align-middle`}
				>
					: I don't store or collect anything
				</span>
			</span>
		</p>
	</footer>
</div>
