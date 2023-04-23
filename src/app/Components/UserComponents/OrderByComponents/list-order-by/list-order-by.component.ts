import {Component, EventEmitter, Output} from '@angular/core';
import {OrderByStrings} from "../../../../Dtos/OrderByStrings";

@Component({
  selector: 'app-list-order-by',
  templateUrl: './list-order-by.component.html',
  styles: [
  ]
})
export class ListOrderByComponent {
  orderBy: string = OrderByStrings.DateCreatedDesc
  @Output() orderByEvent = new EventEmitter()
  protected readonly OrderByStrings = OrderByStrings;

  onOrderByChange(orderBy: OrderByStrings) {
    this.orderBy = orderBy
    this.orderByEvent.emit(orderBy)
  }
}
