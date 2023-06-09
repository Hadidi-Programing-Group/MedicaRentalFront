import {HttpClient} from '@angular/common/http';
import {AfterContentInit, Component, OnInit} from '@angular/core';
import {PaymentIntent, StripeElements} from '@stripe/stripe-js';
import {StripeService} from '../Services/Stripe/stripe.service';

@Component({
  selector: 'app-js-payment',
  templateUrl: './js-payment.component.html',
  styleUrls: ['./js-payment.component.css']
})

export class JsPaymentComponent implements OnInit, AfterContentInit {
  intent?: PaymentIntent;
  elements?: StripeElements;
  constructor(private http: HttpClient,
    private stripeService: StripeService
  ) {
  }
  ngOnInit(): void {
    this.stripeService.initialize(10000);
    this.stripeService.checkStatus();


  }
  ngAfterContentInit(): void {
  }

  async handleSubmit(e: any) {
    e.preventDefault();
    this.setLoading(true);

    if (this.stripeService.elements) {
      const elements = this.stripeService.elements
      const res = await this.stripeService.stripe?.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:4200/checkout",
          receipt_email: "lol@ex.co",
        },
      });
      if (res?.error.type === "card_error" || res?.error.type === "validation_error") {
        this.showMessage(res?.error.message ?? "");
      } else {
        this.showMessage("An unexpected error occurred.");
      }
    }
    this.setLoading(false);

  }
  showMessage(messageText: string) {
    const messageContainer = document.querySelector("#payment-message");
    if (messageContainer) {
      messageContainer.classList.remove("hidden");
      messageContainer.textContent = messageText;
      setTimeout(function () {
        messageContainer.classList.add("hidden");
        messageContainer.textContent = "";
      }, 4000);
    }
  }
  // Show a spinner on payment submission
  setLoading(isLoading: boolean) {

    if (isLoading) {
      // Disable the button and show a spinner
      document.getElementById("#submit")?.setAttribute('disabled', '');
      document.getElementById("#spinner")?.classList.remove("hidden");
      document.getElementById("#button-text")?.classList.add("hidden");
    } else {
      document.getElementById("#submit")?.removeAttribute('disabled');
      document.querySelector("#spinner")?.classList.add("hidden");
      document.querySelector("#button-text")?.classList.remove("hidden");
    }
  }
}
