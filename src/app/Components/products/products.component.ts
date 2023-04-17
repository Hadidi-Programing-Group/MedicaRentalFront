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

  fetchStudents() {
    this.ProductsService.GetAllProducts(
      this.pagination * this.limit,
      this.limit,
      this.categoryId
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

  fetchItemsByCategories(): void {
    if (this.categoryIds && this.categoryIds.length > 0) {
      console.log('Done');
      // If categoryId is present, call getItemsByCategory method
      this.ProductsService.GetItemsByCategories(
        this.categoryIds,
        this.orderBy
      ).subscribe({
        next: (response) => {
          this.Products = response; // Update products array with the fetched products
          this.TotalProducts = this.Products.length;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
    } else {
      this.fetchProducts();
    }
  }

  fetchItemsBySubCategories(): void {
    if (this.subCategoryIds && this.subCategoryIds.length > 0) {
      console.log('Done');
      // If categoryId is present, call getItemsByCategory method
      this.ProductsService.GetItemsBySubCategories(
        this.subCategoryIds,
        this.orderBy
      ).subscribe({
        next: (response) => {
          this.Products = response; // Update products array with the fetched products
          this.TotalProducts = this.Products.length;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        },
      });
    } else {
      this.fetchProducts();
    }
  }

  onSelectCategories(selectedCategoryIds: string[]) {
    // Update categoryId with the selected category IDs
    this.categoryIds = selectedCategoryIds;
    // Update query params with categoryId parameter
    this.router.navigate([], {
      queryParams: { categoryId: this.categoryIds },
      queryParamsHandling: 'merge',
    });
    this.fetchProducts();
  }

  onSelectSubCategories(selectedSubCategoryIds: string[]) {
    // Update categoryId with the selected category IDs
    this.subCategoryIds = selectedSubCategoryIds;
    // Update query params with categoryId parameter
    this.router.navigate([], {
      queryParams: { subCategoryId: this.subCategoryIds },
      queryParamsHandling: 'merge',
    });
    this.fetchProducts();
  }

  renderPage(event: number) {
    this.pagination = event;
    this.fetchStudents();
  }
}
