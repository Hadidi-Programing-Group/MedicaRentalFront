import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  OnInit, Output,
  ViewChild,
} from '@angular/core';
import { ProductsService } from 'src/app/Services/Products/products.service';
import * as $ from 'jquery';
import { HomeItemDto } from 'src/app/Dtos/HomeItemDto';

@Component({
  selector: 'app-best-rentals',
  templateUrl: './best-rentals.component.html',
  styleUrls: ['./best-rentals.component.css'],
})
export class BestRentalsComponent implements OnInit, AfterViewInit {
  constructor(private readonly ProductsService: ProductsService) {}
  scrollPosition = 0;
  randomId = crypto.randomUUID();

  @Output() show = new EventEmitter()

  ngAfterViewInit() {
    // Set the interval to move right every `intervalTime` milliseconds
    setInterval(() => {
      const cardWidth: any = $(`#productCard${this.randomId}`).outerWidth(true);
      const cardRow: any = $(`#cardRow${this.randomId}`).outerWidth(true);
      this.scrollPosition += cardWidth;
      $(`#cardRow${this.randomId}`).animate(
        { scrollLeft: this.scrollPosition },
        500,
        () => {
          // When the animation completes, check if we've scrolled past the last card
          if (
            $(`#cardRow${this.randomId}`)[0] &&
            this.scrollPosition >=
              $(`#cardRow${this.randomId}`)[0].scrollWidth - cardRow
          ) {
            // If we have, scroll back to the first card
            this.scrollPosition = 0;
            $(`#cardRow${this.randomId}`).animate(
              { scrollLeft: this.scrollPosition },
              500
            );
          }
        }
      );
    }, 2000);
  }

  currentPosition = 0;
  cardWidth: number = 0;

  moveLeft() {
    const cardWidth: any = $(`#productCard${this.randomId}`).outerWidth(true);
    console.log(cardWidth);
    this.scrollPosition -= cardWidth;
    $(`#cardRow${this.randomId}`).animate({ scrollLeft: '-=' + cardWidth });
    this.updateCardRow();
  }

  moveRight() {
    const cardWidth: any = $(`#productCard${this.randomId}`).outerWidth(true);
    this.scrollPosition += cardWidth;
    $(`#cardRow${this.randomId}`).animate({ scrollLeft: '+=' + cardWidth });
    this.updateCardRow();
  }

  updateCardRow() {
    const cardRow: any = document.getElementById(`#cardRow${this.randomId}`);
    if(cardRow)
    cardRow.style.transform = `translateX(${this.currentPosition}px)`;
  }

  Products?: HomeItemDto[];

  ngOnInit(): void {
    this.ProductsService.GetAllAdsAsync().subscribe({
      next: (data) => {
        this.Products = data.data;
        this.show.emit(this.Products.length > 0)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
