import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; 
import { DrawingPoint } from 'src/app/Model/SpriteStacker/DrawingPoint';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-spriteStacker-page',
    templateUrl: './spriteStacker.component.html',
    styleUrls: ['./spriteStacker.component.scss']
  })
  export class SpriteStacker implements AfterViewInit{

    selectedColor: string;

    boxes: Observable<DrawingPoint[][][]>;
    layer: number;

    drawings: DrawingPoint[][][];

    constructor() { 
      this.drawings = [];
      this.layer = 0;
    }

    ngAfterViewInit () {

    }

    drawed($event: DrawingPoint[][]){
      if (!this.drawings[this.layer]) {
        this.drawings.push();
      }
      this.drawings[this.layer] = $event; 
      this.drawings = [...this.drawings]; 
    } 

    changeColor($event: string) {
        this.selectedColor = $event;
    } 
  }