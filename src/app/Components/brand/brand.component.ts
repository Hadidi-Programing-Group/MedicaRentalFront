import {Component, OnInit} from '@angular/core';
import {BrandDto} from 'src/app/Dtos/Brand/BrandDto';
import {BrandsService} from 'src/app/Services/Brands/brands.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  constructor(private readonly brandsService: BrandsService) {}
  scrollPosition = 0;
  randomId = crypto.randomUUID();
  ngAfterViewInit() {
    this.brandsService.GetAllBrands().subscribe({
      next: (data) => {
        this.Brands = data;
        setInterval(() => {
          const cardWidth: any = $(`#productCard${this.randomId}`).outerWidth(
            true
          );
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
      },
      error: (err) => {
        console.log(err);
      },
    });
    // Set the interval to move right every `intervalTime` milliseconds
  }

  currentPosition = 0;

  moveLeft() {
    const cardWidth: any = $(`#productCard${this.randomId}`).outerWidth(true);
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
    if (cardRow)
      cardRow.style.transform = `translateX(${this.currentPosition}px)`;
  }

  Brands?: BrandDto[];

  ngOnInit(): void {}
}
