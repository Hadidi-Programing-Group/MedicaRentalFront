import { Component, OnInit } from '@angular/core';
import { ChatReportDto } from 'src/app/Dtos/Reports/ChatReportDto';
import { ReportDto } from 'src/app/Dtos/Reports/ReportDto';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { ReportListNames } from 'src/app/Dtos/Reports/ReportListNames';

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
        this.getAllChatsReports();
        break;
      case ReportListNames.Items:
        this.getAllItemsReports();
        break;
      case ReportListNames.Reviews:
        this.getAllReviewReports();
        break;
    }
  }
  getAllReviewReports() {
    this.reportsService.getAllReviewReports().subscribe({
      next: (data) => {
        this.reportsList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getAllItemsReports() {
    this.reportsService.getAllItemsReports().subscribe({
      next: (data) => {
        this.reportsList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllChatsReports() {
    this.reportsService.getAllChatsReports().subscribe({
      next: (data) => {
        this.reportsList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
