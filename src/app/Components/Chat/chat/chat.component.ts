import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ChatService } from "../../../Services/Chat/chat.service";
import { SignalRService } from "../../../Services/SignalR/signal-r.service";
import { ChatDto } from "../../../Dtos/Message/ChatDto";
import { MessageDto } from "../../../Dtos/Message/MessageDto";
import { MessageStatus } from "../../../Dtos/Message/MessageStatus";
import { DateHelper } from "../../../Dtos/DateHelper";
import { NotificationComponent } from "../notification/notification.component";
import { NotificationService } from "../../../Services/Chat/notification.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  public users: ChatDto[] = [];
  public messages: MessageDto[] = [];
  public currentUser: string = "";
  @ViewChild('messagesDiv') messagesDiv: ElementRef | undefined;

  constructor(
    private chatService: ChatService,
    private signalRService: SignalRService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
    private activeRoute: ActivatedRoute,
  ) {
  }

  ngOnDestroy(): void {
    this.notificationService.outChat.emit()
  }

  public trackChats(index: number, chat: ChatDto) {
    return chat.userId;
  }


  ngAfterViewChecked(): void {
    if (this.messagesDiv) {
      this.messagesDiv.nativeElement.scrollTo({
        top: Number(this.messagesDiv.nativeElement.scrollHeight),
        left: 0,
        behavior: "smooth",
      });
    }
  }

  ngOnInit(): void {
    setInterval(() => this.changeDetector.detectChanges(), 3000)
    this.checkConnection()
    this.getUserChats()
    this.sortUsers()
    this.openChatByUrl();


    this.signalRService.newMessageEvent.subscribe({
      next: (message: MessageDto) => {
        if (message.senderId == this.currentUser) {
          message.messageStatus = MessageStatus.Seen;
          this.messages.push(message);
          this.signalRService.setMessageSeen(message.id, message.senderId)
        }

        else {
          let user = this.users.find(u => u.userId == message.senderId)
          if (user) {
            user.lastMessage = message.message;
            user.messageDate = message.messageDate;
            user.messageStatus = message.messageStatus;
            user.unseenMessagesCount += 1;
            this.sortUsers()
          }
        }

        this.changeDetector.detectChanges()
      },
      error: (err: any) => console.error(err)
    })

    this.signalRService.messageSeenEvent.subscribe({
      next: (messageId: string) => {
        let msg = this.messages.find(m => m.id == messageId)
        if (msg) {
          msg.messageStatus = MessageStatus.Seen
          this.messages = [...this.messages]
        }
        else {
          console.error('No message with the received id')
        }
      },
      error: (err: any) => console.error(err)
    })

    this.signalRService.allMessagesSeenEvent.subscribe({
      next: (userId: string) => {
        if (userId == this.currentUser) {
          for (let message of this.messages) {
            message.messageStatus = MessageStatus.Seen
          }
          //this.messages = [...this.messages]
        }
      }
    })
  }

  checkConnection() {
    if (!this.signalRService.isConnected) {
      this.signalRService.startConnection();
    }
  }

  getUserChats() {
    this.chatService.GetUserChats(20)
      .subscribe({
        next: (data: ChatDto[]) => this.users = data,
        error: (err) => console.error(err)
      })
  }

  public sendMessage(message: HTMLInputElement) {
    if (message.value != '' && this.currentUser != '') {
      let date = new Date();

      this.signalRService.sendMessage(message.value, this.currentUser, date)
        .then((messageId: string) => {
          if (messageId != '') {
            let msg = Object.assign({}, new MessageDto(messageId, message.value, '', date.toString(), MessageStatus.Sent))
            this.messages.push(msg)

            message.value = ''

            if (this.messagesDiv) {
              this.messagesDiv.nativeElement.scrollTo({
                top: Number(this.messagesDiv.nativeElement.scrollHeight),
                left: 0,
                behavior: "smooth",
              });
            }
          }
        })
    }
  }

  chatChangedEvent(userId: string) {
    this.currentUser = userId;
    let c = this.users.find(u => u.userId == userId)?.unseenMessagesCount

    if (c && c > 0) {
      this.notificationService.chatClicked.emit({ id: userId, count: c })
    }
    this.getChats(this.currentUser, 5);

  }

  checkNewDate(i: number): boolean {
    if (i == 0) {
      return true;
    }

    let date1 = DateHelper.getDate(this.messages[i - 1].messageDate)
    let date2 = DateHelper.getDate(this.messages[i].messageDate)

    return !(date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate());
  }

  sortUsers() {
    this.users.sort((a, b) => new Date(b.messageDate).getTime() - new Date(a.messageDate).getTime());
  }

  getChats(userId: string = '', numOfDays: number = 20) {
    this.chatService.GetChat(userId, numOfDays, new Date())
      .subscribe({
        next: (data) => {
          let user = this.users.find(u => u.userId == this.currentUser);
          if (user) {
            user.unseenMessagesCount = 0;
          }
          this.messages = data

        },
        error: (err) => console.error(err)
      })
  }
  openChatByUrl() {
    if (this.activeRoute.snapshot.params["id"]) {

      this.currentUser = this.activeRoute.snapshot.params["id"];
      let c = this.users.find(u => u.userId == this.currentUser)?.unseenMessagesCount
      this.notificationService.chatClicked.emit({ id: this.currentUser, count: c })
      this.getChats(this.currentUser, 5);
    }

  }
}
