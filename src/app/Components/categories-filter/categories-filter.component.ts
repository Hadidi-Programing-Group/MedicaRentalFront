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
