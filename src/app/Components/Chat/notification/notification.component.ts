import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MessageNotificationDto } from "../../../Dtos/Message/MessageNotificationDto";
import { MessageDto } from "../../../Dtos/Message/MessageDto";
import { SignalRService } from "../../../Services/SignalR/signal-r.service";
import { ChatService } from "../../../Services/Chat/chat.service";
import { DateHelper } from "../../../Dtos/DateHelper";
import { NotificationService } from "../../../Services/Chat/notification.service";
import { count } from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() messages: MessageNotificationDto[] = [];
  @Input() notificationCount: number = 0
  currentChat: string = ''

  constructor(private signalRService: SignalRService,
    private chatService: ChatService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.updateNotifications()

    this.signalRService.newMessageEvent.subscribe({
      next: (message: MessageDto) => {
        if (message.senderId == this.currentChat) {
          return;
        }
        let index = this.messages.findIndex(m => m.senderId == message.senderId)

        if (index != -1) {
          let notification = this.messages[index]
          notification.messageDate = message.messageDate
          notification.message = message.message
          notification.messageDate = message.messageDate
          this.messages.splice(index, 1)
          this.messages.unshift(notification)
          this.notificationCount++
          this.changeDetector.detectChanges()
        }

        else {
          this.updateNotifications()
        }
      },
      error: (err: any) => console.error(err)
    })

    this.notificationService.chatClicked.subscribe({
      next: (data: { id: string, count: number }) => {
        let index = this.messages.findIndex(m => m.senderId == data.id)
        this.currentChat = data.id
        if (index >= 0) {
          this.messages.splice(index, 1)
          this.notificationCount -= data.count
          this.changeDetector.detectChanges()
          }
      }
    })

    this.notificationService.outChat.subscribe(({
      next: () => {
        this.currentChat = ''
      }
    }))
  }

  updateNotifications() {
    this.chatService.GetNotificationCount().subscribe({
      next: (data: number) => {
        this.notificationCount = data

        if (data > 0) {
          this.chatService.GetUnseenChats().subscribe({
            next: (data: MessageNotificationDto[]) => {
              this.messages = data
              this.changeDetector.detectChanges();
            },
            error: (err) => console.error(err)
          })
        }
        this.changeDetector.detectChanges();
      },
      error: (err) => console.error(err)
    })


  }

  getDate(_date: string) {
    let date = DateHelper.getDate(_date)
    let today = new Date()

    let sameDay = date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    if (sameDay) {
      const diffMs = Math.abs(today.getTime() - date.getTime());
      const diffMins = Math.floor((diffMs / 1000) / 60);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;

      if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ago`;
      }
      else {
        return `${minutes} mins ago`;
      }
    }

    return date.toLocaleDateString([], { hour12: true, minute: "numeric", hour: "numeric" })

  }

  openChat(senderId: string) {
    this.notificationService.chatClicked.emit(senderId)
  }
}
