import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../../../Services/Categories/categories.service";
import {SubCategoriesService} from "../../../../Services/SubCatrgories/sub-categories.service";
import {CategoryDto} from "../../../../Dtos/Categories/CategoryDto";

@Component({
  selector: 'app-subcategory-modal',
  templateUrl: './subcategory-modal.component.html',
  styleUrls: ['./subcategory-modal.component.css']
})
export class SubcategoryModalComponent implements OnInit{
  @Input() submitted = false
  @Input() success = false
  submitClicked = false

  @Output() cancelAddEvent = new EventEmitter()
  @Output() confirmAddEvent = new EventEmitter()

  categories: CategoryDto[] = []
  categoryForm: FormGroup = new FormGroup<any>({})
  iconBase64: string = ''
  modal: any

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  )
  {

  }

  ngOnInit(): void
  {
    this.categoriesService.GetAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    })

    this.resetForm()
  }

  resetForm(){
    this.categoryForm = this.formBuilder.group({
      name:
        [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("^[a-zA-Z ]+$"),
          ]
        ],
      icon: ['', [Validators.required]],
      categoryId: [this.categories, [Validators.required]]
    });
  }

  onSubmit()
  {
    this.submitClicked = true
    if (this.categoryForm.valid)
    {
      this.confirmAddEvent.emit({
        name: this.categoryForm.get('name')?.value,
        icon: this.cleanBase64(this.iconBase64),
        categoryId: this.categoryForm.get('categoryId')?.value
      })
    }
  }

  onImageSelected(event: any)
  {
    const file = event.target.files[0];

    if (file.type != 'image/x-icon')
    {
      this.categoryForm
        .get('icon')
        ?.setErrors({invalidFileType: true});
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.iconBase64 = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  cleanBase64(str: string){
    let i = str.indexOf(',')
    return str.substring(i+1)
  }

  cancel()
  {
    this.resetForm()

    this.cancelAddEvent.emit()
  }
}
