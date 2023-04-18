import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HomeItemDto } from '../../Dtos/HomeItemDto';
import { RentOperationDto } from '../../Dtos/RentOperation/RentOperationDto';

@Injectable({
  providedIn: 'root',
})
export class RentOperationsService {
  private baseUrl = `${environment.apiURL}/api/RentOperations`; //API

  constructor(private readonly httpClient: HttpClient) {}

  GetOnRentItems(userId: string, page: number, orderBy?: string) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    params = params.set('page', page);
    return this.httpClient.get<RentOperationDto[]>(
      `${this.baseUrl}/OnRent/${userId}`,
      { params }
    );
  }

  GetOnRentItemsHistory(userId: string, page: number, orderBy?: string) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    params = params.set('page', page);
    return this.httpClient.get<RentOperationDto[]>(
      `${this.baseUrl}/OnRent/History/${userId}`,
      { params }
    );
  }

  GetRentedItems(userId: string, page: number, orderBy?: string) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    params = params.set('page', page);
    return this.httpClient.get<RentOperationDto[]>(
      `${this.baseUrl}/Rented/${userId}`,
      { params }
    );
  }

  GetRentedItemsHistory(userId: string, page: number, orderBy?: string) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    params = params.set('page', page);
    return this.httpClient.get<RentOperationDto[]>(
      `${this.baseUrl}/Rented/History/${userId}`,
      { params }
    );
  }
}
