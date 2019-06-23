import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; 

@Component({
    selector: 'app-spriteStacker-page',
    templateUrl: './spriteStacker.component.html',
    styleUrls: ['./spriteStacker.component.scss']
  })
  export class SpriteStacker implements AfterViewInit  {
    @ViewChild('colorsCanvas') colorsCanvas: ElementRef;
    public colorsContext: CanvasRenderingContext2D;

    @ViewChild('paintingsCanvas') paintingCanvas: ElementRef;
    public paintingContext: CanvasRenderingContext2D;

    colors : string [] = ["#003399", "#009933", "#ff3300", "#660066", "#ffff00", "#ff6600", "#993300", "#99ccff", "#ffffff", "#000000"];

    ngAfterViewInit(): void {
      this.colorsContext = (<HTMLCanvasElement>this.colorsCanvas.nativeElement).getContext('2d');
      this.paintingContext = (<HTMLCanvasElement>this.paintingCanvas.nativeElement).getContext('2d');
      
      let width =  this.colorsCanvas.nativeElement.width;
      let height = this.colorsCanvas.nativeElement.height;
      let squareWidth = width / 5;
      let squareHeight = height / 2;
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
      let squareWidth = width / 5;
      let squareHeight = height / 2;

      let col = Math.floor(x / squareWidth);
      let row = Math.floor(y / squareHeight);

      let pos = (5 * row) +col;  

      width =  this.paintingCanvas.nativeElement.width;
      height = this.paintingCanvas.nativeElement.height;

      this.paintingContext.fillStyle = this.colors[pos];
      this.paintingContext.fillRect(0, 0, width, height);

    }



  }