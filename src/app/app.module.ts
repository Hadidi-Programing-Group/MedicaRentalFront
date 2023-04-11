import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductsService } from './Services/Products/products.service';
import { ProductsFiltersComponent } from './Components/products-filters/products-filters.component';
import { CategoriesFilterComponent } from './Components/categories-filter/categories-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductCardComponent, ProductsFiltersComponent, CategoriesFilterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
