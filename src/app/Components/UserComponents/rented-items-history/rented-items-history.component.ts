import {Component, OnInit} from '@angular/core';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {RentOperationDto} from "../../../Dtos/RentOperation/RentOperationDto";
import {RentOperationsService} from "../../../Services/RentOperations/rent-operations.service";
import {DateHelper} from "../../../Dtos/DateHelper";

@Component({
  selector: 'app-rented-items-history',
  templateUrl: './rented-items-history.component.html',
  styleUrls: ['./rented-items-history.component.css'],
})
export class RentedItemsHistoryComponent implements OnInit {
  rentOperations: RentOperationDto[]|undefined = undefined;
  pagesCount: number = 0;
  currentPage: number = 1;
  orderBy: string = OrderByStrings.RentDateDesc
  searchText: string | null = null

  constructor(private readonly RentOperationsService: RentOperationsService) {
  }

  ngOnInit(): void {
    this.getListedItems()
  }

  protected readonly OrderByStrings = OrderByStrings;

  onOrderByChange(orderBy: OrderByStrings) {
    this.getListedItems();
    this.orderBy = orderBy;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getListedItems();
  }

  onSearchClick(searchText: string) {
    this.searchText = searchText == ""? null : searchText
    this.getListedItems();
  }

  getListedItems() {
    this.RentOperationsService
      .GetRentedItemsHistory(
        this.currentPage,
        this.orderBy,
        this.searchText
      )
      .subscribe
      (
        {
          next: (data) => {
            this.rentOperations = data.data;
            this.pagesCount = Math.ceil(data.count/12)
          },
          error: (err) => console.log(err)
        }
      );
  }

  protected readonly DateHelper = DateHelper;
}

