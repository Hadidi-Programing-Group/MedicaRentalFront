import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeItemDto } from 'src/app/Dtos/HomeItemDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/Items`; //API

  GetAllItems(orderBy?: string): Observable<HomeItemDto[]> {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    return this.httpClient.get<HomeItemDto[]>(`${this.baseUrl}`, { params });
  }

  GetItemsByCategories(
    categoryIds: string[],
    orderBy?: string
  ): Observable<HomeItemDto[]> {
    let params = new HttpParams();
    if (categoryIds) {
      for (const categoryId of categoryIds) {
        params = params.append('categoryIds', categoryId.toString()); // Append each category ID
      }
    }
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    return this.httpClient.get<HomeItemDto[]>(`${this.baseUrl}/categories`, {
      params,
    });
  }

  GetItemsBySubCategories(
    subCategoryIds: string[],
    orderBy?: string
  ): Observable<HomeItemDto[]> {
    let params = new HttpParams();
    if (subCategoryIds) {
      for (const categoryId of subCategoryIds) {
        params = params.append('subCategoryIds', categoryId.toString()); // Append each category ID
      }
    }
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    return this.httpClient.get<HomeItemDto[]>(`${this.baseUrl}/subcategories`, {
      params,
    });
  }
}
