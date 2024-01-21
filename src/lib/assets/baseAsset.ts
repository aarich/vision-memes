
import { type Material, Matrix4, Mesh } from 'three';
import { DISTANCE, createInitialSettings } from './configuration';
import type { Asset, ControlBehavior } from './types';
import { clamp, degToRad } from 'three/src/math/MathUtils.js';

export abstract class BaseAsset implements Asset {
    _settings: ControlBehavior<any>[];
    id: string;

    abstract label: string;
    abstract mesh: Mesh;
    abstract isText(): boolean;

    constructor(onRerender: VoidFunction) {
        this._settings = createInitialSettings(this, onRerender);
        this.id = Date.now() + '';
    }

    get settings() {
        return this._settings;
    }

    setVisible(visible: boolean) {
        this.mesh.visible = visible;
    }

    setOpacity(value: number) {
        this._material.opacity = value ?? 1;
    }

    setDistance(oldValue: number, newValue: number) {
        this.mesh.position.multiplyScalar(
            clamp(newValue, 1, DISTANCE.MAX) / clamp(oldValue, 1, DISTANCE.MAX)
        );
    }

    setSize(oldValue: number, newValue: number) {
        this.mesh.scale.multiplyScalar(newValue / oldValue);
    }

    setPosition(oldValue: number, newValue: number, xOrY: 'X' | 'Y') {
        this.mesh.applyMatrix4(new Matrix4()[`makeRotation${xOrY}`](degToRad(newValue - oldValue)));
    }

    setAngle(oldValue: number, newValue: number, xOrY: 'X' | 'Y') {
        this.mesh[`rotate${xOrY}`](degToRad(newValue - oldValue));
    }

    private get _material(): Material {
        const m = this.mesh.material;
        if (Array.isArray(m)) {
            console.warn('Found multiple materials. This is unexpected');
            return m[0];
        }

        return m;
    }
}
