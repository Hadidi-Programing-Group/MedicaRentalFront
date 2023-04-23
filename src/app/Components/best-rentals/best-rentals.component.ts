import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-best-rentals',
  templateUrl: './best-rentals.component.html',
  styleUrls: ['./best-rentals.component.css'],
})
export class BestRentalsComponent implements OnInit {
  constructor(private readonly ProductsService: ProductsService) {}

  Products: any;
  ngOnInit(): void {
    this.ProductsService.GetAllItems().subscribe({
      next: (data) => {
        this.Products = data["data"];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
