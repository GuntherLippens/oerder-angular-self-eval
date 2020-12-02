import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { FormsModule} from '@angular/forms';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemSearchComponent } from './item-search/item-search.component';
import { SaveItemComponent } from './save-item/save-item.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemSearchComponent,
    SaveItemComponent,
    CustomerComponent,
    CustomerListComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
