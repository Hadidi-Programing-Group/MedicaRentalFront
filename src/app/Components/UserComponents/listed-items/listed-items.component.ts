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
  listedItems: ListItemDto[] = [];
  totalCount: number = 0;
  constructor(private readonly ProductsService: ProductsService) {
  }

  ngOnInit(): void {
    this.ProductsService
      .GetListItems(
        1,
        OrderByStrings.DateCreatedDesc.toString()
      )
      .subscribe
      (
        {
          next: (data)=>{
            this.listedItems = data.data;
            console.log(data)
            this.totalCount = data.count
            },
          error: (err) => console.log(err)
        }
      );
  }
}
