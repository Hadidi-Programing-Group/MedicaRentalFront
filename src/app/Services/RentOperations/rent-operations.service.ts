import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HomeItemDto } from '../../Dtos/HomeItemDto';
import { RentOperationDto } from '../../Dtos/RentOperation/RentOperationDto';
import {PageDto} from "../../Dtos/PageDto";
import {InsertRentOperationDto} from "../../Dtos/RentOperation/InsertRentOperationDto";
import { GetRentedItemsDto } from 'src/app/Dtos/RentOperation/GetRentedItemsDto';

@Injectable({
  providedIn: 'root',
})
export class RentOperationsService {
  private baseUrl = `${environment.apiURL}/api/RentOperations`; //API

  constructor(private readonly httpClient: HttpClient) {}

  GetOnRentItems(page: number, orderBy?: string, searchText?: string|null) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<RentOperationDto>>(
      `${this.baseUrl}/OnRent`,
      { params }
    );
  }

  GetOnRentItemsHistory(page: number, orderBy?: string, searchText?: string|null) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<RentOperationDto>>(
      `${this.baseUrl}/OnRent/History`,
      { params }
    );
  }

  GetRentedItems(page: number, orderBy?: string, searchText?: string|null) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<RentOperationDto>>(
      `${this.baseUrl}/Rented`,
      { params }
    );
  }

  GetRentedItemsHistory(page: number, orderBy?: string, searchText?: string|null) {
    let params = new HttpParams();
    if (orderBy) {
      params = params.set('orderBy', orderBy);
    }

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<RentOperationDto>>(
      `${this.baseUrl}/Rented/History`,
      { params }
    );
  }

  GetIsRented(ItemId:string){
    return this.httpClient.get(this.baseUrl+`/isrented/`+ItemId)
  }

  InsertRentOperation(rentOperation: InsertRentOperationDto){
    return this.httpClient.post(this.baseUrl, rentOperation)
  }


  getToBeReturned(page: number) {
    let params = new HttpParams();
    if (page) {
      params = params.set('page', page);
    }
    return this.httpClient.get<PageDto<GetRentedItemsDto>>(`${this.baseUrl}/toBeReturned`, {params});
  }

  acceptReturn(rentOperationId: string){
    return this.httpClient.put(`${this.baseUrl}/acceptReturn/${rentOperationId}`, {});
  }
}
