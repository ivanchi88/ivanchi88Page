import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';  
import { DrawingPoint } from 'src/app/Model/SpriteStacker/DrawingPoint';


@Component({
  selector: 'app-painting-canvas-component',
  templateUrl: './paintingCanvas.component.html',
  styleUrls: ['./paintingCanvas.component.scss']
})
export class PaintingCanvas implements AfterViewInit {

  @ViewChild('paintingCanvas') paintingCanvas: ElementRef;
  public context: CanvasRenderingContext2D; 

  rows : number = 25;
  cols : number = 25; 
  painting : DrawingPoint[][] = [[]];
  black : string = "#747576";
  layer: number = 0;

  width: number;
  height: number;

  sqWidth: number; 
  sqHeight: number;

  oldMouseX: number;
  oldMouseY: number;

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.paintingCanvas.nativeElement).getContext('2d'); 
    
    this.width =  this.paintingCanvas.nativeElement.width;
    this.height = this.paintingCanvas.nativeElement.height;
    this.sqWidth = this.width / this.cols;
    this.sqHeight = this.height / this.rows; 

    for(let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.painting[row].push({
          color : this.black,
          layer : this.layer,
          x: col,
          y: row
        }); 
        this.drawBorderedBox(col, row, this.sqWidth, this.sqHeight, this.black, "#D4DCE7")
      }
      this.painting.push([]);
    }
  }

  drawBorderedBox = function (col :number, row :number, width :number, height :number, bgColor: string , borderColor: string) {
    this.context.fillStyle = bgColor;
    this.context.fillRect(col * width + 1, row * height + 1, width -2 , height - 2); 

    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = borderColor;
    this.context.rect(col * width, row * height, width, height); 
    this.context.stroke();
  }
  
  moveMouse = function ($event: MouseEvent) { 

    var rect = this.paintingCanvas.nativeElement.getBoundingClientRect();

    let col = Math.floor(($event.clientX - rect.left) / this.sqWidth);
    let row = Math.floor(($event.clientY - rect.top) / this.sqHeight);

    console.log(($event.clientX - rect.left + " " + col) + " " + this.width);

    this.drawBorderedBox(this.oldMouseX, this.oldMouseY, this.sqWidth, this.sqHeight, this.black,"#D4DCE7"); 
    this.drawBorderedBox(col, row, this.sqWidth, this.sqHeight, "#F6BF49", "#D4DCE7");

    this.oldMouseX = col;
    this.oldMouseY = row; 
  }
}