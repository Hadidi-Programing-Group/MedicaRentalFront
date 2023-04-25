import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChatDto} from "../../Dtos/Message/ChatDto";
import {StatusDto} from "../../Dtos/StatusDto";
import {MessageDto} from "../../Dtos/Message/MessageDto";

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

    return this.httpClient.get<StatusDto>(
      `${this.baseUrl}/delete`,
      {params}
    );
  }
}
