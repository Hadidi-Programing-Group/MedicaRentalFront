import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly URL = 'https://api.escuelajs.co/api/v1/categories'; //API

  GetAllCategories() {
    return this.httpClient.get(this.URL);
  }
}
