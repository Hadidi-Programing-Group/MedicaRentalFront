import {Component, OnInit} from '@angular/core';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {RentOperationDto} from "../../../Dtos/RentOperation/RentOperationDto";
import {RentOperationsService} from "../../../Services/RentOperations/rent-operations.service";

@Component({
  selector: 'app-on-rent-items',
  templateUrl: './on-rent-items.component.html',
  styleUrls: ['./on-rent-items.component.css'],
})
export class OnRentItemsComponent implements OnInit {
  rentOperations: RentOperationDto[] | undefined = undefined;
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
    this.searchText = searchText
    this.getListedItems();
  }

  getListedItems() {
    this.RentOperationsService
      .GetOnRentItems(
        this.currentPage,
        this.orderBy,
        this.searchText
      )
      .subscribe
      (
        {
          next: (data) => {
            this.rentOperations = data.data;
            this.pagesCount = Math.ceil(data.count / 12)
            console.log(typeof data.data[0].returnDate)
          },
          error: (err) => console.log(err)
        }
      );
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US');
  }
}

