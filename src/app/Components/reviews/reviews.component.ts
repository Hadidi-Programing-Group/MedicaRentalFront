import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from 'bootstrap';
import { InsertReportDto } from 'src/app/Dtos/Reports/InsertReportDto';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { ReviewsService } from 'src/app/Services/Reviews/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  @Input() reviews: any;
  RatingStars: any;
  RestOfStars: any;
  public submitted = false;
  public success = false;
  public reportContentA = '';
  public reportContentB = '';
  private reportModal: any;
  public reportedId: any;
  public itemId: any;
  public reviewId: any;
  isAuthenticated: boolean = localStorage.getItem('isAuthenticated') == 'true';

  @Output() reportMessageEvent = new EventEmitter();

  constructor(
    private reportsService: ReportsService,
    private reviewService: ReviewsService
  ) {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') == 'true';
  }
  ngAfterViewInit(): void {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') == 'true';
    this.reportModal = new Modal(
      document.getElementById('reportStaticBackdropV2')!
    );
  }
  counter(NumToArray: number) {
    let array = new Array(NumToArray);
    return array;
  }
  GetRevId(RevId: any) {
    this.reviewService.GetReviewById(RevId).subscribe({
      next: (data: any) => {
        this.reviewId = data['id'];
        this.itemId = data['itemId'];
        this.reportedId = data['clientId'];
      },
    });
  }
  report() {
    this.reportModal.show();
  }

  confirmedReportMessage(obj: any) {
    let report = new InsertReportDto(
      obj.title,
      obj.statement,
      this.reportedId,
      null,
      this.reviewId,
      this.itemId
    );
    this.reportsService.insertReport(report).subscribe({
      next: (): void => {
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
  }
}
