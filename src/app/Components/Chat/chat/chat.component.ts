import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../Services/Chat/chat.service";
import {SignalRService} from "../../../Services/SignalR/signal-r.service";
import {ChatDto} from "../../../Dtos/Message/ChatDto";
import {MessageDto} from "../../../Dtos/Message/MessageDto";
import {environment} from "../../../../environments/environment";
import {OrderByStrings} from "../../../Dtos/OrderByStrings";

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

  ngOnInit(): void
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
      this.signalRService.sendMessage(message, this.currentUser)
    }
  }

  openChat(userId: string)
  {
    this.currentUser = userId;

    this.chatService.GetChat(userId, 20, new Date())
      .subscribe({
        next: (data) => this.messages = data,
        error: (err) => console.error(err)
      })
  }

  protected readonly OrderByStrings = OrderByStrings;
}


/*
connection: signalR.HubConnection;
  loginToken:any

  constructor() {
    this.loginToken=localStorage.getItem("authToken")
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7273/hub" , { accessTokenFactory: () => this.loginToken })
      .build();


    this.connection.start().then(function () {
      console.log("Connected SuccessFully");
    }).catch(function (err) {
      return console.error(err.toString());
    });

    this.connection.on("ReceiveComment", function (comment) {
      console.log(comment);
    });
  }
  send(str: any) {
    this.connection.invoke("PostComment",str, "45f6038f-6a1b-4679-899f-13b0e240b45b")
  }
* */
