import {EventEmitter, Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {catchError} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService
{
  private token: string = '';

  constructor(private client: HttpClient)
  {
  }

  isAuthenticatedChanged = new EventEmitter<boolean>();

  isAuthenticated = false;

  public ErrorMsg: any;
  private readonly URL = `${environment.apiURL}`; //API
  LoginUser(UserData: any)
  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    });

    // Set withCredentials to true to send cookies with the request
    const options = {headers, withCredentials: true};

    // Make the POST request with userData and options
    return this.client.post(`${this.URL}/Login`, UserData, options);
  }

  revokeToken()
  {
    localStorage.setItem('authToken', '');
    localStorage.setItem('authTokenExpDate', '');
    localStorage.setItem('isAuthenticated', '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any additional headers as needed
    });

    // Set withCredentials to true to send cookies with the request
    const options = {headers, withCredentials: true};

    // Make the POST request with userData and options
    //return this.client.post(`${this.URL}/revokeToken`,{}, options);
  }
}
