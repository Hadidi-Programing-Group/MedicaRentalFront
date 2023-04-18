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
    if (this.selectedSubCategoryIds.length > 0) {
      this.selectedCategoryIds = [];
      this.categoriesSelected.emit(this.selectedCategoryIds);
    }
    this.subCategoriesSelected.emit(this.selectedSubCategoryIds);
  }

  Categories: any;
  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   // Update categoryIds with array of selected category IDs
    //   this.selectedCategoryIds = params['categoryId']
    //     ? Array.isArray(params['categoryId'])
    //       ? params['categoryId']
    //       : [params['categoryId']]
    //     : [];

    //   this.selectedSubCategoryIds = params['subCategoryId']
    //     ? Array.isArray(params['subCategoryId'])
    //       ? params['subCategoryId']
    //       : [params['subCategoryId']]
    //     : [];

    //   this.categoriesSelected.emit(this.selectedCategoryIds);
    //   this.subCategoriesSelected.emit(this.selectedSubCategoryIds);
    // });

    this.filterService.filterReset.subscribe(() => {
      this.selectedCategoryIds = [];
      this.selectedSubCategoryIds = [];
    });

    this.CategoriesService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },

      error: (error) => console.log(error),
    });
  }
}
