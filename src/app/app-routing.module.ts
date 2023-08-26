import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeckComponent } from './components/create-deck/create-deck.component';
import { DrawCardComponent } from './components/draw-card/draw-card.component';

const routes: Routes = [
  {path: "home", component: CreateDeckComponent},
  {path: "draw/:deckId", component: DrawCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
