import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; 

@Component({
    selector: 'app-spriteStacker-page',
    templateUrl: './spriteStacker.component.html',
    styleUrls: ['./spriteStacker.component.scss']
  })
  export class SpriteStacker  {

    // changeColor = function ($event: MouseEvent){ 

    //   this.paintingContext.fillStyle = this.colors[pos];
    //   this.paintingContext.fillRect(0, 0, width, height);
    // } 

    changeColor = function ($event: string) {
      console.log($event);
    }
  }