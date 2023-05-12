import {Injectable} from '@angular/core';
import {
  loadStripe,
  PaymentIntent,
  PaymentIntentResult,
  Stripe,
  StripeElement,
  StripeElements,
  StripeLinkAuthenticationElement
} from "@stripe/stripe-js";
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class StripeService {
  public stripe: Stripe | null;
  amount: number = 0;
  intent?: PaymentIntent;
  clientSecret: string = '';
  public elements?: StripeElements;
  linkAuthEle?: StripeLinkAuthenticationElement;
  constructor(
    private http: HttpClient
  ) {
    loadStripe(environment.stripeApiKey).then((res) => {
      this.stripe = res
    });
  }

  async initialize(amount: number) {
    const response = await fetch(`${environment.apiURL}/api/Payments/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json"  , 'Authorization': `Bearer ${localStorage.getItem("authToken")}`},
      body: JSON.stringify({ amount }),
    });
    const { client_secret } = await response.json();

    this.elements = this.stripe?.elements({
      clientSecret: client_secret,
      appearance: {
        theme: 'stripe',
      }
    });
    const linkAuthenticationElement = this.elements?.create("linkAuthentication");
    linkAuthenticationElement?.mount("#link-authentication-element");

    const paymentElement = this.elements?.create("payment", {
      layout: "tabs",
    });
    paymentElement?.mount("#payment-element");
  }
  // Fetches the payment intent status after payment submission
  async checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    const res = await this.stripe?.retrievePaymentIntent(clientSecret);
    const paymentIntent = res?.paymentIntent;
    switch (paymentIntent?.status) {
      case "succeeded":
        this.showMessage("Payment succeeded!");
        break;
      case "processing":
        this.showMessage("Your payment is processing.");
        break;
      case "requires_payment_method":
        this.showMessage("Your payment was not successful, please try again.");
        break;
      default:
        this.showMessage("Something went wrong.");
        break;
    }
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
  initPaymentIntent(amount: number) {
    this.createPaymentIntent(amount).subscribe(intent => {
      this.intent = intent
    })
  }
  getPaymentIntent(amount?: number): PaymentIntent | undefined {
    if (this.intent == undefined || amount != undefined) {
      this.initPaymentIntent(amount ?? 0);
    }
    return this.intent;
  }
  getPaymentElement(amount?: number): StripeElement | undefined {
    if (this.elements == undefined || amount != undefined) {
      this.getElements(amount ?? 0);
    }
    this.linkAuthEle = this.elements?.create('linkAuthentication');
    return this.elements?.create('payment', {
      layout: "tabs",
    });
  }
  getLinkAuthenticationElement(): StripeLinkAuthenticationElement | undefined {
    if (this.elements == null) {
      console.error("Elements Undefined Make sure to init Payment Intent");
      return undefined;
    }
    return this.elements.create("linkAuthentication");
  }
  getElements(amount: number): StripeElements | undefined {
    this.createPaymentIntent(amount).subscribe(intent => {
      this.elements = this.stripe?.elements({
        clientSecret: intent.client_secret ?? "",
        appearance: {
          theme: 'stripe',
        }
      })
    });

    return this.elements;
  }
  async confirmPayment(emailAddress: string): Promise<PaymentIntentResult | undefined> {
    if (this.elements == undefined) {
      return undefined;
    }
    const elements = this.elements;
    return this.stripe?.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:4200/checkout",
        receipt_email: emailAddress,
      },
    });

  }

  private createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `${environment.apiURL}/api/Payments/create-payment-intent`,
      {
        amount
      },{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        }
      }
    );
  }
}


// initialize();
// checkStatus();

// document
//   .querySelector("#payment-form")
//   .addEventListener("submit", handleSubmit);

// let emailAddress = '';
// // Fetches a payment intent and captures the client secret
// async  initialize() {
//   const response = await fetch("/create-payment-intent", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ items }),
//   });
//   const { clientSecret } = await response.json();

//   const appearance = {
//     theme: 'stripe',
//   };
//   elements = stripe.elements({ appearance, clientSecret });

//   const linkAuthenticationElement = elements.create("linkAuthentication");
//   linkAuthenticationElement.mount("#link-authentication-element");

//   linkAuthenticationElement.on('change', (event) => {
//     emailAddress = event.value.email;
//   });

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   const paymentElement = elements.create("payment", paymentElementOptions);
//   paymentElement.mount("#payment-element");
// }

// async function handleSubmit(e) {
//   e.preventDefault();
//   setLoading(true);

//   const { error } = await stripe.confirmPayment({
//     elements,
//     confirmParams: {
//       // Make sure to change this to your payment completion page
//       return_url: "http://localhost:4242/checkout.html",
//       receipt_email: emailAddress,
//     },
//   });

//   // This point will only be reached if there is an immediate error when
//   // confirming the payment. Otherwise, your customer will be redirected to
//   // your `return_url`. For some payment methods like iDEAL, your customer will
//   // be redirected to an intermediate site first to authorize the payment, then
//   // redirected to the `return_url`.
//   if (error.type === "card_error" || error.type === "validation_error") {
//     showMessage(error.message);
//   } else {
//     showMessage("An unexpected error occurred.");
//   }

//   setLoading(false);
// }



// // ------- UI helpers -------

// function showMessage(messageText) {
//   const messageContainer = document.querySelector("#payment-message");

//   messageContainer.classList.remove("hidden");
//   messageContainer.textContent = messageText;

//   setTimeout(function () {
//     messageContainer.classList.add("hidden");
//     messageText.textContent = "";
//   }, 4000);
// }

// // Show a spinner on payment submission
// function setLoading(isLoading) {
//   if (isLoading) {
//     // Disable the button and show a spinner
//     document.querySelector("#submit").disabled = true;
//     document.querySelector("#spinner").classList.remove("hidden");
//     document.querySelector("#button-text").classList.add("hidden");
//   } else {
//     document.querySelector("#submit").disabled = false;
//     document.querySelector("#spinner").classList.add("hidden");
//     document.querySelector("#button-text").classList.remove("hidden");
//   }
// }
