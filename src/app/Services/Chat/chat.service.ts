import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChatDto} from "../../Dtos/Message/ChatDto";
import {StatusDto} from "../../Dtos/StatusDto";
import {MessageDto} from "../../Dtos/Message/MessageDto";
import {MessageNotificationDto} from "../../Dtos/Message/MessageNotificationDto";

@Injectable({
  providedIn: 'root'
})
export class ChatService
{
  private baseUrl = `${environment.apiURL}/api/Messages`; //API

  constructor(private readonly httpClient: HttpClient)
  {
  }


  GetUserChats(upTo: number)
  {
    let params = new HttpParams();

    params = params.set('upTo', upTo)

    return this.httpClient.get<ChatDto[]>(
      `${this.baseUrl}/allChats`,
      {params}
    );
  }

  GetChat(secondUserId: string, upTo: number, dateOpened: Date)
  {
    let params = new HttpParams();

    params = params.set('secondUserId', secondUserId)
    params = params.set('upTo', upTo)
    params = params.set('dateOpened', new Date().toISOString())

    return this.httpClient.get<MessageDto[]>(
      `${this.baseUrl}/chat`,
      {params}
    );
  }

  DeleteMessage(userId: string, messageId: string)
  {
    let params = new HttpParams();

    params = params.set('userId', userId)
    params = params.set('messageId', messageId)

    return this.httpClient.delete<StatusDto>(
      `${this.baseUrl}/delete`,
      {params}
    );
  }

  GetNotificationCount()
  {
    return this.httpClient.get<number>(
      `${this.baseUrl}/notificationCount`
    );
  }

  GetLastNUnseenChats(number: number)
  {
    let params = new HttpParams();

    params = params.set('number', number)

    return this.httpClient.get<MessageNotificationDto[]>(
      `${this.baseUrl}/notifications`,
      {params}
    );
  }
}

//put box for sender
//notification
