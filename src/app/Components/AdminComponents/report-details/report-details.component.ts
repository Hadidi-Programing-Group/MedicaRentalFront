import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUserInfoDto } from 'src/app/Dtos/BlockUserInfoDto';
import { DeleteMessageRequestDto } from 'src/app/Dtos/Message/DeleteMessageRequestDto';
import {
  DetailedReportDto,
  ReportActionDto,
} from 'src/app/Dtos/Reports/DetailedReportDto';
import { ReportListNames } from 'src/app/Dtos/Reports/ReportListNames';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
})
export class ReportDetailsComponent implements OnInit {
  constructor(
    private readonly reportSerivce: ReportsService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly chatService: ChatService
  ) {
    this.reportId = route.snapshot.params['id'];
  }

  reportId: string;
  report: DetailedReportDto | any;
  ReportListNames = ReportListNames;

  endTime: Date = new Date();
  ngOnInit(): void {
    this.endTime.setFullYear(this.endTime.getFullYear() + 20);
    this.reportSerivce.getDetailedReport(this.reportId).subscribe({
      next: (data) => {
        this.report = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  BlockReported() {
    const blockUserInfo = new BlockUserInfoDto(
      this.report.reportedId,
      this.endTime,
      this.reportId
    );
    this.userService.BlockUser(blockUserInfo).subscribe({
      next: (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // Do This or refresh page
          //   this.report.reportActions.push(new ReportActionDto(data.statusMessage, new Date().toDateString(), ""));
          window.location.reload();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  DeletedReportedItem() {
    const deleteMessageRequestDto = new DeleteMessageRequestDto(
      this.report.reportedId,
      this.report.contentId,
      this.reportId
    );

    this.chatService.DeleteMessage(deleteMessageRequestDto).subscribe({
      next: (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // Do This or refresh page
          //   this.report.reportActions.push(new ReportActionDto(data.statusMessage, new Date().toDateString(), ""));
          window.location.reload();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  MarkAsSolved() {
    this.reportSerivce.markAsSolved(this.reportId).subscribe({
      next: (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          // Do This or refresh page
          //   this.report.reportActions.push(new ReportActionDto(data.statusMessage, new Date().toDateString(), ""));
          window.location.reload();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
