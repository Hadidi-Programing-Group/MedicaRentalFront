import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoriesService} from "../../../../Services/Categories/categories.service";
import {CategoryDto} from "../../../../Dtos/Categories/CategoryDto";
import {ImageHelper} from "../../../../Helpers/ImageHelper";
import {Modal} from "bootstrap";
import {InsertCategoryDto} from "../../../../Dtos/Categories/InsertCategoryDto";
import {UpdateCategoryDto} from "../../../../Dtos/Categories/UpdateCategoryDto";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit
{
  categories: CategoryDto[] | undefined = undefined
  pagesCount: number = 0;
  currentPage: number = 1;
  searchText: null | string = null
  submitted = false
  success = false
  isAdd = false
  updatedId = ''
  category: { name: string, icon: string } = {name: '', icon: ''}

  @Output() deleteCategoryEvent = new EventEmitter()
  private modal: any

  protected readonly ImageHelper = ImageHelper;

  constructor(private categoriesService: CategoriesService)
  {
  }

  ngOnInit(): void
  {
    this.getCategories()
  }

  ngAfterViewInit(): void
  {
    this.modal = new Modal(document.getElementById('categoryStaticBackdrop')!)
  }

  onPageChanged(page: number)
  {
    this.currentPage = page;
    this.getCategories();
  }

  onSearchClick(searchText: string)
  {
    this.searchText = searchText == "" ? null : searchText
    this.getCategories();
  }

  deleteCategory(categoryId: string)
  {
    this.deleteCategoryEvent.emit({id: categoryId, name: this.categories?.find(c => c.id == categoryId)?.name ?? ''})
  }

  getCategories()
  {
    this.categoriesService.GetAllCategoriesPaged(
      this.currentPage,
      this.searchText
    ).subscribe({
      next: (data) =>
      {
        this.categories = data.data
        this.pagesCount = Math.ceil(data.count / 12)
      },
      error: (err) => console.log(err)
    })
  }

  addCategory()
  {
    this.isAdd = true
    this.modal.show()
  }

  cancelModal()
  {
    this.isAdd = false
    this.updatedId = ''
    this.category.name = this.category.icon = ''
    this.submitted = this.success = false
  }

  confirmModal(category: any)
  {
    if (this.isAdd)
    {
      let categoryDto = new InsertCategoryDto(category.name, category.icon)
      this.categoriesService.InsertCategory(categoryDto).subscribe({
        next: () =>
        {
          this.success = this.submitted = true
          this.getCategories()
        },
        error: (err) =>
        {
          this.submitted = true;
          console.error(err)
        }
      })
    }

    else
    {
      let categoryDto = new UpdateCategoryDto(this.updatedId, category.name, category.icon)
      this.categoriesService.UpdateCategory(categoryDto).subscribe({
        next: () =>
        {
          debugger
          this.success = this.submitted = true
          this.getCategories()
        },
        error: (err) =>
        {
          this.submitted = true;
          console.error(err)
        }
      })
    }
  }

  updateCategory(id: string, name: string, icon: string)
  {
    this.category = {
      name, icon
    }
    this.updatedId = id
    this.modal.show()
  }
}
