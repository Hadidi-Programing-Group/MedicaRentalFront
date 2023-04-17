import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from 'src/app/Services/Categories/categories.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css'],
})
export class CategoriesFilterComponent implements OnInit {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Output() categoriesSelected = new EventEmitter<string[]>();
  @Output() subCategoriesSelected = new EventEmitter<string[]>();
  selectedCategoryIds: string[] = [];
  selectedSubCategoryIds: string[] = [];

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
    this.categoriesSelected.emit(this.selectedCategoryIds);
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
    this.subCategoriesSelected.emit(this.selectedSubCategoryIds);
  }

  Categories: any;
  ngOnInit(): void {
    this.CategoriesService.GetAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.Categories = data;
      },

      error: (error) => console.log(error),
    });
  }
}
