import {TransactionItemDto} from "./TransactionItemDto";

export enum TransactionStatus
{
  Success, Pending, Failed
}

export class TransactionDetailsDto
{
  constructor(
    public id:string,
    public paymentId: string,
    public date: string,
    public amount: number,
    public status: TransactionStatus,
    public transactionItems: TransactionItemDto[]
  )
  {
  }
}
