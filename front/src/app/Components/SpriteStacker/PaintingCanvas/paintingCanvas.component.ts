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
  @Output() drawed = new EventEmitter<DrawingPoint[][]>();

  isPainting : boolean;
  
  rows : number = 50;
  cols : number = 50; 
  painting : DrawingPoint[][] = [[]];
  black : string = "#747576";
  layer: number = 0;

  width: number;
  height: number;

  scaleX: number;
  scaleY: number;

  sqWidth: number; 
  sqHeight: number;

  oldMouseX: number;
  oldMouseY: number;
  oldColor: string;

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.paintingCanvas.nativeElement).getContext('2d'); 
    this.isPainting = false;
    
    this.width =  this.paintingCanvas.nativeElement.clientWidth;
    this.height = this.paintingCanvas.nativeElement.clientHeight;

    this.scaleX =  this.paintingCanvas.nativeElement.width / this.width;
    this.scaleY =  this.paintingCanvas.nativeElement.height / this.height;

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
    this.context.fillRect(col * (width * this.scaleX) + 1, row * (height * this.scaleY) + 1, width * this.scaleX -2 , height * this.scaleY - 2); 

    this.context.beginPath();
    this.context.lineWidth = 1;
    this.context.strokeStyle = borderColor;
    this.context.rect(col * width * this.scaleX, row * height * this.scaleY, width * this.scaleX, height * this.scaleY); 
    this.context.stroke();
  }

  getColAndRowFromMouseEvent = function($event: MouseEvent) : any {
    var rect = this.paintingCanvas.nativeElement.getBoundingClientRect();
    
    console.log($event.clientY - rect.top + " " + this.sqHeight);
    let col = Math.floor(($event.clientX - rect.left ) / this.sqWidth);
    let row = Math.floor(($event.clientY - rect.top) / this.sqHeight);

    return {col, row};
  }
  
  moveMouse = function ($event: MouseEvent) {  
    let point = this.getColAndRowFromMouseEvent($event);

    if (!this.isOnBounds(point)) return;

    if (!this.isPainting) {
      this.hoverMouseOnCanvas(point);
    } else {
      this.paint(point);
    }
  }

  stopPainting ($event: MouseEvent): void {
    this.isPainting = false;
    this.drawed.emit(this.painting);
  }

  startPainting ($event: MouseEvent): void {
    this.isPainting =  true;
    this.moveMouse($event);
  }

  isOnBounds = function(point: any) {
    return (point.col >= 0 && point.col < this.cols) && (point.row >= 0 && point.row < this.rows); 
  }

  paint = function (point: any) {
    if (!this.selectedColor) return; 
    if (this.painting[point.row][point.col].color == this.selectedColor && !this.painting[point.row][point.col].transparent) {
      return;
    }
    this.painting[point.row][point.col] = new DrawingPoint({
      color :this.selectedColor,
      layer : 0,
      transparent: false,
      x: point.col,
      y: point.row 
    }); 
    this.hasChangedDrawing = true;
    this.drawBorderedBox(point.col, point.row, this.sqWidth, this.sqHeight, this.selectedColor , "#D4DCE7"); 
  }

  hoverMouseOnCanvas (point: any) {
    let oldColor = this.painting[this.oldMouseY][ this.oldMouseX].transparent ? this.black :  this.painting[this.oldMouseY][this.oldMouseX].color;
    this.drawBorderedBox(this.oldMouseX, this.oldMouseY, this.sqWidth, this.sqHeight, oldColor,"#D4DCE7"); 
    this.drawBorderedBox(point.col, point.row, this.sqWidth, this.sqHeight, "#F6BF49", "#D4DCE7");
    this.oldMouseX = point.col;
    this.oldMouseY = point.row; 
  }
}