import { Component } from '@angular/core';

@Component({
    selector: 'app-home-component',
    templateUrl: './homeComponent.component.html',
    styleUrls: ['./homeComponent.component.scss']
  })
  export class HomeComponent {
    text: string = "Welcome";
  }