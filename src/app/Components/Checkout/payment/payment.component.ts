import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';

import { StripeService, StripePaymentElementComponent } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentIntent
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;

  paymentElementForm: FormGroup;

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paying = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {
    this.paymentElementForm = this.fb.group({
      name: ['John doe', [Validators.required]],
      email: ['support@ngx-stripe.dev', [Validators.required]],
      address: [''],
      zipcode: [''],
      city: [''],
      amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
    });


  }

  ngOnInit() {
    this.createPaymentIntent(this.paymentElementForm.get('amount')?.value )
      .subscribe(pi => {
        console.log( "hmm",pi?.client_secret);
        this.elementsOptions.clientSecret = pi?.client_secret ?? "";
      
      });
  }

  pay() {
    if (this.paymentElementForm.valid) {
      this.paying = true;
      this.stripeService.confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.paymentElementForm.get('name')?.value ?? "",
              email: this.paymentElementForm.get('email')?.value ?? "",
              address: {
                line1: this.paymentElementForm.get('address')?.value ?? "",
                postal_code: this.paymentElementForm.get('zipcode')?.value ?? "",
                city: this.paymentElementForm.get('city')?.value ?? '',
              }
            }
          }
        },
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying = false;
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
    } else {
      console.log(this.paymentElementForm);
    }
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {

    return this.http.post<PaymentIntent>(
      `${environment.apiURL}/api/Payments/create-payment-intent`,
      { amount }
    );
  }
}
