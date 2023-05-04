import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rent-operations',
  templateUrl: './rent-operations.component.html',
  styleUrls: ['./rent-operations.component.css']
})
export class RentOperationsComponent {
  rentForm = new FormGroup({
    clientEmail: new FormControl(''),
    sellerEmail: new FormControl(''),
    selectedItem: new FormControl(''),
    returnDate: new FormControl('')
  });

  sellerItems: string[] | undefined;

  getSellerItems() {
    // Logic to get all the items that this seller sells
    // and populate the sellerItems array
  }

  submit() {
    // Logic to decrease the available stock of the selected item
    // because it's currently rented
  }

}
