import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './items/item/item.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { FormsModule} from '@angular/forms';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemSearchComponent } from './items/item-search/item-search.component';
import { SaveItemComponent } from './items/save-item/save-item.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerSearchComponent } from './customers/customer-search/customer-search.component';
import { SaveCustomerComponent } from './customers/save-customer/save-customer.component';

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
    CustomerSearchComponent,
    SaveCustomerComponent,
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
