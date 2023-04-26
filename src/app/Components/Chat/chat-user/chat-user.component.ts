import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChatDto} from "../../../Dtos/Message/ChatDto";

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent
{
  @Input() chat: ChatDto|null = null;
  @Output() chatClicked = new EventEmitter()
  isValidBase64(str: string|null): boolean
  {
    console.log()
    if (str == null || str == '')
    {
      return false;
    }
    try
    {
      const decodedStr = atob(str);
      return decodedStr.length === str.length;
    } catch (e)
    {
      return false;
    }
  }

  getDate(messageDate: Date|string)
  {
    let date1 = new Date()
    let date2 = new Date(messageDate)

    let equal = (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate());

    const options1: object = {hour: 'numeric', minute: 'numeric', hour12: true};
    const options2: object = {month: 'numeric', day: 'numeric', year: 'numeric'};

    return equal ? date2.toLocaleTimeString(undefined, options1) : date2.toLocaleTimeString(undefined, options2)
  }

  openChat(userId: string)
  {
    this.chatClicked.emit(userId)
  }

}