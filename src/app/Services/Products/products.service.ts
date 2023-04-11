import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly URL = 'https://api.escuelajs.co/api/v1/products'; //API

  GetAllProducts(offset = 0, limit = 12) {
    return this.httpClient.get(this.URL, {
      params: {
        offset: offset.toString(),
        limit: limit.toString(),
      },
    });
  }
}
