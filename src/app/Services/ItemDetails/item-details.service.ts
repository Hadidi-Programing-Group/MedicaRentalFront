import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerItemDto } from 'src/app/Dtos/SellerItemDto';
import { UpdateUserItemDto } from 'src/app/Dtos/UpdateUserItemDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {

  constructor(private readonly Client: HttpClient) { }

  private readonly URL = `${environment.apiURL}/api/Items/one`; //API

  UpdateItem(updatedData:UpdateUserItemDto) {
    return this.Client.put<UpdateUserItemDto>(this.URL,updatedData);
  }

}
