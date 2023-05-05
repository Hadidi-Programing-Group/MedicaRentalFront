export class GetRentedItemsDto {
  constructor(
   public id: string,
   public rentDate: string,
   public returnDate: string,
   public price: number,
   public userId: string,
   public userName: string,
   public itemId: string,
   public itemName: string
  ) {}
}
