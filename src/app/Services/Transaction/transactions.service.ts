import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetAllTransactionsDto} from "../../Dtos/Transactions/GetAllTransactionsDto";
import {PageDto} from "../../Dtos/PageDto";
import {TransactionDetailsDto} from "../../Dtos/Transactions/TransactionDetailsDto";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService
{
  constructor(private readonly httpClient: HttpClient)
  {
  }

  private readonly URL = `${environment.apiURL}/api/transactions`;

  GetAllTransactionsForClient(page: number)
  {
    let params = new HttpParams()
    params = params.set('page', page)

    return this.httpClient.get<PageDto<GetAllTransactionsDto>>(this.URL, {params})
  }

  GetTransactionDetails(id: string)
  {
    return this.httpClient.get<TransactionDetailsDto>(`${this.URL}/${id}`)
  }
}
