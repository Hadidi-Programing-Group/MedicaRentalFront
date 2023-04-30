export class InsertReportDto
{
  constructor(
  public name: string,
  public statement: string,
  public reportedId: string,
  public messageId: string|null,
  public reviewId: string|null,
  public itemId: string|null){}
}
