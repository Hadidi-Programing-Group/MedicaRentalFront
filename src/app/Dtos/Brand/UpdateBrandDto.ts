export class UpdateBrandDto
{
  constructor(
    public id: string,
    public name:string,
    public countryOfOrigin: string,
    public image: string
  )
  {
  }
}
