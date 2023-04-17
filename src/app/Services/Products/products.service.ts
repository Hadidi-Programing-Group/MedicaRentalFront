import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly URL = 'http://localhost:3000/ItemsList'; //API

  GetAllProducts(offset = 0, limit = 12, categoryIds: any = null) {
    let options = new HttpParams();

    options = options.set('offset', offset.toString());
    options = options.set('limit', limit.toString());

    // If categoryIds is an array (multiple selected categories)
    if (Array.isArray(categoryIds)) {
      // Loop through the array and add each category ID as a separate parameter
      for (const categoryId of categoryIds) {
        options = options.append('CategoryId', categoryId.toString()); // Append each category ID
      }
    } else if (categoryIds > 0) {
      // If categoryIds is a single category ID
      options = options.set('CategoryId', categoryIds.toString()); // Pass single category ID
    }

    return this.httpClient.get(this.URL, { params: options });
  }

  GetProductsByCategory(offset = 0, limit = 12) {
    return this.httpClient.get(this.URL, {
      params: {
        offset: offset.toString(),
        limit: limit.toString(),
      },
    });
  }
}
