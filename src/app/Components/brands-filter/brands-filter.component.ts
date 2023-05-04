import { Component } from '@angular/core';
import { BrandsService } from 'src/app/Services/Brands/brands.service';
import { FilterService } from 'src/app/Services/Filter/filter.service';

@Component({
  selector: 'app-brands-filter',
  templateUrl: './brands-filter.component.html',
  styleUrls: ['./brands-filter.component.css'],
})
export class BrandsFilterComponent {
  constructor(
    private readonly BrandsService: BrandsService,
    private readonly filterService: FilterService
  ) {}

  selectedBrandIds: string[] = [];
  Brands: any;
  ngOnInit(): void {
    this.selectedBrandIds = this.filterService.getSelectedBrands();

    this.filterService.updateBrandsSelected.subscribe({
      next: (data: string[]) => {
        this.selectedBrandIds = data;
      },
    });

    this.BrandsService.GetAllBrands().subscribe({
      next: (data) => {
        this.Brands = data;
      },

      error: (error) => console.log(error),
    });
  }

  // Method to handle checkbox change event
  onBrandCheckboxChange(event: any, brandId: string) {
    if (event.target.checked) {
      // Add brand ID to selectedBrandIds array
      this.selectedBrandIds.push(brandId);
    } else {
      // Remove brand ID from selectedBrandIds array
      const index = this.selectedBrandIds.indexOf(brandId);
      if (index !== -1) {
        this.selectedBrandIds.splice(index, 1);
      }
    }
    // Emit the updated selectedBrandIds array
    this.filterService.updateSelectedBrands(this.selectedBrandIds);
  }
}
