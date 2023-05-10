import {TransactionStatus} from "./TransactionDetailsDto";

export class GetAllTransactionsDto
{
  constructor(
    public id: string,
    public paymentId: string,
    public date: string,
    public amount: number,
    public status: TransactionStatus
  )
  {
  }
}
