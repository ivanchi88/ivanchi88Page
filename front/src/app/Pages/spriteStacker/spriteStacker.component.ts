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

    layer: number;

    drawings: DrawingPoint[][][];

    constructor() { 
      this.drawings = [[[]]];
      this.layer = 0;
    }

    ngAfterViewInit () {

    }

    drawed($event: DrawingPoint[][]){
      if (!this.drawings[this.layer]) {
        this.drawings.push();
      }
      console.log(this.drawings);
      this.drawings[this.layer] = $event.map(row => row.map(entry => {
        let obj = Object.assign({},  entry); 
        if (!obj.transparent) {
          obj.transparent = obj.layer != this.layer;
        }
        return obj;
      })); 
      this.drawings = [...this.drawings]; 
    } 

    changeColor($event: string) {
      this.selectedColor = $event;
    } 

    addLayer() {
      this.layer+=1;
      this.drawings.push([[]]);
    }

    goLayerDown() {
      if (this.layer > 0) {
      this.layer -= 1;
      }
    }
  }