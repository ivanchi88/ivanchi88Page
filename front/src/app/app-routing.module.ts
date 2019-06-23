import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/homeComponent.component';
import { SpriteStacker } from './Pages/spriteStacker/spriteStacker.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'spriteStacker', component: SpriteStacker}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
