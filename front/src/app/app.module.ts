import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {MatButtonModule, MatInputModule, MatFormFieldModule} from '@angular/material';
import {NgbModule, NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/homeComponent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactFormComponent } from './Components/ContactForm/contactFormComponent.component';
import { HttpClientModule } from '@angular/common/http';
import { SpriteStacker } from './Pages/spriteStacker/spriteStacker.component';
import { MenuComponent } from './Components/MenuNavbar/menu.component';
import { ColorSelector } from './Components/SpriteStacker/ColorSelector/colorSelector.component';
import { PaintingCanvas } from './Components/SpriteStacker/PaintingCanvas/paintingCanvas.component';
import { Renderer3D } from './Components/SpriteStacker/Renderer3D/renderer3D.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SpriteStacker,
    PaintingCanvas,
    Renderer3D,
    ContactFormComponent,
    ColorSelector
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgbCollapseModule, 
    NgbModule,
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
