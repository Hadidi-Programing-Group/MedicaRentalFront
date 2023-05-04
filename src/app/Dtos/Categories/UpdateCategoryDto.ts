export class UpdateCategoryDto
{
  constructor(
    public id: string,
    public name:string,
    public icon:string,
    public subCategories: string[]
  )
  {
  }
}
