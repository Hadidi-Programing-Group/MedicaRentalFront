import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Modal} from "bootstrap";
import {ImageHelper} from 'src/app/Helpers/ImageHelper';
import {BrandsService} from "../../../../Services/Brands/brands.service";
import {BrandDto} from "../../../../Dtos/Brand/BrandDto";
import {InsertBrandDto} from "../../../../Dtos/Brand/InsertBrandDto";
import {UpdateBrandDto} from "../../../../Dtos/Brand/UpdateBrandDto";

@Component({
  selector: 'app-brands',
  templateUrl: './manage-brands.component.html',
  styleUrls: ['./manage-brands.component.css']
})
export class ManageBrandsComponent implements OnInit, AfterViewInit
{
  brands: BrandDto[] | undefined = undefined
  pagesCount: number = 0;
  currentPage: number = 1;
  searchText: null | string = null
  submitted = false
  success = false
  isAdd = false
  updatedId = ''
  brand: { name: string, countryOfOrigin: string, image: string } = {name: '', countryOfOrigin: '', image: ''}

  deletedId = ''
  deleteContent = ''
  type = ''

  private deleteModal: any
  private modal: any

  protected readonly ImageHelper = ImageHelper;

  constructor(private brandsService: BrandsService)
  {
  }

  ngOnInit(): void
  {
    this.getBrands()
  }

  ngAfterViewInit(): void
  {
    this.deleteModal = new Modal(document.getElementById('deleteStaticBackdrop')!)
    this.modal = new Modal(document.getElementById('brandStaticBackdrop')!)
  }

  onPageChanged(page: number)
  {
    this.currentPage = page;
    this.getBrands();
  }

  onSearchClick(searchText: string)
  {
    this.searchText = searchText == "" ? null : searchText
    this.getBrands();
  }

  getBrands()
  {
    this.brandsService.GetAllBrandsPaged(
      this.currentPage,
      this.searchText
    ).subscribe({
      next: (data) =>
      {
        this.brands = data.data
        this.pagesCount = Math.ceil(data.count / 12)
      },
      error: (err) => console.log(err)
    })
  }

  addBrand()
  {
    this.isAdd = true
    this.modal.show()
  }

  cancelModal()
  {
    this.isAdd = false
    this.updatedId = ''
    this.brand.name = this.brand.image = this.brand.countryOfOrigin = ''
    this.submitted = this.success = false
  }

  confirmModal(brand: any)
  {
    if (this.isAdd)
    {
      let brandDto = new InsertBrandDto(brand.name, brand.countryOfOrigin, brand.image)
      this.brandsService.InsertBrand(brandDto).subscribe({
        next: (data) =>
        {
          this.success = this.submitted = true
          this.getBrands()
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
      let brandDto = new UpdateBrandDto(this.updatedId, brand.name, brand.countryOfOrigin, brand.image)
      this.brandsService.UpdateBrand(brandDto).subscribe({
        next: (data) =>
        {
          this.success = this.submitted = true
          this.getBrands()
        },
        error: (err) =>
        {
          this.submitted = true;
          console.error(err)
        }
      })
    }
  }

  updateBrand(id: string, name: string, countryOfOrigin: string, image: string)
  {
    this.brand = {
      name, countryOfOrigin, image
    }

    this.updatedId = id
    this.modal.show()
  }

  deleteBrand(obj: any)
  {
    this.deletedId = obj.id;
    this.deleteContent = obj.name;
    this.type = 'Brand'
    this.deleteModal.show()
  }

  cancelDelete()
  {
    this.deletedId = this.deleteContent = this.type = ''
    this.submitted = this.success = false
  }

  confirmedDelete()
  {

    this.brandsService.DeleteBrandAsync(this.deletedId).subscribe({
      next: () =>
      {
        this.submitted = true
        this.success = true
        this.getBrands()
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

