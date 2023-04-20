import {Component, OnInit} from '@angular/core';
import {ProductsService} from 'src/app/Services/Products/products.service';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {ListItemDto} from '../../../Dtos/ListItemDto';

@Component({
  selector: 'app-unlisted-items',
  templateUrl: './unlisted-items.component.html',
  styleUrls: ['./unlisted-items.component.css'],
})
export class UnlistedItemsComponent implements OnInit {
  listedItems: ListItemDto[]|undefined = undefined;
  pagesCount: number = 0;
  currentPage: number = 1;
  orderBy: string = OrderByStrings.DateCreatedDesc
  searchText: string | undefined = undefined

  constructor(private readonly ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getUnListedItems()
  }

  protected readonly OrderByStrings = OrderByStrings;

  onOrderByChange(orderBy: OrderByStrings) {
    this.getUnListedItems(orderBy, this.searchText);
    this.orderBy = orderBy;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getUnListedItems(this.orderBy, this.searchText);
  }

  onSearchClick(searchText: string) {
    this.searchText = searchText
    this.getUnListedItems(this.orderBy, searchText);
  }

  getUnListedItems(orderBy?: string, searchText?: string) {
    this.ProductsService
      .GetUnListedItems(
        this.currentPage,
        orderBy ? orderBy : OrderByStrings.DateCreatedDesc.toString(),
        searchText
      )
      .subscribe
      (
        {
          next: (data) => {
            this.listedItems = data.data;
            this.pagesCount = Math.ceil(data.count/12)
          },
          error: (err) => console.log(err)
        }
      );
  }

  reListItem(id: string) {
    this.ProductsService.ReListItem(id).subscribe
    (
      {
        next: (data) => {
          console.log(data)
          if(data.statusCode == 204){
            this.getUnListedItems()
          }
          else{
            console.log(data.statusMessage)
          }
        },
        error: (err) => console.log(err)
      }
    );
  }

  deleteItem(id: string) {
    console.log(id)
    this.ProductsService.DeleteItem(id).subscribe
    (
      {
        next: (data) => {
          if(data.statusCode == 204){
            this.getUnListedItems()
          }
          else{
          }
        },
        error: (err) => console.log(err)
      }
    );
  }
}
