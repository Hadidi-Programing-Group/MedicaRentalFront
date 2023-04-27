import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { NationalIDErrorComponent } from './Components/NationalIDError/national-iderror/national-iderror.component';
import { EmailErrorComponent } from './Components/EmailError/email-error/email-error.component';
import { MyAccountComponent } from './Components/UserComponents/my-account/my-account.component';
import { ItemDetailsRenterComponent } from './Components/item-details-renter/item-details-renter.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { Forbidden403Component } from './Components/Errors/forbidden403/forbidden403.component';
import { NotFound404Component } from './Components/Errors/not-found404/not-found404.component';
import { ChatComponent } from './Components/Chat/chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ItemDetailsRenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'nationaliderror', component: NationalIDErrorComponent },
  { path: 'emailerror', component: EmailErrorComponent },
  { path: 'user/myaccount', component: MyAccountComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'forbidden', component: Forbidden403Component },
  { path: '**', component: NotFound404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
