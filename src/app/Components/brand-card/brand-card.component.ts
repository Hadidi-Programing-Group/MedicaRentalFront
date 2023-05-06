import { Component,AfterContentInit, Input, EventEmitter, Output } from '@angular/core';
import { CartItemDto } from 'src/app/Dtos/Cart/CartItemDto';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.css']
})
export class BrandCardComponent  {
  @Input() brand: any;
  @Output() itemClicked = new EventEmitter();
}
