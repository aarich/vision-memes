<script lang="ts">
	const postInfos = [
		{
			url: 'https://twitter.com/mr_arich/status/1749150388421644587?ref_src=twsrc%5Etfw',
			date: 'January 21, 2024',
			source: 'Alex Rich (@mr_arich)',
			picId: 'wrt58rI2Br',
			imgSrc: 'https://pbs.twimg.com/media/GEY5ifLbUAAzJew?format=jpg&name=small'
		},
		{
			url: 'https://twitter.com/mrdoob/status/1749252133042733148?ref_src=twsrc%5Etfw',
			date: 'January 22, 2024',
			source: 'mrdoob (@mrdoob)',
			picId: 'tCQGsEct04',
			imgSrc: 'https://pbs.twimg.com/media/GEaXi5pbIAA85sh?format=jpg&name=small'
		},
		{
			url: 'https://twitter.com/ErikRobson/status/1749173042704679277?ref_src=twsrc%5Etfw',
			date: 'January 21, 2024',
			source: 'Erik Robson (@ErikRobson)',
			picId: 'NIKTR8X9Ur',
			imgSrc: 'https://pbs.twimg.com/media/GEZPea6asAAllv2?format=jpg&name=small'
		}
	];
</script>

<button
	type="button"
	class="btn btn-outline-secondary"
	data-bs-toggle="modal"
	data-bs-target="#samples"
>
	Samples
</button>

<div
	class="modal fade"
	id="samples"
	tabindex="-1"
	aria-labelledby="samplesLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="samplesLabel">Samples</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="row row-cols-1 g-1">
					{#each postInfos as post (post.url)}
						<figure class="figure">
							<a href={post.url}>
								<img src={post.imgSrc} alt="sample" class="figure-img img-fluid" />
							</a>
							<figcaption class="figure-caption text-end">
								&mdash;
								<a href={post.url}>
									{post.source}
								</a>
							</figcaption>
						</figure>
					{/each}
				</div>
				<p class="mt-2">
					Got one to add? <a href="https://x.com/mr_arich" target="_blank">Send it to me</a>
					or open a
					<a href="https://github.com/aarich/vision-memes" target="_blank">pull request</a>!
				</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Done</button>
			</div>
		</div>
	</div>
</div>
