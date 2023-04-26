import { Component, Input } from '@angular/core';
import {MessageDto} from "../../../Dtos/Message/MessageDto";
import {MessageNotificationDto} from "../../../Dtos/Message/MessageNotificationDto";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() messages: MessageNotificationDto[] = [];
  @Input() notificationCount: number = 0

}