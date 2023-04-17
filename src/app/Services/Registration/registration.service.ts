import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private client: HttpClient) {}
  RegisterUser(UserData: any) {
    return this.client.post('https://localhost:7273/Register', UserData);
  }
}
