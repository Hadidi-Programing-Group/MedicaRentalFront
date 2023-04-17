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
  categoryId = 0;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pagination = params['page'] ?? 0;
      this.categoryId = params['categoryId'] ?? 0;
    });
    this.fetchStudents();
  }

  onCategorySelected(categoryId: number) {
    this.FilterByCategory(categoryId);
  }

  FilterByCategory(categoryId: number) {
    console.log('Here');
    this.categoryId = categoryId;
    this.router.navigate(['/products'], {
      queryParams: { categoryId: categoryId },
    });
    this.fetchStudents(); // Call fetchStudents() to update the product list
  }

  fetchStudents() {
    this.ProductsService.GetAllProducts(
      this.pagination * this.limit,
      this.limit,
      this.categoryId
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
