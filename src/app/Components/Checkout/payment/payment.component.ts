import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {StripePaymentElementComponent, StripeService} from 'ngx-stripe';
import {PaymentIntent, StripeElementsOptions,} from '@stripe/stripe-js';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  total: string = '0';
  paymentElementForm: FormGroup;

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paying = false;
  paymentDone: boolean = false;
  paymentSuccess: boolean = true;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createPaymentIntent(2500).subscribe((pi) => {
      this.elementsOptions.clientSecret = pi?.client_secret ?? '';
    });
    this.route.queryParams.subscribe((params) => {
      this.total = params['totalBill'];
    });
  }

  pay() {
    this.paying = true;
    this.stripeService
      .confirmPayment({
        elements: this.paymentElement.elements,
        // confirmParams: {
        //   payment_method_data: {
        //     billing_details: {
        //       name: this.paymentElementForm.get('name')?.value,
        //       email: this.paymentElementForm.get('email')?.value,
        //       address: {
        //         line1: this.paymentElementForm.get('address')?.value,
        //         postal_code: this.paymentElementForm.get('zipcode')?.value,
        //         city: this.paymentElementForm.get('city')?.value,
        //       }
        //     }
        //   }
        // },
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paymentDone = true;
        this.paying = false;
        if (result.error) {
          this.paymentSuccess = false;
          // Show error to your customer (e.g., insufficient funds)
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            this.paymentSuccess = true;
          }
        }
      });
  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.apiURL}/api/Transactions/create-payment-intent`,
      {
        amount,
      }
    );
  }
}
