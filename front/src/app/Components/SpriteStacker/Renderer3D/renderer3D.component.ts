import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';   
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Camera }from 'three';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-renderer-3D-component',
  templateUrl: './renderer3D.component.html',
  styleUrls: ['./renderer3D.component.scss']
})
export class Renderer3D implements AfterViewInit {

  @ViewChild('canvas3D') canvas3D: ElementRef;   

  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  cube: Mesh;

  renderInterval: Observable<any>;

  ngAfterViewInit(): void {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new WebGLRenderer({
      canvas: this.canvas3D.nativeElement
    });

    let geometry = new BoxGeometry(1, 1, 1);
    let material = new MeshBasicMaterial({color: 0x00ff00});
    this.cube = new Mesh(geometry, material);
    //this.cube.rotation.x = 45;
    this.scene.add(this.cube);

    this.camera.position.z = 2; 
    this.camera.position.y = 5;
    this.camera.rotation.x = -45;

    this.renderer.render( this.scene, this.camera );

    interval(20).subscribe(() => this.animate(this.cube, this.renderer));

  } 

  animate = function (cube: Mesh, renderer: WebGLRenderer) {
    
    requestAnimationFrame(()=> {console.log("bullshit")});

    cube.rotation.y += 0.01;

    renderer.render( this.scene, this.camera );
  };
}