import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedCategories: string[] = [];
  private selectedSubcategories: string[] = [];
  private searchText: string = '';

  // Event emitter for filter reset
  filterReset = new EventEmitter<void>();
  updateCategoriesSelected = new EventEmitter<string[]>();
  updateSubCategoriesSelected = new EventEmitter<string[]>();
  updateSearchQuery = new EventEmitter<string>();

  updateSearchText(searchText: string): void {
    console.log(searchText);
    this.searchText = searchText;
    this.updateSearchQuery.emit(this.searchText);
  }

  // Get selected categories
  getSelectedCategories(): string[] {
    return this.selectedCategories;
  }

  // Get selected subcategories
  getSelectedSubcategories(): string[] {
    return this.selectedSubcategories;
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
  }
}
