import {
	PlaneGeometry,
	type Material,
	Mesh,
	MeshBasicMaterial,
	TextureLoader,
	Scene,
	Matrix4
} from 'three';
import { DISTANCE, createInitialSettings } from './configuration';
import type { Asset, ControlBehavior } from './types';
import { clamp, degToRad } from 'three/src/math/MathUtils.js';

function toDataURL(
	url: string,
	callback: (result: string | ArrayBuffer | null) => void,
	isSecondAttempt = false
) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url);
	xhr.responseType = 'blob';
	xhr.onload = function () {
		var fr = new FileReader();
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

export class UserImage implements Asset {
	private _mesh: Mesh;
	private _settings: ControlBehavior<any>[];
	label = 'Image';
	id: string;

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
						const geometry = new PlaneGeometry(aspectRatio, 1);
						const material = new MeshBasicMaterial({ map: texture });
						material.transparent = true;
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
		this._mesh = mesh;
		this._settings = createInitialSettings(this, onRerender);
		this.id = Date.now() + '';
	}

	get settings() {
		return this._settings;
	}

	setVisible(visible: boolean) {
		this._mesh.visible = visible;
	}

	setOpacity(value: number) {
		this._material.opacity = value ?? 1;
	}

	setDistance(oldValue: number, newValue: number) {
		this._mesh.position.multiplyScalar(
			clamp(newValue, 1, DISTANCE.MAX) / clamp(oldValue, 1, DISTANCE.MAX)
		);
	}

	setSize(oldValue: number, newValue: number) {
		this._mesh.geometry.scale(newValue / oldValue, newValue / oldValue, newValue / oldValue);
	}

	setPosition(oldValue: number, newValue: number, xOrY: 'X' | 'Y') {
		this._mesh.applyMatrix4(new Matrix4()[`makeRotation${xOrY}`](degToRad(newValue - oldValue)));
	}

	setAngle(oldValue: number, newValue: number, xOrY: 'X' | 'Y') {
		this._mesh[`rotate${xOrY}`](degToRad(newValue - oldValue));
	}

	private get _material(): Material {
		const m = this._mesh.material;
		if (Array.isArray(m)) {
			return m[0];
		}

		return m;
	}
}
