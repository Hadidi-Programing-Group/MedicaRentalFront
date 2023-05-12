import {Component, OnInit} from '@angular/core';
import {OrderByStrings} from '../../../Dtos/OrderByStrings';
import {RentOperationDto} from "../../../Dtos/RentOperation/RentOperationDto";
import {RentOperationsService} from "../../../Services/RentOperations/rent-operations.service";
import {DateHelper} from "../../../Helpers/DateHelper";
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ReviewsService} from 'src/app/Services/Reviews/reviews.service';

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
  reviewForm: FormGroup;
  ItemId: any;

  constructor(private readonly RentOperationsService: RentOperationsService, private fb: FormBuilder,private ReviewSerivce: ReviewsService) {
    this.reviewForm = this.fb.group({
      radioControl: new FormControl(),
      review: [''],
    });
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

  GetItemId(id:any){
    this.ItemId = id;
  }

  onSubmit() {
    // const ratingValue = this.reviewForm.get('radioControl')?.value;
    // const reviewValue = this.reviewForm.get('review')?.value;
    const UserRev = {
      rating: parseInt(this.reviewForm.get('radioControl')?.value),
      isDeleted: false,
      clientReview: this.reviewForm.get('review')?.value,
      itemId: this.ItemId,
    };
    this.ReviewSerivce.AddReview(UserRev).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  protected readonly DateHelper = DateHelper;
}

