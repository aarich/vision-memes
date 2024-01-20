import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer, type Renderer, Camera, AxesHelper } from "three";
import { UserImage } from "./image";
import { DragControls } from 'three/addons/controls/DragControls.js';
import type { Asset } from "./types";

export class View {
    assets: Asset[];
    scene: Scene;
    renderer: Renderer;
    camera: Camera;

    static create(parentElement: HTMLElement, width = window.innerWidth / 2, height = window.innerHeight / 2) {
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        parentElement.appendChild(renderer.domElement);

        const light = new AmbientLight(0xffffff, 0.5);
        scene.add(light);

        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);


        // camera.position.set(0, 0, 0);
        // camera.lookAt(1, 1, 1)

        renderer.render(scene, camera)


        // const dragControls = new DragControls([], camera, renderer.domElement);

        return new View(scene, renderer, camera);
    }

    constructor(scene: Scene, renderer: Renderer, camera: Camera) {
        this.assets = [];
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera
    }

    addImage(file: Blob | MediaSource) {
        const render = () => {
            this.renderer.render(this.scene, this.camera);

        }
        return UserImage.create(file, this.scene, render)
            .then(i => this.assets.push(i))
            .then(render)
    }
}