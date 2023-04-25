import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportDto } from 'src/app/Dtos/Reports/ReportDto';
import { ChatReportDto } from 'src/app/Dtos/Reports/ChatReportDto';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/Reports`; //API

  getAllChatsReports(): Observable<ReportDto[]> {
    return this.httpClient.get<ReportDto[]>(`${this.baseUrl}/AllChatsReports`);
  }

  getAllReviewReports(): Observable<ReportDto[]> {
    return this.httpClient.get<ReportDto[]>(`${this.baseUrl}/AllReviewReports`);
  }

  getAllItemsReports(): Observable<ReportDto[]> {
    return this.httpClient.get<ReportDto[]>(`${this.baseUrl}/AllItemsReports`);
  }
}
