import {Component, OnInit} from '@angular/core';
import {ProductsService} from 'src/app/Services/Products/products.service';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {ListItemDto} from '../../../Dtos/ListItemDto';

@Component({
  selector: 'app-listed-items',
  templateUrl: './listed-items.component.html',
  styleUrls: ['./listed-items.component.css'],
})
export class ListedItemsComponent implements OnInit {
  listedItems: ListItemDto[]|undefined = undefined;
  pagesCount: number = 0;
  currentPage: number = 1;
  orderBy: string = OrderByStrings.DateCreatedDesc
  searchText: string | undefined = undefined

  constructor(private readonly ProductsService: ProductsService) {
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
    this.ProductsService
      .GetListedItems(
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

  unListItem(id: string) {
    this.ProductsService.UnListItem(id).subscribe
    (
      {
        next: (data) => {
          if(data.statusCode == 204){
            this.getListedItems();
          }
          else{
            console.log(data.statusMessage)
          }
        },
        error: (err) => console.log(err)
      }
    );
  }
}
