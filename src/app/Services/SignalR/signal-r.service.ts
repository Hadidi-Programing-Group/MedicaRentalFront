import { Injectable } from '@angular/core';
import {HubConnection} from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private readonly connection: HubConnection;

  private url = `${environment.apiURL}/chatHub`; //API
  private token: string
  constructor() {
    this.token = localStorage.getItem('authToken')??""

    if(this.token == "")
      console.error("authToken is empty")

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.url, {accessTokenFactory: () => this.token})
      .build();
  }

  startConnection()
  {
    this.connection.start()
      .then(() => console.log("Connected Successfully"))
      .catch((err) => console.error(err.toString()));

    this.connection.on("ReceiveMessage", (message: string, senderId) =>
    {

    });
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
