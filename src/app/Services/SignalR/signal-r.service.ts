import {EventEmitter, Injectable} from '@angular/core';
import {HubConnection} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
import {environment} from "../../../environments/environment";
import {MessageDto} from "../../Dtos/Message/MessageDto";
import {MessageStatus} from "../../Dtos/Message/MessageStatus";

@Injectable({
  providedIn: 'root'
})
export class SignalRService
{
  private connection: HubConnection | null = null;
  private url = `${environment.apiURL}/chatHub`; //API
  public newMessageEvent = new EventEmitter();
  public connectionStatus: boolean = false;

  startConnection(token?: string)
  {
    if(!token){
      token = localStorage.getItem('authToken')?.toString()??'';
    }

    if(!token || token == '')
      return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {accessTokenFactory: () => token??''})
      .build();

    this.connection.start()
      .then(() => this.connectionStatus = true)
      .catch((err) => console.error(err.toString()));

    this.connection.on("ReceiveMessage", (
      messageId:string, message:string, senderId:string, timeStamp:Date, messageStatus:MessageStatus) =>
    {
      let msg = new MessageDto(messageId, message, senderId, timeStamp, messageStatus);
      this.newMessageEvent.emit(msg)
    });
  }

  endConnection()
  {
    this.connection?.stop()
      .then(() => this.connectionStatus = false)
      .catch((err) => console.error(err))
  }

  sendMessage(message: string, receiverId: string)
  {
    if (!this.connection)
    {
      return console.error("SignalR connection isn't established")
    }

    this.connection.invoke("SendMessage", message, receiverId, new Date().toISOString())
      .then(() => console.log(`Message ${message} was sent to user ${receiverId} successfully`))
      .catch((err) => console.error("Message couldn't be sent", err));
  }
}
