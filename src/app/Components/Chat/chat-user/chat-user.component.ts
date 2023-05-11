import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatDto} from "../../../Dtos/Message/ChatDto";
import {DateHelper} from "../../../Helpers/DateHelper";
import {ImageHelper} from "../../../Helpers/ImageHelper";
import {ChatDataService} from "../../../Services/Chat/chat-data.service";
import {async, Observable} from "rxjs";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent
{
  protected readonly ImageHelper = ImageHelper;

  constructor(private cdr: ChangeDetectorRef, public chatDataService: ChatDataService)
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


  trackChats(index: number, chat: ChatDto)
  {
    return chat.userId;
  }
}
