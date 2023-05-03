import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlockUserInfoDto } from 'src/app/Dtos/BlockUserInfoDto';
import { StatusDto } from 'src/app/Dtos/StatusDto';
import {
  UpdateApprovalInfoDto,
  UpdateProfileInfoDto,
  UserApprovalInfoDto,
  UserProfileInfoDto,
} from 'src/app/Dtos/UserProfileInfoDto';
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

  UpdateInfo(newData: UpdateProfileInfoDto) {
    return this.httpClient.put<StatusDto>(
      `${this.baseUrl}/UpdateInfo`,
      newData
    );
  }

  GetApprovalInfo(): Observable<UserApprovalInfoDto> {
    return this.httpClient.get<UserApprovalInfoDto>(
      `${this.baseUrl}/GetApprovalInfo`
    );
  }

  UpdateApprovalInfo(newData: UpdateApprovalInfoDto) {
    return this.httpClient.put<StatusDto>(
      `${this.baseUrl}/UpdateApprovalInfo`,
      newData
    );
  }

  BlockUser(blockUserInfo: BlockUserInfoDto) {
    return this.httpClient.post<StatusDto>(
      `${this.baseUrl}/BlockUser`,
      blockUserInfo
    );
  }
}
