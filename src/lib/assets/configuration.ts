import type { Asset, ControlBehavior, ControlSetting } from "./types";

export const DISTANCE = { MIN: 0, MAX: 100 }

export const CONTROLS = {
    OPACITY: { type: 'slider', min: 0, max: 1, label: 'Opacity' },
    VISIBLE: { type: 'checkbox', label: 'Visible' },
    LABEL: { type: 'text', label: 'Label' },
    DISTANCE: { type: 'slider', min: DISTANCE.MIN, max: DISTANCE.MAX, label: 'Distance' },
    SIZE: { type: 'slider', min: 1, max: 21, label: 'Size' },
    H_POS: { type: 'slider', min: -40, max: 40, label: 'Horizontal Position' },
    V_POS: { type: 'slider', min: -40, max: 40, label: 'Vertical Position' },
    H_ANGLE: { type: 'slider', min: -80, max: 80, label: 'Horizontal Angle' },
    V_ANGLE: { type: 'slider', min: -80, max: 80, label: 'Vertical Angle' },
} as const;

export const createInitialSettings = (asset: Asset, onRerender: VoidFunction) => {
    const create = <T>(ctrl: keyof typeof CONTROLS, fn: (asset: Asset, value: T, oldValue: T) => void, value: T) =>
        new ControlBehaviorImpl<T>(CONTROLS[ctrl], asset, fn, value, onRerender);
    return [
        create('LABEL', (a, v) => { a.label = v; requestAnimationFrame(onRerender); }, ''),
        create('VISIBLE', (a, v) => a.setVisible(v), true),
        create('OPACITY', (a, v) => a.setOpacity(v), 0.7),
        create('DISTANCE', (a, v, prevValue) => a.setDistance(prevValue, v), (DISTANCE.MAX + DISTANCE.MIN) / 2),
        // create('SIZE', (a, v, prevValue) => a.setSize(prevValue, v), 11),
        create('H_POS', (a, v, prevValue) => a.setPosition(v, prevValue, 'Y'), 0), // backward to make the slider happy
        create('V_POS', (a, v, prevValue) => a.setPosition(prevValue, v, 'X'), 0),
        create('H_ANGLE', (a, v, prevValue) => a.setAngle(prevValue, v, 'Y'), 0),
        create('V_ANGLE', (a, v, prevValue) => a.setAngle(prevValue, v, 'X'), 0),
    ]
};

export class ControlBehaviorImpl<T = never> implements ControlBehavior<T> {
    setting: ControlSetting;
    private _value: T;
    private _asset: Asset;
    private _onChange: (asset: Asset, value: T, oldValue: T) => void;
    private _onRerender: VoidFunction;

    constructor(setting: ControlSetting, asset: Asset, onChange: (asset: Asset, value: T, oldValue: T) => void, value: T, onRerender: VoidFunction) {
        this.setting = setting;
        this._asset = asset;
        this._onChange = onChange;
        this._value = value;
        this._onRerender = onRerender;
    }

    public get value() {
        return this._value;
    }

    public set value(v: T) {
        this._onChange(this._asset, v, this._value);
        this._value = v;
        this._onRerender();
    }

    isSlider = () => this.setting.type === 'slider';
    isLabel = () => this.setting === CONTROLS.LABEL;
    isCheckbox = () => this.setting.type === 'checkbox';
    isText = () => this.setting.type === 'text';
}
