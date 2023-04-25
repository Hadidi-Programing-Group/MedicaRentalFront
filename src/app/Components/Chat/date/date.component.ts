import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styles: [
  ]
})
export class DateComponent {
  @Input() date: Date = new Date()
}
