import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ChatDto} from "../Dtos/Message/ChatDto";

@Injectable({
  providedIn: 'root'
})
export class ChatUsersService {
  private chatUsers$ = new BehaviorSubject<ChatDto[]|null>(null)

  setData(data: ChatDto[]|null){
    this.chatUsers$.next(data)
  }


  getData(){
    return this.chatUsers$.asObservable()
  }
  constructor() { }
}
