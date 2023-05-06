import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageStatus} from "../../../Dtos/Message/MessageStatus";
import {DateHelper} from "../../../Helpers/DateHelper";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message:string = "";
  @Input() messageDate:string = '';
  @Input() seenStatus: MessageStatus = MessageStatus.Sent;
  @Input() isOut: boolean = false;
  @Input() isNewDate: boolean = false
  @Input() messageId: string = ''
  protected readonly DateHelper = DateHelper;

  @Output() deleteMessageEvent = new EventEmitter()
  @Output() reportMessageEvent = new EventEmitter()

  constructor()
  {
  }

  delete(messageId: string)
  {
    this.deleteMessageEvent.emit(messageId)

  }

  report(messageId: string)
  {
    console.log('hi')
    this.reportMessageEvent.emit(messageId)
  }
}
