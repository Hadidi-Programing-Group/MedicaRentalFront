import {Component, EventEmitter, Output} from '@angular/core';
import {OrderByStrings} from "../../../../Dtos/OrderByStrings";

@Component({
  selector: 'app-rent-order-by',
  templateUrl: './rent-order-by.component.html',
  styles: [
  ]
})
export class RentOrderByComponent {
  orderBy: string = OrderByStrings.DateCreatedDesc
  @Output() orderByEvent = new EventEmitter()
  protected readonly OrderByStrings = OrderByStrings;

  onOrderByChange(orderBy: OrderByStrings) {
    this.orderBy = orderBy
    this.orderByEvent.emit(orderBy)
  }
}
