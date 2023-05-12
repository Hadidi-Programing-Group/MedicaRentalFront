import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedCategories: string[] = [];
  private selectedSubcategories: string[] = [];
  private selectedBrands:string[] = [];
  private searchText: string = '';

  // Event emitter for filter reset
  filterReset = new EventEmitter<void>();
  updateCategoriesSelected = new EventEmitter<string[]>();
  updateSubCategoriesSelected = new EventEmitter<string[]>();
  updateBrandsSelected=new EventEmitter<string[]>();
  updateSearchQuery = new EventEmitter<string>();


  updateSearchText(searchText: string): void {
    (searchText);
    this.searchText = searchText;
    this.updateSearchQuery.emit(this.searchText);
  }


   //Get selected Brands
   getSelectedBrands(): string[] {
    return this.selectedBrands;
   }

  // Get selected categories
  getSelectedCategories(): string[] {
    return this.selectedCategories;
  }

  // Get selected subcategories
  getSelectedSubcategories(): string[] {
    return this.selectedSubcategories;
  }

  // Update selected Brands
  updateSelectedBrands(brands: string[]): void {
    this.selectedBrands = brands;
    this.updateBrandsSelected.emit(this.selectedBrands);
  }


  // Update selected categories
  updateSelectedCategories(categories: string[]): void {
    this.selectedCategories = categories;
    this.updateCategoriesSelected.emit(this.selectedCategories);
  }

  // Update selected subcategories
  updateSelectedSubcategories(subcategories: string[]): void {
    this.selectedSubcategories = subcategories;
    this.updateSubCategoriesSelected.emit(this.selectedSubcategories);
  }

  // Reset filters
  resetFilters(): void {
    this.updateSelectedCategories([]);
    this.updateSelectedSubcategories([]);
    this.updateSelectedBrands([]);
  }
}
