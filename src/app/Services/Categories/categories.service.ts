import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly URL = `${environment.apiURL}/api/categories`; //API

  GetAllCategories() {
    return this.httpClient.get(this.URL);
  }
}
