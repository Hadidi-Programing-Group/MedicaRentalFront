import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MessageDto } from '../../../Dtos/Message/MessageDto';
import { DateHelper } from '../../../Helpers/DateHelper';
import { MessageStatus } from '../../../Dtos/Message/MessageStatus';
import { SignalRService } from '../../../Services/SignalR/signal-r.service';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { DeleteMessageRequestDto } from '../../../Dtos/Message/DeleteMessageRequestDto';
import { InsertReportDto } from '../../../Dtos/Reports/InsertReportDto';
import { ReportsService } from '../../../Services/Reports/reports.service';
import { ChatService } from '../../../Services/Chat/chat.service';
import { NotificationService } from '../../../Services/Chat/notification.service';
import { ChatUsersService } from '../../../Services/chat-users.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css'],
})
export class ChatAreaComponent implements OnInit, AfterViewInit, OnDestroy {
  public messages: MessageDto[] = [];
  public currentUser = '';

  public reportContentA = '';
  public reportContentB = '';
  public reportedMessageId = '';
  public deletedMessageId = '';
  public deleteContent = '';
  public submitted = false;
  public success = false;
  private deleteModal: any;
  private reportModal: any;

  @ViewChild('messagesDiv') messagesDiv: ElementRef | undefined;

  constructor(
    private signalRService: SignalRService,
    private activeRoute: ActivatedRoute,
    private reportsService: ReportsService,
    private chatService: ChatService,
    private chatUsersService: ChatUsersService
  ) {}

  ngOnDestroy(): void {
    this.currentUser = '';
    this.chatUsersService.setData(null);
  }

  ngAfterViewInit(): void {
    this.deleteModal = new Modal(
      document.getElementById('deleteStaticBackdrop')!
    );
    this.reportModal = new Modal(
      document.getElementById('reportStaticBackdrop')!
    );
  }

  ngOnInit(): void {
    this.checkConnection();

    this.activeRoute.params.subscribe((params) => {
      this.currentUser = params['id'];

      this.chatUsersService.getData().subscribe((data) => {
        if (data != null && this.currentUser != '') {
          console.log('user', this.currentUser.charCodeAt(0));
          this.chatService.chatOpened.emit(this.currentUser);
          console.log('hhhhhhhhhhhhhhhh');
          this.getChat(20);
        }
      });
    });

    this.signalRService.newMessageEvent.subscribe({
      next: (message: MessageDto) => {
        if (message.senderId == this.currentUser) {
          message.messageStatus = MessageStatus.Seen;
          this.messages.push(message);
          this.scrollToTheEnd();
          this.signalRService.setMessageSeen(message.id, message.senderId);
        }

        this.chatService.newMessage.emit({ message, user: message.senderId });
      },
      error: (err: any) => console.error(err),
    });

    this.signalRService.messageSeenEvent.subscribe({
      next: (messageId: string) => {
        debugger;
        let msg = this.messages.find((m) => m.id == messageId);
        if (msg) {
          msg.messageStatus = MessageStatus.Seen;
          this.messages = [...this.messages];
        } else {
          console.error('No message with the received id');
        }
      },
      error: (err: any) => console.error(err),
    });

    this.signalRService.allMessagesSeenEvent.subscribe({
      next: (userId: string) => {
        if (userId == this.currentUser) {
          for (let message of this.messages) {
            message.messageStatus = MessageStatus.Seen;
          }
          this.messages = [...this.messages];
        }
      },
    });
  }

  checkConnection() {
    if (!this.signalRService.isConnected) {
      this.signalRService.startConnection();
    }
  }

  checkNewDate(i: number): boolean {
    if (i == 0) {
      return true;
    }

    let date1 = DateHelper.getDate(this.messages[i - 1].messageDate);
    let date2 = DateHelper.getDate(this.messages[i].messageDate);

    return !(
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  sendMessage(message: HTMLInputElement) {
    if (message.value != '' && this.currentUser != '') {
      let date = new Date();

      this.signalRService
        .sendMessage(message.value, this.currentUser, date)
        .then((messageId: string) => {
          if (messageId != '') {
            let msg = Object.assign(
              {},
              new MessageDto(
                messageId,
                message.value,
                '',
                date.toString(),
                MessageStatus.Sent
              )
            );
            this.messages.push(msg);

            message.value = '';

            this.chatService.newMessage.emit({
              message: msg,
              user: this.currentUser,
            });

            this.scrollToTheEnd();
          }
        });
    }
  }

  scrollToTheEnd() {
    setTimeout(() => {
      if (this.messagesDiv) {
        this.messagesDiv.nativeElement.scrollTo({
          top: Number(this.messagesDiv.nativeElement.scrollHeight),
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  getChat(numOfDays: number = 20) {
    this.chatService
      .GetChat(this.currentUser, numOfDays, new Date())
      .subscribe({
        next: (data) => {
          this.messages = data;
          this.scrollToTheEnd();
        },
        error: (err) => console.error(err),
      });
  }

  deleteMessage(messageId: string) {
    this.deletedMessageId = messageId;
    this.deleteContent =
      this.messages.find((m) => m.id == messageId)?.message ?? '';
    this.deleteModal.show();
  }

  reportMessage(messageId: string) {
    this.reportedMessageId = messageId;
    this.reportContentA = `You are reporting the following message:`;
    this.reportContentB =
      this.messages.find((m) => m.id == messageId)?.message ?? '';
    this.reportModal.show();
  }

  confirmedDeleteMessage() {
    this.chatService.DeleteMessageByClient(this.deletedMessageId).subscribe({
      next: () => {
        this.deleteModal.hide();
        this.submitted = true;
        this.success = true;

        let index = this.messages.findIndex(
          (m) => m.id == this.deletedMessageId
        );
        this.messages.splice(index, 1);
        this.cancelDelete();
      },
      error: (err) => {
        this.submitted = true;
        this.success = false;

        console.error(err);
      },
    });
  }

  confirmedReportMessage(obj: any) {
    let report = new InsertReportDto(
      obj.title,
      obj.statement,
      this.currentUser,
      this.reportedMessageId,
      null,
      null
    );
    this.reportsService.insertReport(report).subscribe({
      next: (): void => {
        this.reportModal.hide();
        this.submitted = true;
        this.success = true;
        this.cancelReport();
      },
      error: (err) => {
        this.submitted = true;
        this.success = false;
        console.error(err);
      },
    });
  }

  cancelReport() {
    this.reportContentA = '';
    this.reportContentB = '';
    this.reportedMessageId = '';
  }

  cancelDelete() {
    this.deletedMessageId = '';
    this.deleteContent = '';
  }
}
