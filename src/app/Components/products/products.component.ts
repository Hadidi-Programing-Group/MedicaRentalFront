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
  categoryArray: any;

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

  onSelectCategories(selectedCategoryIds: number[]) {
    // Update categoryId with the selected category IDs
    this.categoryArray = selectedCategoryIds;
    console.log(this.categoryArray);
    this.fetchStudents();
  }

  FilterByCategory(categoryId: number) {
    console.log('Here');
    this.categoryId = categoryId;
    this.router.navigate(['/products'], {
      queryParams: { categoryId: categoryId },
    });
    this.fetchStudents(); // Call fetchStudents() to update the product list
  }

  // fetchStudents() {
  //   this.ProductsService.GetAllProducts(
  //     this.pagination * this.limit,
  //     this.limit,
  //     this.categoryId
  //   ).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.Products = data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  fetchStudents() {
    // If categoryId is an array (multiple selected categories)
    if (Array.isArray(this.categoryArray)) {
      // Convert array of category IDs to string with comma-separated values
      const categoryIdsString = this.categoryArray.join(',');
      console.log(categoryIdsString);

      this.ProductsService.GetAllProducts(
        this.pagination * this.limit,
        this.limit,
        this.categoryArray // Pass comma-separated category IDs as string
      ).subscribe({
        next: (data) => {
          console.log(data);
          this.Products = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      // If categoryId is a single category ID
      this.ProductsService.GetAllProducts(
        this.pagination * this.limit,
        this.limit,
        this.categoryId // Pass single category ID
      ).subscribe({
        next: (data) => {
          console.log(data);
          this.Products = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchStudents();
  }
}
