import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";
import {SubCategoryWithCategoryDto} from "../../../../Dtos/SubCategories/SubCategoryWithCategoryDto";
import {SubCategoriesService} from "../../../../Services/SubCatrgories/sub-categories.service";
import {ImageHelper} from "../../../../Helpers/ImageHelper";
import {InsertSubCategoryDto} from "../../../../Dtos/SubCategories/InsertSubCategoryDto";

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
  deletedSubCategoryId = ''
  deleteContent = ''
  submitted = false
  success = false

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
    this.modal.show()
  }

  cancelAdd()
  {
    this.submitted = this.success = false
  }

  confirmAdd(subcategory: any)
  {
    let subCategoryDto = new InsertSubCategoryDto(subcategory.name, subcategory.icon, subcategory.categoryId)
    this.subcategoriesService.InsertSubCategory(subCategoryDto).subscribe({
      next: (data) => {
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
