declare module 'troika-three-text' {
	import type { Color, Mesh } from 'three';

	class Text extends Mesh {
		text: string;
		fontSize: number;
		color: string | number | Color;
		fontWeight: number | 'normal' | 'bold';
		sync: VoidFunction;
	}
}
