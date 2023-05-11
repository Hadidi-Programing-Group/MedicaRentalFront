import {EventEmitter, Injectable} from '@angular/core';
import {ChatDto} from "../../Dtos/Message/ChatDto";
import {MessageDto} from "../../Dtos/Message/MessageDto";
import {MessageStatus} from "../../Dtos/Message/MessageStatus";
import {SignalRService} from "../SignalR/signal-r.service";
import {NotificationService} from "./notification.service";
import {ChatUsersService} from "./chat-users.service";
import {ChatService} from "./chat.service";
import {MessageNotificationDto} from "../../Dtos/Message/MessageNotificationDto";

@Injectable({
  providedIn: 'root'
})
export class ChatDataService
{
  public currentUser = ''
  public users: ChatDto[] = [];
  public currentUserMessages: MessageDto[] = [];
  public notificationMessages: MessageNotificationDto[] = [];
  public notificationCount: number = 0

  public userIn = new EventEmitter()
  public userOut = new EventEmitter()
  public scroll = new EventEmitter()

  constructor(private signalRService: SignalRService,
              private notificationService: NotificationService,
              private chatUsersService: ChatUsersService,
              private chatService: ChatService)
  {
    this.subscribeSignalR()

    this.subscribeUserIn()

    this.userOut.subscribe({
      next: (userId: string) =>
      {
        this.currentUser = ''
        this.currentUserMessages = []
      }
    })

    this.getUsers()

    setInterval(()=>{
      if(!this.signalRService.isConnected)
        this.signalRService.startConnection()
    }, 2000)
  }

  subscribeSignalR()
  {
    this.signalRService.newMessageEvent.subscribe({
      next: (message: MessageDto) =>
      {
        if (message.senderId == this.currentUser)
        {

          message.messageStatus = MessageStatus.Seen;
          this.currentUserMessages.push(message);
          this.scroll.emit()
          this.signalRService.setMessageSeen(message.id, message.senderId);
        }

        else
        {
          this.updateNotification(message)
          this.updateUsers(message)
        }
      },
      error: (err: any) => console.error(err),
    });

    this.signalRService.messageSeenEvent.subscribe({
      next: (messageId: string) =>
      {
        debugger;
        let msg = this.currentUserMessages.find((m) => m.id == messageId);
        if (msg)
        {
          msg.messageStatus = MessageStatus.Seen;
        }
        else
        {
          console.error('No message with the received id');
        }
      },
      error: (err: any) => console.error(err),
    });

    this.signalRService.allMessagesSeenEvent.subscribe({
      next: (userId: string) =>
      {
        if (userId == this.currentUser)
        {
          for (let message of this.currentUserMessages)
          {
            message.messageStatus = MessageStatus.Seen;
          }
        }
      },
    });
  }

  subscribeUserIn()
  {
    this.userIn.subscribe({
      next: (userId: string) =>
      {
        this.currentUser = userId
        this.getChat()
        this.removeUserNotification()
        this.updateUserSeen()
      }
    })
  }

  getUsers()
  {
    this.chatService.GetUserChats(20)
      .subscribe({
        next: (data: ChatDto[]) =>
        {
          this.users = data
          this.sortUsers()
        },
        error: (err) => console.error(err)
      })
  }

  getChat(numOfDays: number = 20)
  {
    this.chatService
      .GetChat(this.currentUser, numOfDays, new Date())
      .subscribe({
        next: (data) =>
        {
          this.currentUserMessages = data;
          this.scroll.emit()
        },
        error: (err) => console.error(err),
      });
  }

  getNotifications(){
    this.chatService.GetNotificationCount().subscribe({
      next: (data: number) => {
        this.notificationCount = data

        if (data > 0) {
          this.chatService.GetUnseenChats().subscribe({
            next: (data: MessageNotificationDto[]) => {
              this.notificationMessages = data
            },
            error: (err) => console.error(err)
          })
        }
      },
      error: (err) => console.error(err)
    })
  }

  sortUsers()
  {
    this.users.sort((a, b) => new Date(b.messageDate).getTime() - new Date(a.messageDate).getTime());
  }

  updateUsers(message: MessageDto){
    let user = this.users.find(u => u.userId == message.senderId)

    if (!user)
    {
      this.getUsers()
    }

    else
    {
      user.lastMessage = message.message;
      user.messageDate = message.messageDate;
      user.messageStatus = message.messageStatus;
      user.unseenMessagesCount += 1;
      this.sortUsers()
    }
  }

  updateIfNotExist(){
    let user = this.users.find(u => u.userId == this.currentUser)

    if (!user)
    {
      this.getUsers()
    }
  }

  updateNotification(message: MessageDto){
    let index = this.notificationMessages.findIndex(m => m.senderId == message.senderId)

    if (index != -1) {

      let notification = this.notificationMessages[index]
      notification.messageDate = message.messageDate
      notification.message = message.message
      notification.messageDate = message.messageDate
      this.notificationMessages.splice(index, 1)
      this.notificationMessages.unshift(notification)
      this.notificationCount++
    }

    else {
      this.getNotifications()
    }
  }

  updateUserSeen()
  {
    let c = this.users.find(u => u.userId == this.currentUser)?.unseenMessagesCount

    if (c && c > 0)
    {
      let user = this.users.find(u => u.userId == this.currentUser);

      if (user)
      {
        this.notificationCount-=c
        user.unseenMessagesCount = 0;
      }
    }
  }

  sendMessage(message: string, date: Date)
  {
    return this.signalRService
      .sendMessage(message, this.currentUser, date)
  }

  reset()
  {
    this.currentUser = ''
    this.currentUserMessages = []
    this.users = []
  }

  removeUserNotification()
  {
    let index = this.notificationMessages.findIndex(m => m.senderId == this.currentUser)
    if (index != -1) {
      this.notificationMessages.splice(index, 1)
    }
  }
}
