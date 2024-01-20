import { PlaneGeometry, type Material, Mesh, MeshBasicMaterial, TextureLoader, Scene } from "three";
import { DISTANCE, createInitialSettings } from "./configuration";
import type { Asset, ControlBehavior } from "./types";
import { clamp } from "three/src/math/MathUtils.js";

export class UserImage implements Asset {
    private _mesh: Mesh;
    private _settings: ControlBehavior<any>[];
    label = '';

    static create(file: Blob | MediaSource, scene: Scene, onRerender: VoidFunction): Promise<UserImage> {
        return new Promise(resolve => {
            new TextureLoader().load(URL.createObjectURL(file), (texture) => {
                const aspectRatio = texture.image.width / texture.image.height;
                const geometry = new PlaneGeometry(aspectRatio, 1);
                const material = new MeshBasicMaterial({ map: texture });
                const mesh = new Mesh(geometry, material);
                mesh.position.set(0, 0, -5)
                scene.add(mesh);
                resolve(new UserImage(mesh, onRerender));
            });
        })
    }

    constructor(mesh: Mesh, onRerender: VoidFunction) {
        this._mesh = mesh;
        this._settings = createInitialSettings(this, onRerender);
    }

    get settings() {
        return this._settings;
    }

    setVisible(visible: boolean) {
        this._mesh.visible = visible;
    }

    setOpacity(value: number) {
        if (value === 1) {
            this._material.transparent = false;
        } else {
            this._material.transparent = true;
            this._material.opacity = value ?? 1;
        }
    }

    setDistance(oldValue: number, newValue: number) {
        this._mesh.position.multiplyScalar(clamp(newValue, 1, DISTANCE.MAX) / clamp(oldValue, 1, DISTANCE.MAX));
    }

    private get _material(): Material {
        const m = this._mesh.material;
        if (Array.isArray(m)) {
            return m[0];
        }

        return m;
    }


}