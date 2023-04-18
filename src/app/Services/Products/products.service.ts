import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeItemDto } from 'src/app/Dtos/HomeItemDto';
import { PageDto } from 'src/app/Dtos/PageDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/Items`; //API

  GetAllItems(
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    params = params.set('page', page);
    return this.httpClient.get<PageDto<HomeItemDto>>(`${this.baseUrl}`, {
      params,
    });
  }

  GetItemsByCategories(
    categoryIds: string[],
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    let params = new HttpParams();
    if (categoryIds) {
      for (const categoryId of categoryIds) {
        params = params.append('categoryIds', categoryId.toString()); // Append each category ID
      }
    }
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    params = params.set('page', page);
    return this.httpClient.get<PageDto<HomeItemDto>>(
      `${this.baseUrl}/categories`,
      {
        params,
      }
    );
  }

  GetItemsBySubCategories(
    subCategoryIds: string[],
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    let params = new HttpParams();
    if (subCategoryIds) {
      for (const categoryId of subCategoryIds) {
        params = params.append('subCategoryIds', categoryId.toString()); // Append each category ID
      }
    }
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    params = params.set('page', page);

    return this.httpClient.get<PageDto<HomeItemDto>>(
      `${this.baseUrl}/subcategories`,
      {
        params,
      }
    );
  }
}
