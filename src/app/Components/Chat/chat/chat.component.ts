import {
  AfterViewChecked, AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ChatService} from "../../../Services/Chat/chat.service";
import {SignalRService} from "../../../Services/SignalR/signal-r.service";
import {ChatDto} from "../../../Dtos/Message/ChatDto";
import {MessageDto} from "../../../Dtos/Message/MessageDto";
import {MessageStatus} from "../../../Dtos/Message/MessageStatus";
import {DateHelper} from "../../../Helpers/DateHelper";
import {NotificationService} from "../../../Services/Chat/notification.service";
import {ActivatedRoute} from '@angular/router';
import {ReportsService} from "../../../Services/Reports/reports.service";
import {DeleteMessageRequestDto} from "../../../Dtos/Message/DeleteMessageRequestDto";
import {Modal} from 'bootstrap';
import {InsertReportDto} from "../../../Dtos/Reports/InsertReportDto";
import {ChatAreaComponent} from "../chat-area/chat-area.component";
import {ChatUsersService} from "../../../Services/Chat/chat-users.service";
import {ChatDataService} from "../../../Services/Chat/chat-data.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy
{
  constructor(
    public chatDataService: ChatDataService,
  )
  {
  }


  ngOnDestroy(): void
  {
    this.chatDataService.reset()
  }

  ngOnInit(): void
  {
    this.chatDataService.getUsers()
  }

  trackChats(index: number, chat: ChatDto)
  {
    return chat.userId;
  }
}
