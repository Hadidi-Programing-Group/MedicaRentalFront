import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private client: HttpClient) {}
  public ErrorMsg: any;

  private readonly URL = `${environment.apiURL}/Register`; //API

  RegisterUser(UserData: any) {
    return this.client.post(this.URL, UserData);
  }
}
