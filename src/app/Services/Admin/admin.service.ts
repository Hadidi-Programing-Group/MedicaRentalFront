import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusDto } from 'src/app/Dtos/StatusDto';

import {
  // UpdateApprovalInfoDto,
  // UpdateProfileInfoDto,
  // UserApprovalInfoDto,
  RoleMangerUserInfoDto,
  UpdateApprovalInfoDto,
  UserApprovalInfoWithIdDto,
  UserProfileInfoWithIdDto,
  UpdateUserRoleDto
} from 'src/app/Dtos/AdminDto';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly httpClient: HttpClient) { }

  private baseUrl = `${environment.apiURL}/api/Users`;


  GetAllAdminMod():Observable<RoleMangerUserInfoDto[]>{

    return this.httpClient.get<RoleMangerUserInfoDto[]>(
      `${environment.apiURL}/api/Admins/GetAllAdminMod`
    );

  }

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

  ApproveUser(email:string){

    const url = `${this.baseUrl}/ApproveUser?Email=${email}`;
    return this.httpClient.post<string>(url, {});
  }

  RejectUser(id: string, nationalInfo: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/UpdateApprovalInfo/${id}`, nationalInfo);
  }


 UpdateUserRole(updateRole:UpdateUserRoleDto): Observable<any> {
    return this.httpClient.post(`${environment.apiURL}/api/Admins/UpdateUserRole`, updateRole);
  }


}
