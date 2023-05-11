import {EventEmitter, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChatDto } from '../../Dtos/Message/ChatDto';
import { StatusDto } from '../../Dtos/StatusDto';
import { MessageDto } from '../../Dtos/Message/MessageDto';
import { MessageNotificationDto } from '../../Dtos/Message/MessageNotificationDto';
import { DeleteMessageRequestDto } from 'src/app/Dtos/Message/DeleteMessageRequestDto';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ChatService
{
  newMessage = new EventEmitter();


  private baseUrl = `${environment.apiURL}/api/Messages`; //API

  constructor(private readonly httpClient: HttpClient) {}

  GetUserChats(upTo: number) {
    let params = new HttpParams();

    params = params.set('upTo', upTo);

    return this.httpClient.get<ChatDto[]>(`${this.baseUrl}/allChats`, {
      params,
    });
  }

  GetChat(secondUserId: string, upTo: number, dateOpened: Date) {
    let params = new HttpParams();

    params = params.set('secondUserId', secondUserId);
    params = params.set('upTo', upTo);
    params = params.set('dateOpened', dateOpened.toISOString());

    return this.httpClient.get<MessageDto[]>(`${this.baseUrl}/chat`, {
      params,
    });
  }

  GetNotificationCount() {
    return this.httpClient.get<number>(`${this.baseUrl}/notificationCount`);
  }

  GetUnseenChats() {
    return this.httpClient.get<MessageNotificationDto[]>(
      `${this.baseUrl}/notifications`
    );
  }

  DeleteMessageByClient(messageId: string) {
    return this.httpClient.delete<StatusDto>(`${this.baseUrl}/${messageId}`);
  }

  DeleteMessage(deleteMessageRequestDto: DeleteMessageRequestDto) {
    return this.httpClient.post<StatusDto>(
      `${this.baseUrl}`,
      deleteMessageRequestDto
    );
  }
}
