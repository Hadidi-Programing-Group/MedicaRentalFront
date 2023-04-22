import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileInfoDto } from 'src/app/Dtos/UserProfileInfoDto ';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/Users`; //API

  GetInfo(): Observable<UserProfileInfoDto> {
    return this.httpClient.get<UserProfileInfoDto>(`${this.baseUrl}/GetInfo`);
  }
}
