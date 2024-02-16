import type { Mesh } from "three";

export interface ControlBehavior<T = never> {
	setting: Control;
	value: T;
	isSlider(): this is ControlBehavior<number>;
	isCheckbox(): this is ControlBehavior<boolean>;
	isText(): this is ControlBehavior<string>;
	isDropdown(): this is ControlBehavior<string>;
	isLabelForText(): this is ControlBehavior<string>;
}

export type XY = 'X' | 'Y';

export interface Asset {
	setVisible(visible: boolean): void;
	setOpacity(value: number): void;
	setDistance(oldValue: number, newValue: number): void;
	setSize(oldValue: number, newValue: number): void;
	setPosition(oldValue: number, newValue: number, xOrY: XY): void;
	setAngle(oldValue: number, newValue: number, xOrY: XY): void;
	isText(): boolean,
	settings: ControlBehavior<any>[];
	settingsGroups: ControlBehavior<any>[][];
	label: string;
	id: string;
	mesh: Mesh;
}

export interface Control {
	type: 'number' | 'text' | 'checkbox' | 'dropdown';
	label: string;
}

export interface NumberControl extends Control {
	type: 'number';
	min: number;
	max: number;
}

export interface DropdownControl extends Control {
	options: Option[];
}

export type Option = { label: string; value: string };
