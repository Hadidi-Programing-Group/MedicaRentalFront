import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerItemDto } from 'src/app/Dtos/SellerItemDto';
import { UpdateUserItemDto } from 'src/app/Dtos/UpdateUserItemDto';
import { CategoriesService } from 'src/app/Services/Categories/categories.service';
import { ItemDetailsService } from 'src/app/Services/ItemDetails/item-details.service';
import { ProductsService } from 'src/app/Services/Products/products.service';

@Component({
  selector: 'app-item-details-seller',
  templateUrl: './item-details-seller.component.html',
  styles: [],
})
export class ItemDetailsSellerComponent {
  constructor(
    private ItemService: ProductsService,
    private readonly fb: FormBuilder,
    activeRoute: ActivatedRoute,
    private CatService: CategoriesService,
    private UpdateService : ItemDetailsService,
    private router: Router,
  ) {
    this.ID = activeRoute.snapshot.params['id'];
  }
  UpdateItemForm: FormGroup = this.fb.group({
    ItemName: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    serialNumber: ['', [Validators.required]],
    model: ['', [Validators.required]],
    Stock: ['', [Validators.required]],
    Price: ['', [Validators.required]],
    CategoryName: ['', [Validators.required]],
    SubCategoryName: ['', [Validators.required]],
    ItemImg: ['', [Validators.required]],
  });
  ID: any;
  currentUser?: SellerItemDto;
  ItemImgBase64: any;
  UnionCardImgBase64: any;
  IsSubmitButtonClicked = false;
  IsUpdated = false;
  IsApproveUpdated = false;
  selectedCategory: any;
  selectedSubCategory: any;
  categories: any;
  subcategories :any;


  onItemImgSelected(event: any): void {
    const file = event.target.files[0];
    this.UpdateItemForm.get('ItemImg')?.setErrors(null);

    const AllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!AllowedFileTypes.includes(file.type))
      this.UpdateItemForm
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
    if (this.UpdateItemForm.get("ItemImg")?.valid) {
      const userData = this.UpdateItemForm.value;
      const DataToBeSent: UpdateUserItemDto = new UpdateUserItemDto(
        this.ID,
        this.UpdateItemForm.controls['ItemName'].value,
        this.UpdateItemForm.controls['description'].value,
        this.UpdateItemForm.controls['serialNumber'].value,
        this.UpdateItemForm.controls['model'].value,
        this.UpdateItemForm.controls['Stock'].value,
        this.UpdateItemForm.controls['Price'].value,
        this.ItemImgBase64,
        true,
        this.currentUser?.brand.id??"",
        this.selectedCategory,
        this.selectedSubCategory
      );

      this.UpdateService.UpdateItem(DataToBeSent).subscribe({
        next:(res) => {
          this.IsApproveUpdated = true;
          let URL = 'products/'+this.ID;
          this.router.navigate([URL]);
        },
        error:(err) => {
          this.IsApproveUpdated = false;
        }
      })

    } else this.IsSubmitButtonClicked = true;
  }

   onSelectCategory(category: any) {
    this.selectedCategory = category;
    const cat = this.categories.find((c: { [x: string]: any; }) => c["id"]==category)
    this.subcategories = cat["subCategories"];
    this.selectedSubCategory = this.subcategories[0]["id"];
    this.UpdateItemForm.controls['SubCategoryName'].setValue(this.selectedSubCategory)
  }

  onSelectSubCategory(subCategory: any) {
    this.selectedSubCategory = subCategory;
  }

  ngOnInit(): void {
    this.CatService.GetAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
    });
    this.ItemService.GetItemByIdForSeller(this.ID).subscribe({
      next: (data: SellerItemDto | any) => {
        this.currentUser = data;
        this.UpdateItemForm.controls['ItemName'].setValue(data.name);
        this.UpdateItemForm.controls['description'].setValue(data.description);
        this.UpdateItemForm.controls['serialNumber'].setValue(data.serial);
        this.UpdateItemForm.controls['model'].setValue(data.model);
        this.UpdateItemForm.controls['Stock'].setValue(data.stock);
        this.UpdateItemForm.controls['Price'].setValue(data.price);
        this.UpdateItemForm.controls['CategoryName'].setValue(data.category.id);
        this.onSelectCategory(
          data.category.id
        );
        this.UpdateItemForm.controls['SubCategoryName'].setValue(data.subCategory.id);
        this.UpdateItemForm.controls['ItemImg'].setValue(data.image);
        this.ItemImgBase64 = data.image;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
