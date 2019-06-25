import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; 

@Component({
    selector: 'app-spriteStacker-page',
    templateUrl: './spriteStacker.component.html',
    styleUrls: ['./spriteStacker.component.scss']
  })
  export class SpriteStacker  {

    selectedColor: string;

    constructor() {
      this.selectedColor = "#F4D28A";
    }

    changeColor = function ($event: string) {
      this.selectedColor = $event;
    }
  }