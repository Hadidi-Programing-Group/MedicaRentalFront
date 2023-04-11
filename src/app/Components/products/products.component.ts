import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private readonly ProductsService: ProductsService) {}

  Products: any;
  ngOnInit(): void {
    this.ProductsService.GetAllProducts().subscribe({
      next: (data) => {
        //console.log(data)
        this.Products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
