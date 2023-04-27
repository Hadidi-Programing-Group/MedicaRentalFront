import { Component, OnInit, OnChanges, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import { ChatService } from "../../../Services/Chat/chat.service";
import { SignalRService } from "../../../Services/SignalR/signal-r.service";
import { ChatDto } from "../../../Dtos/Message/ChatDto";
import { MessageDto } from "../../../Dtos/Message/MessageDto";
import { MessageStatus } from "../../../Dtos/Message/MessageStatus";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges, AfterContentChecked {
  public users: ChatDto[] = [];
  public messages: MessageDto[] = [];
  public currentUser: string = "";
  @ViewChild('messagesDiv') messagesDiv: ElementRef | undefined;

  constructor(
    private chatService: ChatService,
    private signalRService: SignalRService
  ) {
  }

  public trackMessages(index: number, message: MessageDto) {
    return message.id;
  }
  public trackChats(index: number, chat: ChatDto) {
    return chat.userId;
  }
  ngOnChanges(): void {
    console.log("Changed");
  }
  ngAfterContentChecked(): void {
    console.log("checked");
    if (this.messagesDiv) {
      console.log("this.messagesDiv.nativeElement", this.messagesDiv.nativeElement);
      this.messagesDiv.nativeElement.scrollTo({
        top: new Number(this.messagesDiv.nativeElement.scrollHeight),
        left: 0,
        behavior: "smooth",
      });
    }
  }
  ngOnInit(): void {
    console.log("init");
    this.checkConnection()
    this.getUserChats()
    this.sortUsers()

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
      },
      error: (err: any) => console.error(err)
    })

    this.signalRService.messageSeenEvent.subscribe({
      next: (messageId: string) => {

        console.log('this.signalRService.messageSeenEvent.subscribe')
        console.log(messageId)
        console.log(this.messages)
        let msg = this.messages.find(m => m.id == messageId)
        if (msg) {
          msg.messageStatus = MessageStatus.Seen
        }
        else {

          console.error('No message with the received id')
        }
      },
      error: (err: any) => console.error(err)
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

  public sendMessage(message: string) {
    if (message != '' && this.currentUser != '') {
      let date = new Date();

      this.signalRService.sendMessage(message, this.currentUser, date)
        .then((messageId: string) => {
          if (messageId != '') {
            let msg = Object.assign({}, new MessageDto(messageId, message, '', date, MessageStatus.Sent))
            this.messages.push(msg)
            if (this.messagesDiv) {
              console.log("this.messagesDiv.nativeElement", this.messagesDiv.nativeElement);
              this.messagesDiv.nativeElement.scrollTo({
                top: new Number(this.messagesDiv.nativeElement.scrollHeight),
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

    this.chatService.GetChat(userId, 20, new Date())
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

  checkNewDate(i: number): boolean {
    if (i == 0) {
      return true;
    }

    let date1 = new Date(this.messages[i - 1].messageDate)
    let date2 = new Date(this.messages[i].messageDate)

    return !(date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate());
  }
  sortUsers() {
    this.users.sort((a, b) => new Date(b.messageDate).getTime() - new Date(a.messageDate).getTime());
  }

}
