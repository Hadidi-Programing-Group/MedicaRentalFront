import {
  ChangeDetectorRef,
  Component, OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ChatDto} from "../../../Dtos/Message/ChatDto";
import {ChatDataService} from "../../../Services/Chat/chat-data.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy
{
  constructor(
    public chatDataService: ChatDataService,
  )
  {
  }

  ngOnDestroy(): void
  {
    this.chatDataService.reset()
  }

  ngOnInit(): void
  {
    this.chatDataService.getUsers()
  }
}
