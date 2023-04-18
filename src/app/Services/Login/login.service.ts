import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient) { }
  public ErrorMsg: any;
  private readonly URL = `${environment.apiURL}/Login`; //API
  LoginUser(UserData: any) {
  return this.client.post(this.URL, UserData);
  }
}




