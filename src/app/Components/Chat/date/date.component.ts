import {Component, Input} from '@angular/core';
import {DateHelper} from "../../../Helpers/DateHelper";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styles: []
})
export class DateComponent
{
  @Input() date: string = ''
  protected readonly DateHelper = DateHelper;
}


