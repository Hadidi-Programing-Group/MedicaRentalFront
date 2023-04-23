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
  searchText: null | string = null

  constructor(private readonly ProductsService: ProductsService) {
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
    this.ProductsService
      .GetListedItems(
        this.currentPage,
        this.orderBy,
        this.searchText
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
