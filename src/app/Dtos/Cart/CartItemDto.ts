export class CartItemDto {
  constructor(
    public id: string,
    public itemId: string,
    public name: string,
    public model: string,
    public price: number,
    public image: string
  ) {}
}
