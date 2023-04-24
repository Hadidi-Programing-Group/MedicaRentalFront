import { Component } from '@angular/core';
import * as signalR from "@microsoft/signalr";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {
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

    this.connection.on("ReciveComment", function (comment) {
      console.log(comment);
    });
  }
  send(str: any) {
    this.connection.invoke("PostComment",str)
  }
}
