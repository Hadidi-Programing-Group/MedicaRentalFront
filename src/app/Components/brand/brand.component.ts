import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  constructor(private readonly ProductsService: ProductsService) {}

  Products: any;
  ngOnInit(): void {
    this.ProductsService.GetAllItems().subscribe({
      next: (data) => {
        this.Products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
