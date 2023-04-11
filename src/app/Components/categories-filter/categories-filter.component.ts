import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/Services/Categories/categories.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css'],
})
export class CategoriesFilterComponent implements OnInit {
  constructor(
    private readonly CategoriesService: CategoriesService,
    private readonly router: Router
  ) {}

  Categories: any;

  ngOnInit(): void {
    this.CategoriesService.GetAllCategories().subscribe({
      next: (data) => {
        this.Categories = data;
      },

      error: (error) => console.log(error),
    });
  }

  FilterByCategory(categoryId: number) {
    this.router
      .navigate(['/products'], { queryParams: { categoryId: categoryId } })
      .then(() => {
        // Use window.location.reload() to reload the page
        window.location.reload();
      });
  }
}
