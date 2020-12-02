import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from './items/item/item.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemSearchComponent } from './items/item-search/item-search.component';
import { SaveItemComponent } from './items/save-item/save-item.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerSearchComponent } from './customers/customer-search/customer-search.component';
import { SaveCustomerComponent } from './customers/save-customer/save-customer.component';
import {CustomerComponent} from './customers/customer/customer.component';



const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  { path: 'detail/:id', component: ItemComponent },
  { path: 'search', component: ItemSearchComponent},
  { path: 'add', component: SaveItemComponent},
  { path: 'customer-detail/:id', component: CustomerComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'search-update-customer', component: CustomerSearchComponent },
  { path: 'add-customer', component: SaveCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
