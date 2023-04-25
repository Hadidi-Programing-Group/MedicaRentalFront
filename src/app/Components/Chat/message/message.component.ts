import {Component, Input} from '@angular/core';
import {MessageStatus} from "../../../Dtos/Message/MessageStatus";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message:string = "";
  @Input() messageDate:Date = new Date();
  @Input() seenStatus: MessageStatus = MessageStatus.Sent;
  @Input() isOut: boolean = false;
  @Input() isNewDate: boolean = false
}
