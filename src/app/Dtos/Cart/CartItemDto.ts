export class CartItemDto {
  constructor(
    public id: string,
    public itemId: string,
    public name: string,
    public model: string,
    public pricePerDay: number,
    public image: string,
    public numberOfDays: number
  ) {}
}
