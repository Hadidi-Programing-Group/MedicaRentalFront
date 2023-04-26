import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../Services/Chat/chat.service";
import {SignalRService} from "../../../Services/SignalR/signal-r.service";
import {ChatDto} from "../../../Dtos/Message/ChatDto";
import {MessageDto} from "../../../Dtos/Message/MessageDto";
import {MessageStatus} from "../../../Dtos/Message/MessageStatus";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit
{
  public users: ChatDto[] = [];
  public messages: MessageDto[] = [];
  public currentUser: string = "";

  constructor(
    private chatService: ChatService,
    private signalRService: SignalRService
  )
  {
  }

  public trackItem(index: number, message: MessageDto)
  {
    return message.id;
  }

  ngOnInit(): void
  {
    this.checkConnection()
    this.getUserChats()

    this.signalRService.newMessageEvent.subscribe({
      next: (message: MessageDto) =>
      {
        if (message.senderId == this.currentUser)
        {
          message.messageStatus = MessageStatus.Seen;
          this.messages.push(message);

          this.signalRService.setMessageSeen(message.id, message.senderId)
        }

        else
        {
          this.getUserChats()
        }
      },
      error: (err: any) => console.error(err)
    })

    this.signalRService.messageSeenEvent.subscribe({
      next: (messageId: string) =>
      {
        console.log('this.signalRService.messageSeenEvent.subscribe')
        console.log(messageId)
        console.log(this.messages)
        let msg = this.messages.find(m => m.id == messageId)
        if (msg)
        {
          msg.messageStatus = MessageStatus.Seen
        }
        else{

          console.error('No message with the received id')
        }
      },
      error: (err: any) => console.error(err)
    })
  }

  checkConnection()
  {
    if (!this.signalRService.isConnected)
    {
      this.signalRService.startConnection();
    }
  }

  getUserChats()
  {
    this.chatService.GetUserChats(20)
      .subscribe({
        next: (data) => this.users = data,
        error: (err) => console.error(err)
      })
  }

  public sendMessage(message: string)
  {
    if (message != '' && this.currentUser != '')
    {
      let date = new Date();

      this.signalRService.sendMessage(message, this.currentUser, date)
        .then((messageId: string)=>{
          if (messageId != '')
          {
            let msg = Object.assign({}, new MessageDto(messageId, message, '', date, MessageStatus.Sent))
            this.messages.push(msg)
          }
        })

    }
  }

  chatChangedEvent(userId: string)
  {
    this.currentUser = userId;

    this.chatService.GetChat(userId, 20, new Date())
      .subscribe({
        next: (data) => this.messages = data,
        error: (err) => console.error(err)
      })
  }

  checkNewDate(i: number): boolean
  {
    if (i == 0)
    {
      return true;
    }

    let date1 = new Date(this.messages[i - 1].messageDate)
    let date2 = new Date(this.messages[i].messageDate)

    return !(date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate());
  }

}
