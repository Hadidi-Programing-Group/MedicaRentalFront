import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly URL = 'https://fakestoreapi.com/products/'; //API

  GetAllProducts() {
    return this.httpClient.get(this.URL);
  }
}
