import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MessageNotificationDto} from "../../../Dtos/Message/MessageNotificationDto";
import {MessageDto} from "../../../Dtos/Message/MessageDto";
import {SignalRService} from "../../../Services/SignalR/signal-r.service";
import {ChatService} from "../../../Services/Chat/chat.service";
import {DateHelper} from "../../../Helpers/DateHelper";
import {NotificationService} from "../../../Services/Chat/notification.service";
import {count} from "rxjs";
import {ChatDataService} from "../../../Services/Chat/chat-data.service";
import {ChatUsersService} from "../../../Services/Chat/chat-users.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit
{
  constructor(public chatDataService: ChatDataService)
  {
  }

  ngOnInit(): void
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
