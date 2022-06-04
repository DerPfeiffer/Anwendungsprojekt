import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProducerComponent} from './producer/producer.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSliderModule} from "@angular/material/slider";
import {ProductComponent} from './product/product.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {CreateProducerComponent} from './producer/dialog/create-producer/create-producer.component';
import {DeleteProducerComponent} from './producer/dialog/delete-producer/delete-producer.component';
import {DeleteProductComponent} from './product/dialog/delete-product/delete-product.component';
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {UpdateProducerComponent} from './producer/dialog/update-producer/update-producer.component';
import {CreateProductComponent} from './product/dialog/create-product/create-product.component';
import {UpdateProductComponent} from "./product/dialog/update-product/update-product.component";
import { StockComponent } from './stock/stock.component';

export const HTTP_BASE_URL = "http://localhost:8080/"

@NgModule({
  declarations: [
    AppComponent,
    ProducerComponent,
    ProductComponent,
    CreateProducerComponent,
    DeleteProducerComponent,
    DeleteProductComponent,
    UpdateProducerComponent,
    CreateProductComponent,
    UpdateProductComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
