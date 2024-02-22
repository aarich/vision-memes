import {
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
	type Renderer,
	TextureLoader
} from 'three';
import { UserImage } from './image';
import type { Asset } from './types';
import { UserText } from './text';
import { IMAGES } from '$lib/images/images';

export class View {
	assets: Asset[];
	scene: Scene;
	renderer: Renderer;
	camera: PerspectiveCamera;
	width: number;

	static create(parentElement: HTMLElement) {
		const bounds = parentElement.getBoundingClientRect();
		const { width, height } = bounds;
		const scene = new Scene();
		const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
		const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
		renderer.setSize(width, height);

		parentElement.innerHTML = '';
		parentElement.appendChild(renderer.domElement);

		const view = new View(scene, renderer, camera, width);

		return view.setBackground(IMAGES[0]).then(() => view);
	}

	constructor(scene: Scene, renderer: Renderer, camera: PerspectiveCamera, width: number) {
		this.assets = [];
		this.scene = scene;
		this.renderer = renderer;
		this.camera = camera;
		this.width = width
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}

	addText() {
		return UserText.create(this.scene, () => this.render())
			.then((i) => this.assets.push(i))
			.then(() => this.render());
	}

	addImage(file: Blob | MediaSource | string) {
		return UserImage.create(file, this.scene, () => this.render())
			.then((i) => this.assets.push(i))
			.then(() => this.render());
	}

	setBackground(background: File | string) {
		return new Promise<void>(resolve => {
			let url: string;
			if (typeof background === 'string') {
				url = background
			} else {
				url = URL.createObjectURL(background);
			}

			new TextureLoader().load(url, (texture) => {

				const img = texture.image;
				const bgWidth = img.width;
				const bgHeight = img.height;

				const aspect = bgWidth / bgHeight;

				this.renderer.setSize(this.width, this.width / aspect);
				this.camera.aspect = aspect;
				this.camera.updateProjectionMatrix();
				this.scene.background = texture;
				this.render();

				resolve();
			});

		});
	}

	downloadImage() {
		const imgData = this.renderer.domElement.toDataURL();

		const link = document.createElement('a');

		link.setAttribute('href', imgData);
		link.setAttribute('target', '_blank');
		link.setAttribute('download', 'vision-meme');

		link.click();
	}

	onDelete(asset: Asset) {
		this.scene.remove(asset.mesh);
		this.assets = this.assets.filter(a => a !== asset);
		this.render();
	}
}
