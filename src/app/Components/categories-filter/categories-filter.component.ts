import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from 'src/app/Services/Categories/categories.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css'],
})
export class CategoriesFilterComponent implements OnInit {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Output() categorySelected = new EventEmitter<number>();

  onSelectCategory(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }

  @Output() categoriesSelected = new EventEmitter<number[]>();
  selectedCategoryIds: number[] = [];

  // Method to handle checkbox change event
  onCategoryCheckboxChange(event: any, categoryId: number) {
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
    console.log(this.selectedCategoryIds);
    // Emit the updated selectedCategoryIds array
    this.categoriesSelected.emit(this.selectedCategoryIds);
  }

  Categories: any;
  ngOnInit(): void {
    this.CategoriesService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },

      error: (error) => console.log(error),
    });
  }
}
