export class SubCategoryWithCategoryDto
{
  constructor(
    public id: string,
    public name: string,
    public icon: string,
    public categoryId:string,
    public categoryName:string,
  )
  {
  }
}
