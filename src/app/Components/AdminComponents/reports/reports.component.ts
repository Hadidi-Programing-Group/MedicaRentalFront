import { Component, OnInit } from '@angular/core';
import { ReportDto } from 'src/app/Dtos/Reports/ReportDto';
import { ReportsService } from 'src/app/Services/Reports/reports.service';
import { ReportListNames } from 'src/app/Dtos/Reports/ReportListNames';
import { Observable, take } from 'rxjs';
import { PageDto } from 'src/app/Dtos/PageDto';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public readonly ReportListNames = ReportListNames;

  reportsList?: ReportDto[];
  selectedList: string = ReportListNames.Chats;
  currentPage: number = 1;
  pagesCount: number = 1;

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.currentPage = params['page'] ?? 1;
      this.selectedList = params['selectedList'] ?? ReportListNames.Chats;
    });
    
    this.getReports();
  }

  OnListChange(newList: ReportListNames) {
    this.selectedList = newList;
    this.currentPage = 1;
    this.router.navigate([], {
      queryParams: {
        selectedList: this.selectedList,
        page: this.currentPage,
      },
      queryParamsHandling: 'merge',
    });
    this.getReports();
  }

  onPageChanged(newPage: number) {
    this.currentPage = newPage;
    this.router.navigate([], {
      queryParams: {
        page: this.currentPage,
      },
      queryParamsHandling: 'merge',
    });
    this.getReports();
  }

  getReports() {
    switch (this.selectedList) {
      case ReportListNames.Chats:
        this.fetchReports(
          this.reportsService.getAllChatsReports(this.currentPage)
        );
        break;
      case ReportListNames.Items:
        this.fetchReports(
          this.reportsService.getAllItemsReports(this.currentPage)
        );
        break;
      case ReportListNames.Reviews:
        this.fetchReports(
          this.reportsService.getAllReviewReports(this.currentPage)
        );
        break;
    }
  }

  fetchReports(service: Observable<PageDto<ReportDto>>) {
    service.subscribe({
      next: (data) => {
        this.reportsList = data.data;
        this.pagesCount = Math.ceil(data.count / 12);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
