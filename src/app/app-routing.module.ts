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
import { ItemDetailsSellerComponent } from './Components/item-details-seller/item-details-seller/item-details-seller.component';
import { ReportsComponent } from './Components/AdminComponents/reports/reports.component';
import { ReportDetailsComponent } from './Components/AdminComponents/report-details/report-details.component';
import { PendingApprovalsComponent } from './Components/AdminComponents/pending-approvals/pending-approvals.component';
import { PendingApprovalsDetailsComponent } from './Components/AdminComponents/pending-approvals-details/pending-approvals-details.component';
import { BlockUsersComponent } from './Components/AdminComponents/block-users/block-users.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AdminPanelComponent } from './Components/AdminComponents/admin-panel/admin-panel.component';
import { ChatAreaComponent } from './Components/Chat/chat-area/chat-area.component';
import { ManageCategoriesComponent } from './Components/AdminComponents/Categories/manage-categories/manage-categories.component';
import { CartComponent } from './Components/cart/cart.component';

import { RolesManagerComponent } from './Components/AdminComponents/roles-manager/roles-manager.component';

import { RentOperationsComponent } from './Components/AdminComponents/Rent/rent-operations/rent-operations.component';

import { PastDueComponent } from './Components/AdminComponents/Rent/past-due/past-due.component';

import { ReturnTodayComponent } from './Components/AdminComponents/Rent/return-today/return-today.component';

import { AddItemComponent } from './Components/Adding-new-item/add-item/add-item.component';
import { PaymentComponent } from './Components/Checkout/payment/payment.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ListedItemsComponent } from './Components/UserComponents/listed-items/listed-items.component';
import { UnlistedItemsComponent } from './Components/UserComponents/unlisted-items/unlisted-items.component';
import { RentedItemsComponent } from './Components/UserComponents/rented-items/rented-items.component';
import { OnRentItemsComponent } from './Components/UserComponents/on-rent-items/on-rent-items.component';
import { RentedItemsHistoryComponent } from './Components/UserComponents/rented-items-history/rented-items-history.component';
import { OnRentItemsHistoryComponent } from './Components/UserComponents/on-rent-items-history/on-rent-items-history.component';
import { ProfileComponent } from './Components/UserComponents/profile/profile.component';
import { ManageBrandsComponent } from './Components/AdminComponents/Brands/brands/manage-brands.component';
import { AdsOrdersComponent } from './Components/UserComponents/ads-orders/ads-orders.component';
import { OrderDetailsComponent } from './Components/UserComponents/order-details/order-details.component';
import { AdminAuthGuardGuard } from './Guards/admin-auth-guard.guard';
import { ClientAuthGuardGuard } from './Guards/client-auth-guard.guard';
import { RegisteSuccessComponent } from './Components/registe-success/registe-success.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginAuthGuard } from './Guards/login-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'checkout',
    component: PaymentComponent,
    canActivate: [AuthGuard, ClientAuthGuardGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    children: [{ path: ':id', component: ChatAreaComponent }],
    canActivate: [AuthGuard, ClientAuthGuardGuard],
  },

  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ItemDetailsRenterComponent },
  {
    path: 'products/forseller/:id',
    component: ItemDetailsSellerComponent,
    canActivate: [AuthGuard, ClientAuthGuardGuard],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LoginAuthGuard],
  },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  {
    path: 'registersuccess',
    component: RegisteSuccessComponent,
    canActivate: [LoginAuthGuard],
  },
  {
    path: 'nationaliderror',
    component: NationalIDErrorComponent,
    canActivate: [LoginAuthGuard],
  },
  {
    path: 'emailerror',
    component: EmailErrorComponent,
    canActivate: [LoginAuthGuard],
  },
  {
    path: 'user/myaccount',
    component: MyAccountComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'listed', component: ListedItemsComponent },
      { path: 'unlisted', component: UnlistedItemsComponent },
      { path: 'rented', component: RentedItemsComponent },
      { path: 'onrent', component: OnRentItemsComponent },
      { path: 'rentedhistory', component: RentedItemsHistoryComponent },
      { path: 'onrenthistory', component: OnRentItemsHistoryComponent },
      { path: 'adsorders', component: AdsOrdersComponent },
    ],
    canActivate: [AuthGuard, ClientAuthGuardGuard],
  },
  { path: 'orderdetails/:id', component: OrderDetailsComponent },

  { path: 'reviews/:id', component: ReviewsComponent },
  { path: 'forbidden', component: Forbidden403Component },
  {
    path: 'additem',
    component: AddItemComponent,
    canActivate: [AuthGuard, ClientAuthGuardGuard],
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        component: RentOperationsComponent,
      },
      { path: 'pendingapprovals', component: PendingApprovalsComponent },
      {
        path: 'pendingapprovals/:id',
        component: PendingApprovalsDetailsComponent,
      },
      {
        path: 'rolesmanger',
        component: RolesManagerComponent,
      },
      {
        path: 'rentoperations',
        component: RentOperationsComponent,
      },
      {
        path: 'pastdue',
        component: PastDueComponent,
      },
      {
        path: 'returntoday',
        component: ReturnTodayComponent,
      },
      { path: 'blockusers', component: BlockUsersComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/:id', component: ReportDetailsComponent },
      { path: 'manageCategories', component: ManageCategoriesComponent },
      { path: 'manageBrands', component: ManageBrandsComponent },
    ],
    canActivate: [AuthGuard, AdminAuthGuardGuard],
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard, ClientAuthGuardGuard],
  },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFound404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
