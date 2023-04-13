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
import { CategoriesService } from './Services/Categories/categories.service';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { AvailableComponent } from './Components/available/available.component';
import { BrandComponent } from './Components/brand/brand.component';
import { BestRentalsComponent } from './Components/best-rentals/best-rentals.component';
import { AddsComponent } from './Components/adds/adds.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({


  declarations: [AppComponent, ProductsComponent, ProductCardComponent, ProductsFiltersComponent, CategoriesFilterComponent, NavbarComponent, AvailableComponent, BrandComponent, BestRentalsComponent, AddsComponent, HomeComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ProductsService, CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
