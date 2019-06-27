import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';   
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Camera, EdgesGeometry, LineBasicMaterial, LineSegments, Color, Math as ThreeMath }from 'three';
import { interval, Observable } from 'rxjs';
import { DrawingPoint } from 'src/app/Model/SpriteStacker/DrawingPoint';
import { Box3D } from 'src/app/Model/SpriteStacker/Box3D';

@Component({
  selector: 'app-renderer-3D-component',
  templateUrl: './renderer3D.component.html',
  styleUrls: ['./renderer3D.component.scss']
})
export class Renderer3D implements AfterViewInit {

  @ViewChild('canvas3D') canvas3D: ElementRef;   

  @Input('boxes') painted : Observable<DrawingPoint []>;

  private __drawings: DrawingPoint[][][];
  
  @Input('drawings')
  set drawings(drawings: DrawingPoint[][][]) {
    if (!this.scene) return;
    this.scene.remove.apply(this.scene, this.scene.children);
    this.__drawings = drawings;
    this.createObjectsInScene();
  }

  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;

  boxes: Box3D [][][];

  angle: number;

  renderInterval: Observable<any>;

  ngAfterViewInit(): void {
    this.boxes = [];
    this.angle = 0;
    this.scene = new Scene();
    this.scene.background = new Color(0x84ABAB);
    this.camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 100);
    this.renderer = new WebGLRenderer({
      canvas: this.canvas3D.nativeElement,
      precision: "highp"
    });

    this.renderer.render( this.scene, this.camera );

    let geometry = new BoxGeometry(1, 1, 1);
    let material = new MeshBasicMaterial({color: 0x00C3D0});
    let cube = new Mesh(geometry, material);
    this.scene.add(cube);

    let edges = new EdgesGeometry(geometry);
    let edgesMaterial =new  LineBasicMaterial({
      color: 0xD03C00,
      linewidth: 2
    });
    let edgesLine = new LineSegments(edges, edgesMaterial);

    this.scene.add(edgesLine);

    interval(40).subscribe(() => this.animate(this.camera, this.renderer));

  } 

    animate = function (camera: PerspectiveCamera, renderer: WebGLRenderer) {
    
      requestAnimationFrame(()=> {});

      this.angle += 3; 
      let radius = 20; 

      this.camera.position.x = radius * Math.cos(this.angle * Math.PI / 180);
      this.camera.position.z = radius * Math.sin(this.angle * Math.PI / 180);
      this.camera.position.y = 10;
      
      //this.camera.rotation.y = ThreeMath.degToRad(-this.angle + 90)
      //this.camera.rotation
      camera.lookAt(0, 0, 0)
 
      renderer.render( this.scene, this.camera );
   };

  createObjectsInScene() {
    this.__drawings.forEach((layer, layerI) => {
      let startZ = -Math.floor(layer.length/2); 
      this.boxes.push([]);
      layer.forEach((row, rowI) => {
        let startX = -Math.floor(row.length/2);
        this.boxes[layerI].push()
        row.forEach ((col, colI) => {
          this.boxes[layerI].push([]);
          if (!col.transparent) {
            let geometry = new BoxGeometry(1, 1, 1);
            let material = new MeshBasicMaterial({color: col.color});
            let cube = new Mesh(geometry, material);
            this.scene.add(cube);
        
            let edges = new EdgesGeometry(geometry);
            let edgesMaterial =new  LineBasicMaterial({
              color: 0xD03C00,
              linewidth: 10
            });
            let edgesLine = new LineSegments(edges, edgesMaterial);
            this.scene.add(edgesLine);

            cube.position.x = col.x + startX;
            cube.position.z = col.y + startZ;
            edgesLine.position.x = col.x + startX;
            edgesLine.position.z = col.y + startZ;

            let box = new Box3D ({
              color : col.color,
              layer : layerI,
              transparent: false,
              cube: cube,
              edges: edgesLine 
            });

            this.boxes[layerI][rowI].push(box); 
          }
        });
      });
    }); 
    //this.renderer.render( this.scene, this.camera );
  }
}