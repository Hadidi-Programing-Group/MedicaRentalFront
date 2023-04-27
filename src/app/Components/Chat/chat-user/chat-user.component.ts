import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatDto } from "../../../Dtos/Message/ChatDto";
import { SignalRService } from 'src/app/Services/SignalR/signal-r.service';
import {DateHelper} from "../../../Dtos/DateHelper";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent implements OnInit {
  @Input() chat: ChatDto = new ChatDto("", "", "", "", 0, 0, "");
  @Output() chatClicked = new EventEmitter()
  constructor(private signalRService: SignalRService) {

  }
  ngOnInit(): void {
    // console.log(this.chat);
    this.signalRService.newMessageEvent.subscribe({

    })
  }
  isValidBase64(str: string | null): boolean
  {
    // console.log()
    if (str == null || str == '') {
      return false;
    }
    try {
      const decodedStr = atob(str);
      return decodedStr.length === str.length;
    } catch (e) {
      return false;
    }
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

  openChat(userId: string)
  {
    this.chatClicked.emit(userId)
  }

}
