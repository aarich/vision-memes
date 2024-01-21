export interface ControlBehavior<T = never> {
    setting: ControlSetting;
    value: T;
    isSlider(): this is ControlBehavior<number>;
    isCheckbox(): this is ControlBehavior<boolean>;
    isText(): this is ControlBehavior<string>;
}

export type XY = 'X' | 'Y';

export interface Asset {
    setVisible(visible: boolean): void;
    setOpacity(value: number): void;
    setDistance(oldValue: number, newValue: number): void;
    setSize(oldValue: number, newValue: number): void;
    setPosition(oldValue: number, newValue: number, xOrY: XY): void;
    setAngle(oldValue: number, newValue: number, xOrY: XY): void;
    settings: ControlBehavior<any>[];
    label: string;
    id: string;
}


interface Control {
    type: 'slider' | 'number' | 'text' | 'checkbox'
    label: string,
}

export interface NumberControl<T extends 'slider' | 'number'> extends Control {
    type: T;
    min: number;
    max: number;
}

export type ControlSetting = NumberControl<'number' | 'slider'> | Control;