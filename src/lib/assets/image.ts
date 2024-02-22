import {
	PlaneGeometry,
	Mesh,
	MeshBasicMaterial,
	TextureLoader,
	Scene,
	DoubleSide
} from 'three';
import { BaseAsset } from './baseAsset';

function toDataURL(
	url: string,
	callback: (result: string | ArrayBuffer | null) => void,
	isSecondAttempt = false
) {
	const xhr = new XMLHttpRequest();
	xhr.open('get', url);
	xhr.responseType = 'blob';
	xhr.onload = function () {
		const fr = new FileReader();
		fr.onload = function () {
			callback(this.result);
		};
		fr.readAsDataURL(xhr.response); // async call
	};

	if (!isSecondAttempt) {
		xhr.onerror = () => {
			console.log('going to a cors proxy for this image. Sorry!');
			toDataURL(`https://corsproxy.io/?${url}`, (r) => callback(r), true);
		};
	}

	xhr.send();
}

export class UserImage extends BaseAsset {
	mesh: Mesh;
	label = 'Image';

	static create(
		file: Blob | MediaSource | string,
		scene: Scene,
		onRerender: VoidFunction
	): Promise<UserImage> {
		return new Promise((resolve) => {
			let urlPromise: Promise<string>;
			if (typeof file === 'string') {
				urlPromise = new Promise<string>((resolveUrl) => {
					toDataURL(file, (r) => resolveUrl(r as string));
				});
			} else {
				urlPromise = Promise.resolve(URL.createObjectURL(file));
			}

			urlPromise.then((url) => {
				new TextureLoader().load(
					url,
					(texture) => {
						const aspectRatio = texture.image.width / texture.image.height;
						const geometry = new PlaneGeometry(aspectRatio);
						const material = new MeshBasicMaterial({ map: texture });
						material.transparent = true;
						material.opacity = 0.7;
						material.side = DoubleSide;
						const mesh = new Mesh(geometry, material);
						mesh.position.set(0, 0, -3);

						scene.add(mesh);
						resolve(new UserImage(mesh, onRerender));
					},
					undefined,
					(e) => {
						console.log(e);
						alert('Error loading image');
					}
				);
			});
		});
	}

	constructor(mesh: Mesh, onRerender: VoidFunction) {
		super(onRerender);
		this.mesh = mesh;
	}

	isText = () => false;
}
