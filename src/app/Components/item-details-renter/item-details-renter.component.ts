import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { RenterItemDto } from 'src/app/Dtos/RenterItemDto';
import { ReviewsDto } from 'src/app/Dtos/ReviewsDto';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { RentOperationsService } from 'src/app/Services/RentOperations/rent-operations.service';
import { ReviewsService } from 'src/app/Services/Reviews/reviews.service';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-item-details-renter',
  templateUrl: './item-details-renter.component.html',
  styleUrls: ['./item-details-renter.component.css'],
})
export class ItemDetailsRenterComponent implements OnInit {
  ID: any;
  Item: RenterItemDto | any;
  review: ReviewsDto | any;
  RatingStars: any;
  RestOfStars: any;
  image: any;
  blobUrl: any;
  ShowRatingBtn: Boolean = true;
  reviewForm: FormGroup;
  @ViewChild(ReviewsComponent, { static: false })
  reviewComponent!: ReviewsComponent;
  IsOwner: boolean = false;

  constructor(
    private fb: FormBuilder,
    activeRoute: ActivatedRoute,
    private myService: ProductsService,
    private renService: RentOperationsService,
    private ReviewSerivce: ReviewsService,
    private router: Router
  ) {
    this.ID = activeRoute.snapshot.params['id'];
    this.reviewForm = this.fb.group({
      radioControl: new FormControl(),
      review: [''],
    });
  }

  ngOnInit(): void {
    this.myService.GetItemByIdForRenter(this.ID).subscribe({
      next: (data: RenterItemDto | any) => {
        this.Item = data;
        this.RatingStars = new Array(data.rating);
        this.RestOfStars = new Array(5 - data.rating);
        this.image = 'data:image/png;base64,' + data.image;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.renService.GetIsRented(this.ID).subscribe({
      next: (data: any) => {
        if (data.isRented == false) this.ShowRatingBtn = false;
      },
    });

    this.myService.GetIfItemOwner(this.ID).subscribe({
      next: (data: any) => {
        this.IsOwner = data['isOwner'];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const ratingValue = this.reviewForm.get('radioControl')?.value;
    const reviewValue = this.reviewForm.get('review')?.value;
    const UserRev = {
      rating: parseInt(this.reviewForm.get('radioControl')?.value),
      isDeleted: false,
      clientReview: this.reviewForm.get('review')?.value,
      itemId: this.ID,
    };
    this.ReviewSerivce.AddReview(UserRev).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  UpdateItem() {
    let URL = 'products/forseller/' + this.ID;
    this.router.navigate([URL]);
  }
}
