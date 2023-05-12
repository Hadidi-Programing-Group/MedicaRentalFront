import {Component, OnInit} from '@angular/core';
import {CartItemDto} from 'src/app/Dtos/Cart/CartItemDto';
import {CartService} from 'src/app/Services/Cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private readonly cartService: CartService) {}

  cartList: CartItemDto[] | undefined;
  itemsCount = 0;
  numberOfDays = 0;
  pricePerDay = 0;
  totalBill = 0.0;

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data: CartItemDto[]) => {
        this.cartList = data;
        if (this.cartList && this.cartList.length > 0) {
          this.itemsCount = this.cartList.length;
          this.cartList.forEach((cartItem) => {
            this.numberOfDays += cartItem.numberOfDays;
          });
          this.pricePerDay = this.cartList[0].pricePerDay;
          this.totalBill += this.pricePerDay * this.numberOfDays;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteItemHandler(itemId: string) {
    this.cartService.removeFromCart(itemId).subscribe({
      next: () => {
        if (this.cartList && this.cartList.length > 0) {
          this.cartList.forEach((item, index) => {
            if (item.itemId === itemId) this.cartList?.splice(index, 1);
          });
          this.numberOfDays = 0;
          this.totalBill = 0;
          this.itemsCount = this.cartList.length;
          this.cartList.forEach((cartItem) => {
            this.numberOfDays += cartItem.numberOfDays;
          });
          this.pricePerDay = this.cartList[0].pricePerDay;
          this.totalBill += this.pricePerDay * this.numberOfDays;
        } else {
          this.numberOfDays = 0;
          this.totalBill = 0;
          this.itemsCount = 0;
          this.numberOfDays = 0;
          this.pricePerDay = 0;
        }

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
