import { Scene } from 'three';
import { CONTROLS, ControlBehaviorImpl } from './configuration';
import { Text } from 'troika-three-text';
import { BaseAsset } from './baseAsset';

export class UserText extends BaseAsset {
    private text: Text;
    _label = 'Text';

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
        super(onRerender);
        this.text = text;
        this._settings.push(
            new ControlBehaviorImpl(CONTROLS.COLOR, this, (_, v) => this.setColor(v), 'white', onRerender)
        );
    }

    set label(label: string) {
        this._label = label;
        this.text.text = label;
    }

    get label() {
        return this._label;
    }

    get mesh() {
        return this.text;
    }

    setSize(oldValue: number, newValue: number): void {
        this.text.fontSize *= newValue / oldValue;
    }

    setColor(color: string) {
        this.text.color = color;
    }

    isText = () => true;
}
