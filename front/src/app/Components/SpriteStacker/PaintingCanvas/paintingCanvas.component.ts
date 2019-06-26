import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';  
import { DrawingPoint } from 'src/app/Model/SpriteStacker/DrawingPoint';


@Component({
  selector: 'app-painting-canvas-component',
  templateUrl: './paintingCanvas.component.html',
  styleUrls: ['./paintingCanvas.component.scss']
})
export class PaintingCanvas implements AfterViewInit {

  @ViewChild('paintingCanvas') paintingCanvas: ElementRef;
  public context: CanvasRenderingContext2D; 

  @Input('color') selectedColor: string;

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
  oldColor: string;

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.paintingCanvas.nativeElement).getContext('2d'); 
    
    this.width =  this.paintingCanvas.nativeElement.width;
    this.height = this.paintingCanvas.nativeElement.height;
    this.sqWidth = this.width / this.cols;
    this.sqHeight = this.height / this.rows; 

    this.oldMouseX = 0;
    this.oldMouseY = 0;

    for(let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.painting[row].push({
          color : this.black,
          layer : this.layer,
          x: col,
          y: row,
          transparent: true
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

  getColAndRowFromMouseEvent = function($event: MouseEvent) : any {
    var rect = this.paintingCanvas.nativeElement.getBoundingClientRect();

    let col = Math.floor(($event.clientX - rect.left) / this.sqWidth);
    let row = Math.floor(($event.clientY - rect.top) / this.sqHeight);

    return {col, row};
  }
  
  moveMouse = function ($event: MouseEvent) {  
    let point = this.getColAndRowFromMouseEvent($event);
    
    let oldColor = this.painting[this.oldMouseY][ this.oldMouseX].transparent ? this.black :  this.painting[this.oldMouseY][this.oldMouseX].color;
    this.drawBorderedBox(this.oldMouseX, this.oldMouseY, this.sqWidth, this.sqHeight, oldColor,"#D4DCE7"); 

    if (!this.isOnBounds(point)) return;

    this.drawBorderedBox(point.col, point.row, this.sqWidth, this.sqHeight, "#F6BF49", "#D4DCE7");
    this.oldMouseX = point.col;
    this.oldMouseY = point.row; 
  }

  isOnBounds = function(point: any) {
    return (point.col >= 0 && point.col < this.cols) && (point.row >= 0 && point.row < this.rows); 
  }

  paint = function ($event: MouseEvent) {
    let point = this.getColAndRowFromMouseEvent($event);
    this.painting[point.row][point.col].color = this.selectedColor; 
    this.painting[point.row][point.col].transparent = false;
    this.drawBorderedBox(point.col, point.row, this.sqWidth, this.sqHeight, this.selectedColor , "#D4DCE7");
  }
}