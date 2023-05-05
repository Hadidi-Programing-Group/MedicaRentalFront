export class InsertRentOperationDto
{
  constructor(
    public rentDate:string,
    public returnDate:string,
    public price:number,
    public clientId:string,
    public sellerId:string,
    public itemId:string
  )
  {
  }
}
