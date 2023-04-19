import {Component, OnInit} from '@angular/core';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {RentOperationDto} from "../../../Dtos/RentOperation/RentOperationDto";
import {RentOperationsService} from "../../../Services/RentOperations/rent-operations.service";

@Component({
  selector: 'app-rented-items',
  templateUrl: './rented-items.component.html',
  styleUrls: ['./rented-items.component.css'],
})
export class RentedItemsComponent implements OnInit {
  rentOperations: RentOperationDto[]|undefined = undefined;
  pagesCount: number = 0;
  currentPage: number = 1;
  orderBy: string = OrderByStrings.DateCreatedDesc
  searchText: string | undefined = undefined

  constructor(private readonly RentOperationsService: RentOperationsService) {
  }

  ngOnInit(): void {
    this.getListedItems()
  }

  protected readonly OrderByStrings = OrderByStrings;

  onOrderByChange(orderBy: OrderByStrings) {
    this.getListedItems(orderBy, this.searchText);
    this.orderBy = orderBy;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getListedItems(this.orderBy, this.searchText);
  }

  onSearchClick(searchText: string) {
    this.searchText = searchText
    this.getListedItems(this.orderBy, searchText);
  }

  getListedItems(orderBy?: string, searchText?: string) {
    this.RentOperationsService
      .GetRentedItems(
        this.currentPage,
        orderBy ? orderBy : OrderByStrings.DateCreatedDesc.toString(),
        searchText
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
}
