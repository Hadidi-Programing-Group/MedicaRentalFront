import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../../../Services/Categories/categories.service";
import {SubCategoriesService} from "../../../../Services/SubCatrgories/sub-categories.service";
import {CategoryDto} from "../../../../Dtos/Categories/CategoryDto";

@Component({
  selector: 'app-subcategory-modal',
  templateUrl: './subcategory-modal.component.html',
  styleUrls: ['./subcategory-modal.component.css']
})
export class SubcategoryModalComponent implements OnInit, OnChanges
{
  @Input() submitted = false
  @Input() success = false
  @Input() isAdd = false

  @Input() subcategory: { name: string, icon: string, categoryId: string } = {name: '', icon: '', categoryId: ''}

  @Output() cancelAddEvent = new EventEmitter()
  @Output() confirmAddEvent = new EventEmitter()

  operation = ''
  operationVerb = ''
  submitClicked = false
  subcategoryForm: FormGroup = new FormGroup<any>({})
  iconBase64: string = ''
  modal: any
  categories: CategoryDto[] = []

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService)
  {
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    this.resetForm()
  }

  ngOnInit(): void
  {
    this.categoriesService.GetAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    })

    this.resetForm()
  }

  resetForm()
  {
    if (this.isAdd)
    {
      this.operation = "added"
      this.operationVerb = "Add"
    }
    else
    {
      this.operation = "updated"
      this.operationVerb = "Update"
    }
    this.subcategoryForm = this.formBuilder.group({
      name:
        [
          this.subcategory.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("^[a-zA-Z ]+$"),
          ]
        ],
      icon: ['', this.isAdd ? [Validators.required] : []],
      categoryId: [this.categories, [Validators.required]]
    });


    this.subcategoryForm.patchValue({categoryId: this.subcategory.categoryId});

  }

  onSubmit()
  {
    this.submitClicked = true
    if (this.subcategoryForm.valid)
    {
      this.confirmAddEvent.emit({
        name: this.subcategoryForm.get('name')?.value,
        icon: this.iconBase64 == '' ? this.cleanBase64(this.subcategory.icon) : this.cleanBase64(this.iconBase64),
        categoryId: this.subcategoryForm.get('categoryId')?.value
      })
    }
  }

  onImageSelected(event: any)
  {
    const file = event.target.files[0];

    if (file.type != 'image/x-icon')
    {
      this.subcategoryForm
        .get('icon')
        ?.setErrors({invalidFileType: true});
    }

    const reader = new FileReader();

    reader.onload = () =>
    {
      this.iconBase64 = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  cleanBase64(str: string)
  {
    let i = str.indexOf(',')
    return str.substring(i + 1)
  }

  cancel()
  {
    this.resetForm()
    this.cancelAddEvent.emit()
  }
}
