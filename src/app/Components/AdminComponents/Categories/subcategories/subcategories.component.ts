import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";
import {SubCategoryWithCategoryDto} from "../../../../Dtos/SubCategories/SubCategoryWithCategoryDto";
import {SubCategoriesService} from "../../../../Services/SubCatrgories/sub-categories.service";
import {ImageHelper} from "../../../../Helpers/ImageHelper";
import {InsertSubCategoryDto} from "../../../../Dtos/SubCategories/InsertSubCategoryDto";
import {UpdateSubCategoryDto} from "../../../../Dtos/SubCategories/UpdateSubCategoryDto";

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent  implements OnInit, AfterViewInit
{
  subcategories: SubCategoryWithCategoryDto[] | undefined = undefined
  pagesCount: number = 0;
  currentPage: number = 1;
  searchText: null | string = null
  submitted = false
  success = false
  isAdd = false
  updatedId = ''
  subcategory: { name: string, icon: string, categoryId: string } = {name: '', icon: '', categoryId: ''}

  @Output() deleteSubCategoryEvent = new EventEmitter()

  private modal: any

  protected readonly ImageHelper = ImageHelper;

  constructor(private subcategoriesService: SubCategoriesService)
  {
  }

  ngOnInit(): void
  {
    this.getSubCategories()
  }

  ngAfterViewInit(): void
  {
    this.modal = new Modal(document.getElementById('subcategoryStaticBackdrop')!)
  }

  onPageChanged(page: number)
  {
    this.currentPage = page;
    this.getSubCategories();
  }

  onSearchClick(searchText: string)
  {
    this.searchText = searchText == "" ? null : searchText
    this.getSubCategories();
  }

  deleteSubCategory(subcategoryId: string)
  {
    this.deleteSubCategoryEvent.emit({id: subcategoryId, name: this.subcategories?.find(c => c.id == subcategoryId)?.name ?? ''})
  }

  getSubCategories()
  {
    this.subcategoriesService.GetAllWithCategory(
      this.currentPage,
      this.searchText
    ).subscribe({
      next: (data) =>
      {
        this.subcategories = data.data
        this.pagesCount = Math.ceil(data.count/12)


      },
      error: (err) => console.log(err)
    })
  }

  addSubCategory()
  {
    this.isAdd = true
    this.modal.show()
  }


  cancelModal()
  {
    this.isAdd = false
    this.updatedId = ''
    this.subcategory.name = this.subcategory.icon =  this.subcategory.categoryId = ''
    this.submitted = this.success = false
  }

  confirmModal(category: any)
  {
    if (this.isAdd)
    {
      let subcategoryDto = new InsertSubCategoryDto(category.name, category.icon, category.categoryId)
      this.subcategoriesService.InsertSubCategory(subcategoryDto).subscribe({
        next: () =>
        {
          this.success = this.submitted = true
          this.getSubCategories()
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
      let subcategoryDto = new UpdateSubCategoryDto(this.updatedId, category.name, category.icon, category.categoryId)
      this.subcategoriesService.UpdateSubCategory(subcategoryDto).subscribe({
        next: () =>
        {
          debugger
          this.success = this.submitted = true
          this.getSubCategories()
        },
        error: (err) =>
        {
          this.submitted = true;
          console.error(err)
        }
      })
    }
  }

  updateSubCategory(id: string, name: string, icon: string, categoryId: string)
  {
    this.subcategory = {
      name, icon, categoryId
    }
    this.updatedId = id
    this.modal.show()
  }

}
