import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {
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
