import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessageDto } from '../../../Dtos/Message/MessageDto';
import { DateHelper } from '../../../Helpers/DateHelper';
import { MessageStatus } from '../../../Dtos/Message/MessageStatus';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { InsertReportDto } from '../../../Dtos/Reports/InsertReportDto';
import { ReportsService } from '../../../Services/Reports/reports.service';
import { ChatService } from '../../../Services/Chat/chat.service';
import {ChatDataService} from "../../../Services/Chat/chat-data.service";

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css'],
})
export class ChatAreaComponent implements OnInit, AfterViewInit, OnDestroy {

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
    public chatDataService: ChatDataService,
    private activeRoute: ActivatedRoute,
    private reportsService: ReportsService,
    private chatService: ChatService,
  ) {}

  ngOnDestroy(): void {
    this.chatDataService.userOut.emit(this.currentUser)
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
    this.activeRoute.params.subscribe((params) => {
      this.currentUser = params['id'];
      this.chatDataService.userIn.emit(this.currentUser)
    });

    this.chatDataService.scroll.subscribe({
      next:()=> this.scrollToTheEnd()
    })
  }

  checkNewDate(i: number): boolean {
    if (i == 0) {
      return true;
    }

    let date1 = DateHelper.getDate(this.chatDataService.currentUserMessages[i - 1].messageDate);
    let date2 = DateHelper.getDate(this.chatDataService.currentUserMessages[i].messageDate);

    return !(
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  sendMessage(message: HTMLInputElement) {
    if (message.value != '' && this.currentUser != '')
    {
      let date = new Date();
      this.chatDataService.sendMessage(message.value, date).then(
        (messageId) =>
        {
          if (messageId != '')
          {
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
            this.chatDataService.currentUserMessages.push(msg);
            this.chatDataService.updateIfNotExist()
            message.value = '';

            this.scrollToTheEnd();
          }
        }
      )
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

  deleteMessage(messageId: string) {
    this.deletedMessageId = messageId;
    this.deleteContent =
      this.chatDataService.currentUserMessages.find((m) => m.id == messageId)?.message ?? '';
    this.deleteModal.show();
  }

  reportMessage(messageId: string) {
    this.reportedMessageId = messageId;
    this.reportContentA = `You are reporting the following message:`;
    this.reportContentB =
      this.chatDataService.currentUserMessages.find((m) => m.id == messageId)?.message ?? '';
    this.reportModal.show();
  }

  confirmedDeleteMessage() {
    this.chatService.DeleteMessageByClient(this.deletedMessageId).subscribe({
      next: () => {
        this.deleteModal.hide();
        this.submitted = true;
        this.success = true;

        let index = this.chatDataService.currentUserMessages.findIndex(
          (m) => m.id == this.deletedMessageId
        );
        this.chatDataService.currentUserMessages.splice(index, 1);
        this.cancelDelete();
      },
      error: (err) => {
        if (err.status == 401) this.deleteModal.hide();
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
        if (err.status == 401) this.deleteModal.hide();
        this.submitted = true;
        this.success = false;
        console.error('hahah', err);
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
