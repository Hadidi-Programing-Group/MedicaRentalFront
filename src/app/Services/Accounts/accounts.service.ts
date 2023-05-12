import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {UserBasicInfoDto} from "../../Dtos/UserBasicInfoDto";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private readonly httpClient: HttpClient) { }

  private readonly URL = `${environment.apiURL}/api/Accounts`; //API


  GetInfoByEmail(email:string) {
    let params = new HttpParams();
    params = params.set('email', email);
    return this.httpClient.get<UserBasicInfoDto>(`${this.URL}/basicInfo`,{params});
  }
}
