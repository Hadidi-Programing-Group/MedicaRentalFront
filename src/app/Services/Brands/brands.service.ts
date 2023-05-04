import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BrandDto } from 'src/app/Dtos/Brand/BrandDto';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private readonly httpClient: HttpClient) { }

  private readonly URL = `${environment.apiURL}/api/Brands`; //API

  GetAllBrands() {
    return this.httpClient.get<BrandDto[]>(this.URL);
  }
}
