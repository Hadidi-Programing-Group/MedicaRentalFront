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
    this.signalRService.newMessageEvent.subscribe({
      next: (message: MessageDto) =>{
        if(message.senderId == this.currentUser){
          message.messageStatus = MessageStatus.Seen;
          this.messages.push(message);
          console.log(message.id)
          this.chatService.UpdateMessageStatus(message.id).subscribe({
            next: (data)=> {},
          })
        }

        else{
          this.getUserChats()
        }
      },
      error: (err:any) => console.error(err)
    })

  }
  public trackItem (index: number, message: MessageDto) {
    return message.id;
  }
  ngOnInit(): void
  {
   this.checkConnection()
   this.getUserChats()
  }

  checkConnection(){
    if(!this.signalRService.connectionStatus){
      this.signalRService.startConnection();
    }
  }

  getUserChats(){
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
      this.signalRService.sendMessage(message, this.currentUser)
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
