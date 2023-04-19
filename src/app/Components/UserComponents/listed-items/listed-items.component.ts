import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from 'src/app/Services/Products/products.service';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {ListItemDto} from '../../../Dtos/ListItemDto';

@Component({
  selector: 'app-listed-items',
  templateUrl: './listed-items.component.html',
  styleUrls: ['./listed-items.component.css'],
})
export class ListedItemsComponent implements OnInit {
  listedItems: ListItemDto[] = [];
  totalCount: number = 0;
  @ViewChild('dateDesc') currentOrder: any

  constructor(private readonly ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getListedItems()
  }

  protected readonly OrderByStrings = OrderByStrings;

  orderBy(event:any, orderBy: OrderByStrings) {
    this.getListedItems(orderBy);

  }

  getListedItems(orderBy?: string){
    this.ProductsService
      .GetListItems(
        1,
        orderBy? orderBy : OrderByStrings.DateCreatedDesc.toString()
      )
      .subscribe
      (
        {
          next: (data)=>{
            this.listedItems = data.data;
            this.totalCount = data.count
          },
          error: (err) => console.log(err)
        }
      );
  }
}
