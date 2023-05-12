import {Component} from '@angular/core';
import {DateHelper} from "../../../Helpers/DateHelper";
import {ChatDataService} from "../../../Services/Chat/chat-data.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent
{
  constructor(public chatDataService: ChatDataService)
  {
  }

  getDate(_date: string)
  {
    let date = DateHelper.getDate(_date)
    let today = new Date()

    let sameDay = date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    if (sameDay)
    {
      const diffMs = Math.abs(today.getTime() - date.getTime());
      const diffMins = Math.floor((diffMs / 1000) / 60);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;

      if (hours > 0)
      {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ago`;
      }
      else
      {
        return `${minutes} mins ago`;
      }
    }

    return date.toLocaleDateString([], {hour12: true, minute: "numeric", hour: "numeric"})

  }
}
