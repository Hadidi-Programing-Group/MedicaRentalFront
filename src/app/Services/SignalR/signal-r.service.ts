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
  public messageSeenEvent = new EventEmitter();
  public incMesCountEvent = new EventEmitter();
  public isConnected: boolean = false;

  startConnection(token?: string)
  {
    if (!token)
    {
      token = localStorage.getItem('authToken')?.toString() ?? '';
    }

    if (!token || token == '')
    {
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {accessTokenFactory: () => token ?? ''})
      .build();

    this.connection.start()
      .then(() => this.isConnected = true)
      .catch((err) => console.error(err.toString()));

    this.connection.on("ReceiveMessage", (
      messageId: string, message: string, senderId: string, timeStamp: Date, messageStatus: MessageStatus) =>
    {
      let msg = new MessageDto(messageId, message, senderId, timeStamp, messageStatus);
      this.newMessageEvent.emit(msg)
    });

    this.connection.on("MessageSeen", (messageId: string) =>
    {
      this.messageSeenEvent.emit(messageId)
    });
    // this.connection.on("MessageSeen", (messageId: string) =>
    // {
    //   this.messageSeenEvent.emit(messageId)
    // });
  }

  endConnection()
  {
    this.connection?.stop()
      .then(() => this.isConnected = false)
      .catch((err) => console.error(err))
  }

  async sendMessage(message: string, receiverId: string, timestamp: Date)
  {
    if (!this.connection)
    {
      console.error("SignalR connection isn't established")
      return ''
    }

    let _messageId = '';

    await this.connection.invoke("SendMessage", message, receiverId, timestamp.toISOString())
      .then((messageId: string) => _messageId = messageId)
      .catch((err) => console.error("Message couldn't be sent", err));

    return _messageId
  }

  setMessageSeen(messageId: string, senderId: string)
  {
    if (!this.connection)
    {
      return console.error("SignalR connection isn't established")
    }

    this.connection.invoke("SetMessageSeen", messageId, senderId)
      .then(() =>
      {
      })
      .catch((err) => console.error("Message couldn't be sent", err));
  }
}
