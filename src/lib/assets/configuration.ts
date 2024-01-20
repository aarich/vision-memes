import type { Asset, ControlBehavior, ControlSetting } from "./types";

export const DISTANCE = { MIN: 0, MAX: 100 }

export const CONTROLS: Record<string, ControlSetting> = {
    OPACITY: { type: 'slider', min: 0, max: 1, label: 'Opacity' },
    VISIBLE: { type: 'checkbox', label: 'Visible' },
    LABEL: { type: 'text', label: 'Label' },
    DISTANCE: { type: 'slider', min: DISTANCE.MIN, max: DISTANCE.MAX, label: 'Distance' },
}

export const createInitialSettings = (asset: Asset, onRerender: VoidFunction) => [
    new ControlBehaviorImpl<string>(CONTROLS.LABEL, asset, (a, v) => a.label = v, '', onRerender),
    new ControlBehaviorImpl<boolean>(CONTROLS.VISIBLE, asset, (a, v) => a.setVisible(v), true, onRerender),
    new ControlBehaviorImpl<number>(CONTROLS.OPACITY, asset, (a, v) => a.setOpacity(v), 1, onRerender),
    new ControlBehaviorImpl<number>(CONTROLS.DISTANCE, asset, (a, v, prevValue) => a.setDistance(prevValue, v), (DISTANCE.MAX + DISTANCE.MIN) / 2, onRerender),
]

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
