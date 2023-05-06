export class UpdateSubCategoryDto
{
  constructor(
    public id:string,
    public name:string,
    public icon:string,
    public categoryId:string
  )
  {
  }
}
