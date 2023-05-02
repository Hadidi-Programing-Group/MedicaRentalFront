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
import {DateHelper} from "../../../Dtos/DateHelper";
import {NotificationService} from "../../../Services/Chat/notification.service";
import {ActivatedRoute} from '@angular/router';
import {ReportsService} from "../../../Services/Reports/reports.service";
import {DeleteMessageRequestDto} from "../../../Dtos/Message/DeleteMessageRequestDto";
import {Modal} from 'bootstrap';
import {InsertReportDto} from "../../../Dtos/Reports/InsertReportDto";
import {ChatAreaComponent} from "../chat-area/chat-area.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy
{
  public users: ChatDto[] = [];
  public currentUser: string = "";


  constructor(
    private chatService: ChatService,
    private signalRService: SignalRService,
    private notificationService: NotificationService
  )
  {
  }


  ngOnDestroy(): void
  {
    this.currentUser = ''
    this.notificationService.outChat.emit()
  }

  ngOnInit(): void
  {
    this.chatService.chatOpened.subscribe({
      next: (userId:string) => {
        this.currentUser = userId
        console.log(this.currentUser)
      }
    })
    this.chatService.newMessage.subscribe({
      next: (message: MessageDto)=>{
        let user = this.users.find(u => u.userId == message.senderId)
        if (user)
        {
          user.lastMessage = message.message;
          user.messageDate = message.messageDate;
          user.messageStatus = message.messageStatus;
          user.unseenMessagesCount += 1;
          this.sortUsers()
        }
      }
    })
    this.checkConnection()
    this.getUserChats()
    this.sortUsers()
  }

  checkConnection()
  {
    if (!this.signalRService.isConnected)
    {
      this.signalRService.startConnection();
    }
  }

  trackChats(index: number, chat: ChatDto)
  {
    return chat.userId;
  }

  getUserChats()
  {
    this.chatService.GetUserChats(20)
      .subscribe({
        next: (data: ChatDto[]) => this.users = data,
        error: (err) => console.error(err)
      })
  }

  chatChangedEvent(userId: string)
  {
    this.currentUser = userId;
    let c = this.users.find(u => u.userId == userId)?.unseenMessagesCount

    if (c && c > 0)
    {
      this.notificationService.chatClicked.emit({id: userId, count: c})

      let user = this.users.find(u => u.userId == this.currentUser);

      if (user)
      {
        user.unseenMessagesCount = 0;
      }
    }
  }

  sortUsers()
  {
    this.users.sort((a, b) => new Date(b.messageDate).getTime() - new Date(a.messageDate).getTime());
  }

}
