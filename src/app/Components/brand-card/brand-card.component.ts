import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.css']
})
export class BrandCardComponent  {
  @Input() brand: any;
  @Output() itemClicked = new EventEmitter();
}
