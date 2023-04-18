export class ListItemDto {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public stock: number,
    public categoryName: string,
    public subCategoryName: string,
    public rating: number
  ) {}
}
