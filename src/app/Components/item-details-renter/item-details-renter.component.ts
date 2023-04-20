import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RenterItemDto } from 'src/app/Dtos/RenterItemDto';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-item-details-renter',
  templateUrl: './item-details-renter.component.html',
  styleUrls: ['./item-details-renter.component.css']
})
export class ItemDetailsRenterComponent {
  ID:any;
  Item:RenterItemDto | any;
  RatingStars:any;
  RestOfStars :any;
  image :any;
  blobUrl : any;

  constructor(activeRoute:ActivatedRoute, private myService:ProductsService)
  {
    this.ID = activeRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.myService.GetItemByIdForRenter(this.ID).subscribe({
      next:(data:RenterItemDto|any)=>{
        this.Item=data;
        console.log(data);
        console.log(this.Item.model);
        this.RatingStars = new Array(data.rating);
        this.RestOfStars = new Array(5-data.rating);
        this.image = 'data:image/png;base64,'+ data.image;
      },
      error:(err)=>{console.log(err)}
    })
  }

}
