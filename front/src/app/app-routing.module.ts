import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { GameComponent} from './game/game.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'game/:id', component: GameComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
