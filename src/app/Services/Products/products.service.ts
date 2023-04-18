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

  private getItems(
    endpoint: string,
    ids: string[],
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    let params = new HttpParams();
    if (ids) {
      for (const id of ids) {
        params = params.append(
          `${endpoint === 'categories' ? 'category' : 'subcategory'}Ids`,
          id
        ); // Append each ID
      }
    }
    if (orderBy) {
      console.log(orderBy);
      params = params.set('orderBy', orderBy);
    }
    params = params.set('page', page);
    return this.httpClient.get<PageDto<HomeItemDto>>(
      `${this.baseUrl}/${endpoint}`,
      {
        params,
      }
    );
  }

  GetAllItems(
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    return this.getItems('', [], page, orderBy);
  }

  GetItemsByCategories(
    categoryIds: string[],
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    return this.getItems('categories', categoryIds, page, orderBy);
  }

  GetItemsBySubCategories(
    subCategoryIds: string[],
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    return this.getItems('subcategories', subCategoryIds, page, orderBy);
  }
}
