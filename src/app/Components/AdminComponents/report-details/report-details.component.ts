import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUserInfoDto } from 'src/app/Dtos/BlockUserInfoDto';
import { DeleteItemAdminRequestDto } from 'src/app/Dtos/DeleteItemAdminRequestDto';
import { DeleteMessageRequestDto } from 'src/app/Dtos/Message/DeleteMessageRequestDto';
import {
  DetailedReportDto,
  ReportActionDto,
} from 'src/app/Dtos/Reports/DetailedReportDto';
import { ReportListNames } from 'src/app/Dtos/Reports/ReportListNames';
import { DeleteReviewRequestDto } from 'src/app/Dtos/Reviews/DeleteReviewRequestDto';
import { StatusDto } from 'src/app/Dtos/StatusDto';
import { ChatService } from 'src/app/Services/Chat/chat.service';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { ReviewsService } from 'src/app/Services/Reviews/reviews.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
})
export class ReportDetailsComponent implements OnInit {
  constructor(
    private readonly reportService: ReportsService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly reviewService: ReviewsService,
    private readonly itemsService: ProductsService
  ) {
    this.reportId = route.snapshot.params['id'];
  }

  reportId: string;
  report: DetailedReportDto | any;
  ReportListNames = ReportListNames;

  endTime: Date = new Date();
  ngOnInit(): void {
    this.endTime.setFullYear(this.endTime.getFullYear() + 20);
    this.reportService.getDetailedReport(this.reportId).subscribe({
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
    this.userService.BlockUser(blockUserInfo).subscribe(this.callObject);
  }

  DeletedReportedItem() {
    switch (this.report.reportCategory) {
      case ReportListNames.Chats:
        const deleteMessageRequestDto = new DeleteMessageRequestDto(
          this.report.contentId,
          this.reportId
        );

        this.chatService
          .DeleteMessage(deleteMessageRequestDto)
          .subscribe(this.callObject);
        break;

      case ReportListNames.Items:
        const deleteItemAdminRequest = new DeleteItemAdminRequestDto(
          this.report.contentId,
          this.reportId
        );

        this.itemsService
          .DeleteItemByAdmin(deleteItemAdminRequest)
          .subscribe(this.callObject);
        break;
      case ReportListNames.Reviews:
        const deleteReviewRequestDto = new DeleteReviewRequestDto(
          this.report.contentId,
          this.reportId
        );

        this.reviewService
          .DeleteReview(deleteReviewRequestDto)
          .subscribe(this.callObject);
        break;
    }
  }

  MarkAsSolved() {
    this.reportService.markAsSolved(this.reportId).subscribe(this.callObject);
  }

  private readonly callObject = {
    next: (data: StatusDto) => {
      this.handleReportActionResponse(data);
    },
    error: (err: any) => {
      console.log(err);
    },
  };

  private handleReportActionResponse(data: StatusDto) {
    if (data.statusCode == 200) {
      // Do This or refresh page
      // const reportAction = new ReportActionDto(data.statusMessage, new Date().toDateString(), "");
      // this.report.reportActions.push(reportAction);

      window.location.reload();
    }
  }
}
