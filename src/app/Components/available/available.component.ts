import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css'],
})
export class AvailableComponent implements OnInit {
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
