import {SubCategoryWithCategoryDto} from "../SubCategories/SubCategoryWithCategoryDto";

export class CategoryWithSubCategoriesDto
{
  constructor(
    public id: string,
    public name:string,
    public icon:string,
    public subCategories: SubCategoryWithCategoryDto[]
  )
  {
  }
}
