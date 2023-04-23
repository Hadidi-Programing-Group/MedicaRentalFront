import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from 'src/app/Services/Categories/categories.service';
import { FilterService } from 'src/app/Services/Filter/filter.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css'],
})
export class CategoriesFilterComponent implements OnInit {
  constructor(
    private readonly CategoriesService: CategoriesService,
    private readonly filterService: FilterService
  ) {}

  // @Output() categoriesSelected = new EventEmitter<string[]>();
  // @Output() subCategoriesSelected = new EventEmitter<string[]>();

  selectedCategoryIds: string[] = [];
  selectedSubCategoryIds: string[] = [];
  Categories: any;
  ngOnInit(): void {
    this.selectedCategoryIds = this.filterService.getSelectedCategories();
    this.selectedSubCategoryIds = this.filterService.getSelectedSubcategories();

    this.filterService.updateCategoriesSelected.subscribe({
      next: (data: string[]) => {
        this.selectedCategoryIds = data;
      },
    });

    this.filterService.updateSubCategoriesSelected.subscribe({
      next: (data: string[]) => {
        this.selectedSubCategoryIds = data;
      },
    });

    this.CategoriesService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },

      error: (error) => console.log(error),
    });
  }

  // Method to handle checkbox change event
  onCategoryCheckboxChange(event: any, categoryId: string) {
    if (event.target.checked) {
      // Add category ID to selectedCategoryIds array
      this.selectedCategoryIds.push(categoryId);
    } else {
      // Remove category ID from selectedCategoryIds array
      const index = this.selectedCategoryIds.indexOf(categoryId);
      if (index !== -1) {
        this.selectedCategoryIds.splice(index, 1);
      }
    }
    // Emit the updated selectedCategoryIds array
    this.filterService.updateSelectedCategories(this.selectedCategoryIds);
  }

  onSubCategoryCheckboxChange(event: any, subCategoryId: string) {
    if (event.target.checked) {
      // Add category ID to selectedCategoryIds array
      this.selectedSubCategoryIds.push(subCategoryId);
    } else {
      // Remove category ID from selectedCategoryIds array
      const index = this.selectedSubCategoryIds.indexOf(subCategoryId);
      if (index !== -1) {
        this.selectedSubCategoryIds.splice(index, 1);
      }
    }
    // Emit the updated selectedCategoryIds array

    this.filterService.updateSelectedSubcategories(this.selectedSubCategoryIds);
  }
}
