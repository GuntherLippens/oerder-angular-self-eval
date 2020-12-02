import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent} from './item/item.component';
import { ItemListComponent} from './item-list/item-list.component';
import { ItemSearchComponent} from './item-search/item-search.component';
import {SaveItemComponent} from './save-item/save-item.component';



const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'detail/:id', component: ItemComponent },
  { path: 'search', component: ItemSearchComponent},
  { path: 'add', component: SaveItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
