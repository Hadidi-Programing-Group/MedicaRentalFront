import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {BrandDto} from 'src/app/Dtos/Brand/BrandDto';
import {InsertBrandDto} from "../../Dtos/Brand/InsertBrandDto";
import {UpdateBrandDto} from "../../Dtos/Brand/UpdateBrandDto";
import {PageDto} from "../../Dtos/PageDto";

@Injectable({
  providedIn: 'root'
})
export class BrandsService
{

  constructor(private readonly httpClient: HttpClient)
  {
  }

  private readonly URL = `${environment.apiURL}/api/Brands`;

  GetAllBrands()
  {
    return this.httpClient.get<BrandDto[]>(this.URL);
  }

  GetAllBrandsPaged(page: number, searchText: string|null)
  {
    let params = new HttpParams()

    params = params.set('page', page)
    if(searchText)
      params = params.set('searchText', searchText)

    return this.httpClient.get<PageDto<BrandDto>>(`${this.URL}/paged`, {params});
  }

  InsertBrand(insertBrandDto: InsertBrandDto)
  {
    return this.httpClient.post(this.URL, insertBrandDto);
  }

  UpdateBrand(updateBrandDto: UpdateBrandDto)
  {
    return this.httpClient.put(this.URL, updateBrandDto);
  }


  DeleteBrandAsync(id: string)
  {
    return this.httpClient.delete(`${this.URL}/${id}`);
  }
}
