export  class TransactionItemDto
{
  constructor(
    public itemId: string,
    public endDate: string,
    public numberOfDays: number,
    public itemName: string
  )
  {
  }
}
