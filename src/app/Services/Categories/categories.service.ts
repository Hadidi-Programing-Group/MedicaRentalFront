import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {CategoryWithSubCategoriesDto} from "../../Dtos/Categories/CategoryWithSubCategoriesDto";
import {CategoryDto} from "../../Dtos/Categories/CategoryDto";
import {InsertCategoryDto} from "../../Dtos/Categories/InsertCategoryDto";
import {UpdateCategoryDto} from "../../Dtos/Categories/UpdateCategoryDto";
import {PageDto} from "../../Dtos/PageDto";

@Injectable({
  providedIn: 'root',
})
export class CategoriesService
{
  constructor(private readonly httpClient: HttpClient)
  {
  }

  private readonly URL = `${environment.apiURL}/api/categories`; //API

  GetAllWithSubCategories()
  {
    return this.httpClient.get<CategoryWithSubCategoriesDto[]>(`${this.URL}/withsub`);
  }

  GetAllCategoriesPaged(page: number, searchText?: string | null)
  {
    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText);
    }

    params = params.set('page', page);

    return this.httpClient.get<PageDto<CategoryDto>>(`${this.URL}/paged`, {params});
  }

  GetAllCategories()
  {
    return this.httpClient.get<CategoryDto[]>(`${this.URL}`);
  }



  GetCategoryWithSubCategories(id: string)
  {
    return this.httpClient.get<CategoryWithSubCategoriesDto>(`${this.URL}/${id}`);
  }

  InsertCategory(category: InsertCategoryDto)
  {
    return this.httpClient.post(`${this.URL}`, category);
  }

  UpdateCategory(category: UpdateCategoryDto)
  {
    return this.httpClient.put(`${this.URL}`, category);
  }

  DeleteCategoryAsync(id: string)
  {
    return this.httpClient.delete(`${this.URL}/${id}`);
  }
}
