import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportDto } from 'src/app/Dtos/Reports/ReportDto';
import { DetailedReportDto } from 'src/app/Dtos/Reports/DetailedReportDto';
import { PageDto } from 'src/app/Dtos/PageDto';
import {InsertReportDto} from "../../Dtos/Reports/InsertReportDto";
import { StatusDto } from 'src/app/Dtos/StatusDto';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/Reports`; //API

  getAllChatsReports(page: number = 1): Observable<PageDto<ReportDto>> {
    let params = new HttpParams();
    params = params.set('page', page);
    return this.httpClient.get<PageDto<ReportDto>>(
      `${this.baseUrl}/AllChatsReports`,
      { params }
    );
  }

  getAllReviewReports(page: number = 1): Observable<PageDto<ReportDto>> {
    let params = new HttpParams();
    params = params.set('page', page);
    return this.httpClient.get<PageDto<ReportDto>>(
      `${this.baseUrl}/AllReviewReports`,
      { params }
    );
  }

  getAllItemsReports(page: number = 1): Observable<PageDto<ReportDto>> {
    let params = new HttpParams();
    params = params.set('page', page);
    return this.httpClient.get<PageDto<ReportDto>>(
      `${this.baseUrl}/AllItemsReports`,
      { params }
    );
  }

  getDetailedReport(reportId: string): Observable<DetailedReportDto> {
    return this.httpClient.get<DetailedReportDto>(
      `${this.baseUrl}/${reportId}`
    );
  }

  markAsSolved(Id: string): Observable<StatusDto> {
    return this.httpClient.post<StatusDto>(
      `${this.baseUrl}/MarkAsSolved/${Id}`,
      {}
    );
  }

  insertReport(report: InsertReportDto) {
    return this.httpClient.post(
      `${this.baseUrl}/InsertReport`,
      report
    );
  }
}
