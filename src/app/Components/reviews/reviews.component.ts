import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input() reviews :any;
  RatingStars:any;
  RestOfStars :any;

  // ngOnInit(): void {
  //       console.log(this.reviews.length)
  //       for(let i=0;i<this.reviews.length;i++)
  //       {
  //         let revRatePos:any;
  //         let revRateNeg:any;
  //         revRatePos = new Array(this.reviews[i].rating);
  //         revRateNeg = new Array(5-this.reviews[i].rating);
  //         this.RatingStars.push(revRatePos);
  //         this.RestOfStars.push(revRateNeg);
  //         console.log(this.RatingStars)
  //         console.log(this.RestOfStars)
  //       }
  // }

  counter(NumToArray:number){
    let array = new Array(NumToArray);
    return array;
  }
}
