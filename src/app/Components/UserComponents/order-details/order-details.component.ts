import {Component, OnInit} from '@angular/core';
import {ListItemDto} from "../../../Dtos/ListItemDto";
import {UserService} from "../../../Services/User/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionsService} from "../../../Services/Transaction/transactions.service";
import {TransactionDetailsDto, TransactionStatus} from "../../../Dtos/Transactions/TransactionDetailsDto";
import {TransactionItemDto} from "../../../Dtos/Transactions/TransactionItemDto";
import {DateHelper} from "../../../Helpers/DateHelper";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit
{
  pagesCount: number = 0;
  currentPage: number = 1;
  transactionId = ''
  transaction : TransactionDetailsDto|null = null
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly usersService: UserService,
    private activatedRoute: ActivatedRoute
  )
  {
  }

  ngOnInit(): void
  {
    this.activatedRoute.params.subscribe((params) => this.transactionId = params['id'])
    this.getItems();
  }

  getItems()
  {
    this.transactionsService.GetTransactionDetails(this.transactionId)
      .subscribe({
      next: (data) =>
      {
        this.transaction = data;
      },
      error: (err) => console.log(err),
    });
  }

  protected readonly TransactionStatus = TransactionStatus;
  protected readonly DateHelper = DateHelper;
}
