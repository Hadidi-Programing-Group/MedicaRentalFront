import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeItemDto } from 'src/app/Dtos/HomeItemDto';
import { ListItemDto } from '../../Dtos/ListItemDto';
import { PageDto } from 'src/app/Dtos/PageDto';
import { environment } from 'src/environments/environment';
import { StatusDto } from '../../Dtos/StatusDto';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  private baseUrl = `${environment.apiURL}/api/Items`; //API

  //#region To Be Deleted
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

  GetItemsBySearch(
    searchText: string,
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }
    params = params.set('searchText', searchText);
    params = params.set('page', page);

    return this.httpClient.get<PageDto<HomeItemDto>>(`${this.baseUrl}/search`, {
      params,
    });
  }
  //#endregion

  GetItems(
    categoryIds: string[],
    subCategoryIds: string[],
    brandIds: string[],
    searchText: string,
    page: number = 1,
    orderBy?: string
  ): Observable<PageDto<HomeItemDto>> {
    let params = new HttpParams();
    if (orderBy) params = params.set('orderBy', orderBy);
    if (searchText) params = params.set('searchText', searchText);

    params = params.set('page', page);

    if (categoryIds)
      for (const category of categoryIds)
        params = params.append('categories', category);

    if (subCategoryIds)
      for (const subcategory of subCategoryIds)
        params = params.append('subCategories', subcategory);

    if (brandIds)
      for (const brand of brandIds) params = params.append('brands', brand);

    return this.httpClient.get<PageDto<HomeItemDto>>(`${this.baseUrl}/`, {
      params,
    });
  }

  GetListedItems(
    page: number,
    orderBy?: string,
    searchText?: string
  ): Observable<PageDto<ListItemDto>> {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<ListItemDto>>(`${this.baseUrl}/listed`, {
      params,
    });
  }

  GetItemByIdForRenter(id: string) {
    return this.httpClient.get(this.baseUrl + '/forrenter/' + id);
  }

  GetUnListedItems(
    page: number,
    orderBy?: string,
    searchText?: string
  ): Observable<PageDto<ListItemDto>> {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<ListItemDto>>(
      `${this.baseUrl}/unlisted`,
      {
        params,
      }
    );
  }

  UnListItem(itemId: string): Observable<StatusDto> {
    return this.httpClient.put<StatusDto>(
      `${this.baseUrl}/unlist/${itemId}`,
      {}
    );
  }

  ReListItem(itemId: string): Observable<StatusDto> {
    return this.httpClient.put<StatusDto>(
      `${this.baseUrl}/relist/${itemId}`,
      {}
    );
  }

  DeleteItem(itemId: string) {
    let params = new HttpParams();
    params = params.set('id', itemId);
    console.log(itemId);
    return this.httpClient.delete<StatusDto>(`${this.baseUrl}/one`, { params });
  }
}
