import { type Material, Scene, Matrix4 } from 'three';
import { CONTROLS, ControlBehaviorImpl, DISTANCE, createInitialSettings } from './configuration';
import type { Asset, ControlBehavior } from './types';
import { clamp, degToRad } from 'three/src/math/MathUtils.js';
import { Text } from 'troika-three-text';

export class UserText implements Asset {
    private text: Text;
    private _settings: ControlBehavior<any>[];
    _label = 'Text';
    id: string;

    static create(scene: Scene, onRerender: VoidFunction): Promise<UserText> {
        return new Promise(async (resolve) => {
            const myText = new Text();
            myText.text = 'Text';
            myText.fontSize = 0.2;
            myText.position.z = -2;
            myText.color = 'white';
            myText.fontWeight = 'bold';
            scene.add(myText);
            myText.sync();

            requestAnimationFrame(onRerender);

            resolve(new UserText(myText, onRerender));
        });
    }

    constructor(text: Text, onRerender: VoidFunction) {
        this.text = text;
        this._settings = createInitialSettings(this, onRerender);
        this._settings.push(
            new ControlBehaviorImpl(CONTROLS.COLOR, this, (_, v) => this.setColor(v), 'white', onRerender)
        );
        this.id = Date.now() + '';
    }

    get settings() {
        return this._settings;
    }

    get label() {
        return this._label;
    }

    set label(label: string) {
        this._label = label;
        this.text.text = label;
    }

    setColor(color: string) {
        this.text.color = color;
    }

    setVisible(visible: boolean) {
        this.text.visible = visible;
    }

    setOpacity(value: number) {
        this._material.opacity = value ?? 1;
    }

    setDistance(oldValue: number, newValue: number) {
        this.text.position.multiplyScalar(
            clamp(newValue, 1, DISTANCE.MAX) / clamp(oldValue, 1, DISTANCE.MAX)
        );
    }

    setSize(oldValue: number, newValue: number) {
        this.text.scale.multiplyScalar(newValue / oldValue);
    }

    setPosition(oldValue: number, newValue: number, xOrY: 'X' | 'Y') {
        this.text.applyMatrix4(new Matrix4()[`makeRotation${xOrY}`](degToRad(newValue - oldValue)));
    }

    setAngle(oldValue: number, newValue: number, xOrY: 'X' | 'Y') {
        this.text[`rotate${xOrY}`](degToRad(newValue - oldValue));
    }

    private get _material(): Material {
        const m = this.text.material;
        if (Array.isArray(m)) {
            return m[0];
        }

        return m;
    }
}
