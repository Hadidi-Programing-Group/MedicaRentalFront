import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeItemDto } from 'src/app/Dtos/HomeItemDto';
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

  Products: HomeItemDto[] = [];
  orderBy: string = '';
  categoryIds: string[] = [];
  subCategoryIds: string[] = [];

  pagination = 0;
  limit = 12;
  TotalProducts = 100;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pagination = params['page'] ?? 0;

      // Get orderBy and categoryId parameters from query params
      this.orderBy = params['orderBy'] || '';
      // Update categoryIds with array of selected category IDs
      this.categoryIds = params['categoryId']
        ? Array.isArray(params['categoryId'])
          ? params['categoryId']
          : [params['categoryId']]
        : [];

      this.subCategoryIds = params['subCategoryId']
        ? Array.isArray(params['subCategoryId'])
          ? params['subCategoryId']
          : [params['subCategoryId']]
        : [];
    });
    this.fetchProducts();
  }

  fetchProducts(): void {
    if (this.subCategoryIds && this.subCategoryIds.length > 0) {
      this.fetchItemsBySubCategories();
    } else if (this.categoryIds && this.categoryIds.length > 0) {
      this.fetchItemsByCategories();
    } else {
      this.fetchAllProductsWithoutFilter();
    }
  }

  fetchAllProductsWithoutFilter(): void {
    // Call HomeItemService method to fetch products based on orderBy parameter
    this.ProductsService.GetAllItems(this.orderBy).subscribe({
      next: (data) => {
        this.TotalProducts = this.Products.length;
        this.Products = data;
      },
      error: (err) => console.log(err),
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
    this.subCategoryIds = selectedCategoryIds;
    // Update query params with categoryId parameter
    this.router.navigate([], {
      queryParams: { categoryId: this.subCategoryIds },
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
  }
}
