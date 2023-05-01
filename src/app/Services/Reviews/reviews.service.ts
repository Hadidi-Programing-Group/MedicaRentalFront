import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteReviewRequestDto } from 'src/app/Dtos/Reviews/DeleteReviewRequestDto';
import { ReviewsDto } from 'src/app/Dtos/ReviewsDto';
import { StatusDto } from 'src/app/Dtos/StatusDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  constructor(private client: HttpClient) {}
  public ErrorMsg: any;
  private readonly URL = `${environment.apiURL}/api/Reviews`;
  AddReview(UserReview: any) {
    return this.client.post(this.URL, UserReview);
  }

  DeleteReview(deleteReviewRequestDto: DeleteReviewRequestDto) {
    return this.client.post<StatusDto>(
      `${this.URL}/DeleteReview`,
      deleteReviewRequestDto
    );
  }
}
