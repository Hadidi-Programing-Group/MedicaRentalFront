import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private readonly ProductsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  Products: any;
  pagination = 0;
  limit = 12;
  allStudents = 100;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.pagination = params['page'] ?? 0;
    });
    this.fetchStudents();
  }

  fetchStudents() {
    this.ProductsService.GetAllProducts(
      this.pagination * this.limit,
      this.limit
    ).subscribe({
      next: (data) => {
        this.Products = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchStudents();
  }
}
