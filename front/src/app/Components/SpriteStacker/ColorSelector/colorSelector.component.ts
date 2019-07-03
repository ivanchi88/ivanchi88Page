import { Component, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';  
@Component({
  selector: 'app-color-selector-component',
  templateUrl: './colorSelector.component.html',
  styleUrls: ['./colorSelector.component.scss']
})
export class ColorSelector implements AfterViewInit {

  @ViewChild('colorsCanvas') colorsCanvas: ElementRef;
  public colorsContext: CanvasRenderingContext2D;

  @Output() colorChanged = new EventEmitter<string>();

  rows : number = 2;
  cols : number = 5; 
  colors : string [] = ["#003399", "#009933", "#ff3300", "#660066", "#ffff00", "#ff6600", "#993300", "#99ccff", "#ffffff", "#000000"];

  sqWidth: number; 
  sqHeight: number;

  width: number;
  height: number;

  scaleX: number;
  scaleY: number;

  ngAfterViewInit(): void {
    this.colorsContext = (<HTMLCanvasElement>this.colorsCanvas.nativeElement).getContext('2d'); 
    
    this.width =  this.colorsCanvas.nativeElement.clientWidth;
    this.height =  this.colorsCanvas.nativeElement.clientHeight; 

    this.scaleX =  this.colorsCanvas.nativeElement.width / this.width;
    this.scaleY =  this.colorsCanvas.nativeElement.height / this.height;

    let squareWidth = this.width / this.cols;
    let squareHeight = this.height / this.rows;
    let row = 0;
    let col = 0;

    this.sqWidth = this.width / this.cols;
    this.sqHeight = this.height / this.rows; 

    this.colors.forEach(color => {
      this.colorsContext.fillStyle = color;
      this.colorsContext.fillRect(col, row, squareWidth * this.scaleX, squareHeight * this.scaleY); 
      this.colorsContext.fillStyle = "#000";
      this.colorsContext.rect(col, row, squareWidth * this.scaleX, squareHeight * this.scaleY); 
      this.colorsContext.stroke();

      col = col + squareWidth * this.scaleX;
      if (col >= this.width * this.scaleX) {
        row = row + squareHeight * this.scaleY;
        col = 0;
      }
    });
  } 

  changeColor = function ($event: MouseEvent){ 
    let point = this.getColAndRowFromMouseEvent($event); 
    let pos = (this.cols * point.row) + point.col;   
    this.colorChanged.emit(this.colors[pos]);
  }

  getColAndRowFromMouseEvent = function($event: MouseEvent) : any {
    var rect = this.colorsCanvas.nativeElement.getBoundingClientRect();

    let col = Math.floor(($event.clientX - rect.left ) / this.sqWidth);
    let row = Math.floor(($event.clientY - rect.top) / this.sqHeight);

    return {col, row};
  }


}