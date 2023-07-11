import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
	selector: 'app-three',
	template: '<div style="width:100vw; height:100vh"></div>',
})
export class ThreeComponent implements AfterViewInit {
	@Input()
	geometry: string;

	renderer: THREE.Renderer;
	scene: THREE.Scene;
	camera: THREE.Camera;
	mesh: THREE.Mesh;
	animating: boolean;

	constructor(private sceneGraphElement: ElementRef) {}

	ngAfterViewInit() {
		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		this.camera.position.z = 1000;

		let geometry;
		switch (this.geometry) {
			case 'box':
				geometry = new THREE.BoxGeometry(500, 500, 500);
				break;
			case 'cylinder':
				geometry = new THREE.CylinderGeometry(200, 200, 600);
				break;
			default:
			case 'sphere':
				geometry = new THREE.SphereGeometry(400);
		}

		const material = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			wireframe: true,
		});

		this.mesh = new THREE.Mesh(geometry, material);
		this.scene.add(this.mesh);

		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.sceneGraphElement.nativeElement.childNodes[0].appendChild(
			this.renderer.domElement
		);
	}

	startAnimation() {
		const width =
			this.sceneGraphElement.nativeElement.childNodes[0].clientWidth;
		const height =
			this.sceneGraphElement.nativeElement.childNodes[0].clientHeight;

		this.renderer.setSize(width, height);
		this.animating = true;
		this.render();
	}

	stopAnimation() {
		this.animating = false;
	}

	render() {
		this.mesh.rotation.x += 0.05;
		this.mesh.rotation.y += 0.05;
		this.renderer.render(this.scene, this.camera);
		if (this.animating) {
			requestAnimationFrame(() => {
				this.render();
			});
		}
	}
}
