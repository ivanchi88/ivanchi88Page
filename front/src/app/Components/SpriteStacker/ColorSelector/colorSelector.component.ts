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

  ngAfterViewInit(): void {
    this.colorsContext = (<HTMLCanvasElement>this.colorsCanvas.nativeElement).getContext('2d'); 
    
    let width =  this.colorsCanvas.nativeElement.width;
    let height = this.colorsCanvas.nativeElement.height;
    let squareWidth = width / this.cols;
    let squareHeight = height / this.rows;
    let row = 0;
    let col = 0;

    this.colors.forEach(color => {
      this.colorsContext.fillStyle = color;
      this.colorsContext.fillRect(col, row, squareWidth, squareHeight); 
      this.colorsContext.fillStyle = "#000";
      this.colorsContext.rect(col, row, squareWidth, squareHeight); 
      this.colorsContext.stroke();

      col = col + squareWidth;
      if (col >= width) {
        row = row + squareHeight;
        col = 0;
      }
    });
  } 

  changeColor = function ($event: MouseEvent){ 
    let x = $event.offsetX;
    let y = $event.offsetY;

    let width =  this.colorsCanvas.nativeElement.width;
    let height = this.colorsCanvas.nativeElement.height;
    let squareWidth = width / this.cols;
    let squareHeight = height / this.rows;

    let col = Math.floor(x / squareWidth);
    let row = Math.floor(y / squareHeight);

    let pos = (this.cols * row) +col;  
    
    this.colorChanged.emit(this.colors[pos]);
  }


}