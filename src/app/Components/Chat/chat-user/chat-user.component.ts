import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatDto } from '../../../Dtos/Message/ChatDto';
import { SignalRService } from 'src/app/Services/SignalR/signal-r.service';
import { DateHelper } from '../../../Helpers/DateHelper';
import { ImageHelper } from '../../../Helpers/ImageHelper';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/Services/Chat/chat.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css'],
})
export class ChatUserComponent {
  @Input() chat: ChatDto = new ChatDto('', '', '', '', 0, 0, '');

  constructor(private readonly chatService: ChatService) {}

  getDate(messageDate: string) {
    let date1 = new Date();
    let date2 = DateHelper.getDate(messageDate);

    let equal =
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();

    if (equal) {
      return DateHelper.toOneDigitTimeOnly(date2);
    }
    return DateHelper.toOneDigitDateOnly(date2);
  }

  openChat(userId: string) {
    this.chatService.chatClicked.emit(userId);
  }

  protected readonly ImageHelper = ImageHelper;
}
