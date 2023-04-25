import { Component, OnInit } from '@angular/core';
import { ReportDto } from 'src/app/Dtos/Reports/ReportDto';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { ReportListNames } from 'src/app/Dtos/Reports/ReportListNames';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(private readonly reportsService: ReportsService) {}

  public readonly ReportListNames = ReportListNames;

  reportsList?: ReportDto[];
  selectedList: string = ReportListNames.Chats;

  ngOnInit(): void {
    this.getReports();
  }

  OnListChange(newList: ReportListNames) {
    this.selectedList = newList;
    this.getReports();
  }

  getReports() {
    switch (this.selectedList) {
      case ReportListNames.Chats:
        this.fetchReports(this.reportsService.getAllChatsReports());
        break;
      case ReportListNames.Items:
        this.fetchReports(this.reportsService.getAllItemsReports());
        break;
      case ReportListNames.Reviews:
        this.fetchReports(this.reportsService.getAllReviewReports());
        break;
    }
  }

  fetchReports(service: Observable<ReportDto[]>) {
    service.subscribe({
      next: (data) => {
        this.reportsList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
