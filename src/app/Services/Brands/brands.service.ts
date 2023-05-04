import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private readonly httpClient: HttpClient) { }

  private readonly URL = `${environment.apiURL}/api/Brands`; //API

  GetAllBrands() {
    return this.httpClient.get(this.URL);
  }
}
