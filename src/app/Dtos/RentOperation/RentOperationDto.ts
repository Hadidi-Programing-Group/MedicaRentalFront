export class RentOperationDto {
  constructor(
    public id: string,
    public rentDate: Date,
    public returnDate: Date,
    public price: number,
    public userId: string,
    public userName: string,
    public itemId: string,
    public itemName: string,
    public reviewId: string,
    public rating: number
  ) {}
}
