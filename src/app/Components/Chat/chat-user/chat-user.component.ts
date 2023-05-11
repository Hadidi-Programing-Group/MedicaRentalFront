import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatDto} from "../../../Dtos/Message/ChatDto";
import {SignalRService} from 'src/app/Services/SignalR/signal-r.service';
import {DateHelper} from "../../../Helpers/DateHelper";
import {ImageHelper} from "../../../Helpers/ImageHelper";
import {ChatDataService} from "../../../Services/Chat/chat-data.service";
import {ChatService} from "../../../Services/Chat/chat.service";
import {MessageDto} from "../../../Dtos/Message/MessageDto";
import {ChatUsersService} from "../../../Services/Chat/chat-users.service";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent
{
  @Input() chat: ChatDto
  protected readonly ImageHelper = ImageHelper;

  constructor(public chatDataService: ChatDataService)
  {
  }


  getDate(messageDate: string)
  {
    let date1 = new Date()
    let date2 = DateHelper.getDate(messageDate)


    let equal = (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate());

    if (equal)
    {
      return DateHelper.toOneDigitTimeOnly(date2)
    }
    return DateHelper.toOneDigitDateOnly(date2)

  }
}
