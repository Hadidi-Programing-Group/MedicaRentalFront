import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ProductsService } from './Services/Products/products.service';
import { CategoriesFilterComponent } from './Components/categories-filter/categories-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesService } from './Services/Categories/categories.service';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AvailableComponent } from './Components/available/available.component';
import { BrandComponent } from './Components/brand/brand.component';
import { BestRentalsComponent } from './Components/best-rentals/best-rentals.component';
import { AddsComponent } from './Components/adds/adds.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { EmailErrorComponent } from './Components/EmailError/email-error/email-error.component';
import { NationalIDErrorComponent } from './Components/NationalIDError/national-iderror/national-iderror.component';
import { AuthInterceptor } from 'InterCeptors/auth.interceptor';
import { MyAccountComponent } from './Components/UserComponents/my-account/my-account.component';
import { ListedItemsComponent } from './Components/UserComponents/listed-items/listed-items.component';
import { RentedItemsComponent } from './Components/UserComponents/rented-items/rented-items.component';
import { OnRentItemsComponent } from './Components/UserComponents/on-rent-items/on-rent-items.component';
import { RentedItemsHistoryComponent } from './Components/UserComponents/rented-items-history/rented-items-history.component';
import { OnRentItemsHistoryComponent } from './Components/UserComponents/on-rent-items-history/on-rent-items-history.component';
import { UnlistedItemsComponent } from './Components/UserComponents/unlisted-items/unlisted-items.component';
import { ProfileComponent } from './Components/UserComponents/profile/profile.component';
import { MyAccountNavbarComponent } from './Components/UserComponents/my-account-navbar/my-account-navbar.component';
import { ItemDetailsRenterComponent } from './Components/item-details-renter/item-details-renter.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';


@NgModule({

  declarations: [
    AppComponent,
    ProductsComponent,
    ProductCardComponent,
    CategoriesFilterComponent,
    NavbarComponent,
    AvailableComponent,
    BrandComponent,
    BestRentalsComponent,
    AddsComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    EmailErrorComponent,
    NationalIDErrorComponent,
    RegistrationComponent,
    MyAccountComponent,
    ListedItemsComponent,
    RentedItemsComponent,
    OnRentItemsComponent,
    RentedItemsHistoryComponent,
    OnRentItemsHistoryComponent,
    UnlistedItemsComponent,
    ProfileComponent,
    MyAccountNavbarComponent,
    ItemDetailsRenterComponent,
    ReviewsComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [ProductsService, CategoriesService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
