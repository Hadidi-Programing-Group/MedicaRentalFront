import {Injectable} from '@angular/core';
import {HubConnection} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalRService
{
  private connection: HubConnection | null = null;
  private url = `${environment.apiURL}/chatHub`; //API


  startConnection(token: string)
  {
    console.log('is startcon')
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {accessTokenFactory: () => token})
      .build();

    this.connection.start()
      .then(() => console.log("Connected Successfully"))
      .catch((err) => console.error(err.toString()));

    this.connection.on("ReceiveMessage", (message: string, senderId: string) =>
    {
        console.log(`Message: ${message} was received from ${senderId}`);
    });
  }

  endConnection()
  {
    this.connection?.stop()
      .then(() => console.log('Connection closed.'))
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
