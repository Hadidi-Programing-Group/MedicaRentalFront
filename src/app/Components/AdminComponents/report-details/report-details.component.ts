import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedReportDto } from 'src/app/Dtos/Reports/DetailedReportDto';
import { ReportsService } from 'src/app/Services/Reports/reports.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css'],
})
export class ReportDetailsComponent implements OnInit {
  constructor(
    private readonly reportSerivce: ReportsService,
    private readonly route: ActivatedRoute
  ) {
    this.reportId = route.snapshot.params['id'];
  }

  reportId: string;
  report: DetailedReportDto | any;

  ngOnInit(): void {
    this.reportSerivce.getDetailedReport(this.reportId).subscribe({
      next: (data) => {
        this.report = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
