import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer, type Renderer, Camera, AxesHelper, LinearFilter, TextureLoader } from "three";
import { UserImage } from "./image";
import type { Asset } from "./types";
import { UserText } from "./text";
import { IMAGES } from "$lib/images/images";

export class View {
    assets: Asset[];
    scene: Scene;
    renderer: Renderer;
    camera: PerspectiveCamera;

    static create(parentElement: HTMLElement, width = window.innerWidth / 2, height = window.innerHeight / 2) {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        renderer.setSize(width, height);
        parentElement.appendChild(renderer.domElement);

        // const light = new AmbientLight(0xffffff, 0.5);
        // scene.add(light);

        // const dragControls = new DragControls([], camera, renderer.domElement);

        const view = new View(scene, renderer, camera);

        view.setBackground(IMAGES[0]);

        return view;
    }

    constructor(scene: Scene, renderer: Renderer, camera: PerspectiveCamera) {
        this.assets = [];
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    addText() {
        return UserText.create(this.scene, () => this.render())
            .then(i => this.assets.push(i))
            .then(() => this.render());
    }

    addImage(file: Blob | MediaSource) {
        return UserImage.create(file, this.scene, () => this.render())
            .then(i => this.assets.push(i))
            .then(() => this.render())
    }

    setBackground(url: string) {
        var bgTexture = new TextureLoader().load(url, (texture) => {
            const img = texture.image;
            const bgWidth = img.width;
            const bgHeight = img.height;

            var aspect = bgWidth / bgHeight;

            this.renderer.setSize(bgWidth, bgHeight);
            this.camera.aspect = aspect;
            this.camera.updateProjectionMatrix();
            this.render();
        });
        bgTexture.minFilter = LinearFilter;
        this.scene.background = bgTexture;
    }

    downloadImage() {
        const imgData = this.renderer.domElement.toDataURL();

        var link = document.createElement('a');

        link.setAttribute('href', imgData);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', 'vision-meme');

        link.click();
    }
}