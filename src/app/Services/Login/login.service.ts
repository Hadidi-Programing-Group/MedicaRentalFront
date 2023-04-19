import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient) { }

  isAuthenticatedChanged = new EventEmitter<boolean>();

  isAuthenticated = false;

  public ErrorMsg: any;
  private readonly URL = `${environment.apiURL}/Login`; //API
  LoginUser(UserData: any) {
  return this.client.post(this.URL, UserData);
  }
}




