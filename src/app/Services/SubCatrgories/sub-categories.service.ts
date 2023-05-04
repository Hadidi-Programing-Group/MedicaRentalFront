import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {InsertSubCategoryDto} from "../../Dtos/SubCategories/InsertSubCategoryDto";
import {UpdateSubCategoryDto} from "../../Dtos/SubCategories/UpdateSubCategoryDto";
import {SubCategoryWithCategoryDto} from "../../Dtos/SubCategories/SubCategoryWithCategoryDto";
import {PageDto} from "../../Dtos/PageDto";

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService
{
  constructor(private readonly httpClient: HttpClient)
  {
  }

  private readonly URL = `${environment.apiURL}/api/subCategories`;

  GetAllWithCategory(page: number, searchText?: string | null)
  {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);
    return this.httpClient.get<PageDto<SubCategoryWithCategoryDto>>(this.URL, {params});

  }

  GetSubcategoryById(id:string){
    return this.httpClient.get<SubCategoryWithCategoryDto>(`${this.URL}/${id}`);
  }

  InsertSubCategory(subcategory: InsertSubCategoryDto){
    return this.httpClient.post(this.URL, subcategory);
  }
  UpdateSubCategory(subcategory: UpdateSubCategoryDto){
    return this.httpClient.put(this.URL, subcategory);
  }

  DeleteSubCategory(id:string){
    return this.httpClient.delete(`${this.URL}/${id}`);
  }

}
