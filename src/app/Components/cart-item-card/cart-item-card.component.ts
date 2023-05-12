import {AfterContentInit, Component, EventEmitter, Input, Output,} from '@angular/core';
import {CartItemDto} from 'src/app/Dtos/Cart/CartItemDto';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css'],
})
export class CartItemCardComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    if (this.cartItem)
      this.endDate.setDate(
        this.startDate.getDate() + this.cartItem?.numberOfDays
      );
  }

  @Input() cartItem?: CartItemDto;
  @Output() itemDeleted = new EventEmitter<string>();
  startDate: Date = new Date();
  endDate: Date = new Date();

  RemoveFromCart(itemId: string) {
    this.itemDeleted.emit(itemId);
  }
}
