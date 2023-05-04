import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { AddUserItemDto } from 'src/app/Dtos/AddingItemDtp';
import { SellerItemDto } from 'src/app/Dtos/SellerItemDto';
import { BrandsService } from 'src/app/Services/Brands/brands.service';
import { CategoriesService } from 'src/app/Services/Categories/categories.service';
import { ItemDetailsService } from 'src/app/Services/ItemDetails/item-details.service';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  constructor(
    private ItemService: ProductsService,
    private readonly fb: FormBuilder,
    activeRoute: ActivatedRoute,
    private CatService: CategoriesService,
    private AddService : ItemDetailsService,
    private BrandService: BrandsService,
    private router: Router,
  ) {
    this.ID = activeRoute.snapshot.params['id'];
  }
  AddItemForm: FormGroup = this.fb.group({
    ItemName: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    serialNumber: ['', [Validators.required]],
    model: ['', [Validators.required]],
    Stock: ['', [Validators.required]],
    Price: ['', [Validators.required]],
    Brand: ['', [Validators.required]],
    CategoryName: ['', [Validators.required]],
    SubCategoryName: ['', [Validators.required]],
    ItemImg: ['', [Validators.required]],
  });
  ID: any;
  currentUser?: SellerItemDto;
  ItemImgBase64: any;
  UnionCardImgBase64: any;
  IsSubmitButtonClicked = false;
  IsAdded = false;
  IsApproveAdded = false;
  selectedCategory: any;
  selectedSubCategory: any;
  categories: any;
  subcategories :any;
  Brands: any;
  selectedBrand: any;


  onItemImgSelected(event: any): void {
    const file = event.target.files[0];
    this.AddItemForm.get('ItemImg')?.setErrors(null);

    const AllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!AllowedFileTypes.includes(file.type))
      this.AddItemForm
        .get('ItemImg')
        ?.setErrors({ invalidFileType: true });
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.ItemImgBase64 = base64String;
      const Arr = this.ItemImgBase64.split(',', 2);
      this.ItemImgBase64 = Arr[1];
    };
    reader.readAsDataURL(file);
    return;
  }

  onApprovalInfoSubmit() {
    if (this.AddItemForm.get("ItemImg")?.valid) {
      const userData = this.AddItemForm.value;
      const DataToBeSent: AddUserItemDto = new AddUserItemDto(
        this.AddItemForm.controls['ItemName'].value,
        this.AddItemForm.controls['description'].value,
        this.AddItemForm.controls['serialNumber'].value,
        this.AddItemForm.controls['model'].value,
        this.AddItemForm.controls['Stock'].value,
        this.AddItemForm.controls['Price'].value,
        this.ItemImgBase64,
        true,
        this.selectedBrand,
        this.selectedCategory,
        this.selectedSubCategory,
        ''
      );

      this.AddService.AddItem(DataToBeSent).subscribe({
        next:(res) => {
          this.IsApproveAdded = true;
        },
        error:(err) => {
          this.IsApproveAdded = false;
        }
      })

    } else this.IsSubmitButtonClicked = true;
  }

   onSelectCategory(category: any) {
    this.selectedCategory = category;
    const cat = this.categories.find((c: { [x: string]: any; }) => c["id"]==category)
    this.subcategories = cat["subCategories"];
    this.selectedSubCategory = this.subcategories[0]["id"];
    this.AddItemForm.controls['SubCategoryName'].setValue(this.selectedSubCategory)
  }

  onSelectSubCategory(subCategory: any) {
    this.selectedSubCategory = subCategory;
  }

  onSelectBrand(brand: any) {
    this.selectedBrand = brand;
  }

  ngOnInit(): void {
    this.CatService.GetAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
    });
    this.BrandService.GetAllBrands().subscribe({
      next: (data:any) => {
        this.Brands = data;
      }
    })
    // this.ItemService.GetItemByIdForSeller(this.ID).subscribe({
    //   next: (data: SellerItemDto | any) => {
    //     this.currentUser = data;
    //     this.AddItemForm.controls['ItemName'].setValue(data.name);
    //     this.AddItemForm.controls['description'].setValue(data.description);
    //     this.AddItemForm.controls['serialNumber'].setValue(data.serial);
    //     this.AddItemForm.controls['model'].setValue(data.model);
    //     this.AddItemForm.controls['Stock'].setValue(data.stock);
    //     this.AddItemForm.controls['Price'].setValue(data.price);
    //     this.AddItemForm.controls['CategoryName'].setValue(data.category.id);
    //     this.onSelectCategory(
    //       data.category.id
    //     );
    //     this.AddItemForm.controls['SubCategoryName'].setValue(data.subCategory.id);
    //     this.AddItemForm.controls['ItemImg'].setValue(data.image);
    //     this.ItemImgBase64 = data.image;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
