import {Component, OnInit} from '@angular/core';
import {ListItemDto} from "../../../Dtos/ListItemDto";
import {UserService} from "../../../Services/User/user.service";
import {Router} from "@angular/router";
import {GetAllTransactionsDto} from "../../../Dtos/Transactions/GetAllTransactionsDto";
import {TransactionsService} from "../../../Services/Transaction/transactions.service";
import {DateHelper} from "../../../Helpers/DateHelper";
import {TransactionStatus} from "../../../Dtos/Transactions/TransactionDetailsDto";

@Component({
  selector: 'app-ads-orders',
  templateUrl: './ads-orders.component.html',
  styleUrls: ['./ads-orders.component.css']
})
export class AdsOrdersComponent implements OnInit
{
  transactions: GetAllTransactionsDto[] | undefined = undefined;
  pagesCount: number = 0;
  currentPage: number = 1;

  constructor(
    private readonly transactionsService: TransactionsService
  )
  {
  }

  ngOnInit(): void
  {
    this.getTransactions();
  }

  onPageChanged(page: number)
  {
    this.currentPage = page;
    this.getTransactions();
  }

  getTransactions()
  {
    this.transactionsService.GetAllTransactionsForClient(this.currentPage)
      .subscribe({
      next: (data) =>
      {
        this.transactions = data.data;
        this.pagesCount = Math.ceil(data.count / 12);
      },
      error: (err) => console.log(err),
    });
  }

  details(id: string)
  {

  }

  protected readonly undefined = undefined;
  protected readonly DateHelper = DateHelper;
  protected readonly TransactionStatus = TransactionStatus;
}

