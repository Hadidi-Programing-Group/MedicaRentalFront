import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Modal} from "bootstrap";
import {CategoriesService} from "../../../../Services/Categories/categories.service";
import {SubCategoriesService} from "../../../../Services/SubCatrgories/sub-categories.service";
import {CategoriesComponent} from "../categories/categories.component";
import {SubcategoriesComponent} from "../subcategories/subcategories.component";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements AfterViewInit
{
  selected: string = 'categories';
  deletedId = ''
  deleteContent = ''
  type = ''
  submitted = false
  success = false

  @ViewChild('categories')
  private categoriesComponent: CategoriesComponent | undefined;
  @ViewChild('subcategories')
  private subcategoriesComponent: SubcategoriesComponent | undefined;

  private deleteModal: any

  constructor(private categoriesService: CategoriesService,private subcategoriesService: SubCategoriesService)
  {
  }

  ngAfterViewInit(): void
  {
    this.deleteModal = new Modal(document.getElementById('deleteStaticBackdrop')!)
  }

  updateComponent(view: string)
  {
    this.selected = view;
  }

  deleteCategory(obj: any)
  {
    this.deletedId = obj.id;
    this.deleteContent = obj.name;
    this.type = 'Category'
    this.deleteModal.show()
  }

  deleteSubCategory(obj: any)
  {
    this.deletedId = obj.id;
    this.deleteContent = obj.name;
    this.type = 'Subcategory'
    this.deleteModal.show()
  }

  cancelDelete()
  {
    this.deletedId = this.deleteContent = this.type = ''
    this.submitted = this.success = false
  }

  confirmedDelete()
  {
    if (this.type == 'Category')
    {
      this.categoriesService.DeleteCategoryAsync(this.deletedId).subscribe({
        next: () =>
        {
          this.submitted = true
          this.success = true
          this.cancelDelete()
          this.categoriesComponent?.getCategories()
        },
        error: (err) =>
        {
          this.submitted = true
          this.success = false

          console.error(err)
        }
      })
    }
    else{
      this.subcategoriesService.DeleteSubCategory(this.deletedId).subscribe({
        next: () =>
        {
          this.submitted = true
          this.success = true
          this.cancelDelete()
          this.subcategoriesComponent?.getSubCategories()
        },
        error: (err) =>
        {
          this.submitted = true
          this.success = false

          console.error(err)
        }
      })
    }
  }


}
