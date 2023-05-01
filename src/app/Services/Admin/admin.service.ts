import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusDto } from 'src/app/Dtos/StatusDto';

import {
  // UpdateApprovalInfoDto,
  // UpdateProfileInfoDto,
  // UserApprovalInfoDto,
  UserApprovalInfoWithIdDto,
  UserProfileInfoWithIdDto
} from 'src/app/Dtos/AdminDto';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly httpClient: HttpClient) { }

  private baseUrl = `${environment.apiURL}/api/Users`;

  clientsNeedingApproval():Observable<UserProfileInfoWithIdDto[]>{

    return this.httpClient.get<UserProfileInfoWithIdDto[]>(
      `${this.baseUrl}/clientsNeedingApproval`
    );

  }

  GetClientApprovalInfoWithId(id:string):Observable<UserApprovalInfoWithIdDto>{

    return this.httpClient.get<UserApprovalInfoWithIdDto>(
      `${this.baseUrl}/GetClientApprovalInfoWithId/${id}`
    );
  }

  GetClientInfoWithId(id:string):Observable<UserProfileInfoWithIdDto>{

    return this.httpClient.get<UserProfileInfoWithIdDto>(
      `${this.baseUrl}/GetInfo/${id}`
    );
  }





}
