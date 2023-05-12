import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit, OnChanges
{
  @Input() submitted = false
  @Input() success = false
  @Input() isAdd = false

  @Input() category: { name: string, icon: string } = {name: '', icon: ''}

  @Output() cancelAddEvent = new EventEmitter()
  @Output() confirmAddEvent = new EventEmitter()

  operation = ''
  operationVerb = ''
  submitClicked = false
  categoryForm: FormGroup = new FormGroup<any>({})
  iconBase64: string = ''
  modal: any

  constructor(private formBuilder: FormBuilder)
  {
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    this.resetForm()
  }

  ngOnInit(): void
  {
    this.resetForm()
  }

  resetForm()
  {
    if (this.isAdd)
    {
      this.operation = "added"
      this.operationVerb = "Add"
    }
    else{
      this.operation = "updated"
      this.operationVerb = "Update"
    }

    this.categoryForm = this.formBuilder.group({
      name:
        [
          this.category.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("^[a-zA-Z ]+$"),
          ]
        ],
      icon: ['', this.isAdd?[Validators.required]:[]],
    });
  }

  onSubmit()
  {
    this.submitClicked = true
    if (this.categoryForm.valid)
    {
      this.confirmAddEvent.emit({
        name: this.categoryForm.get('name')?.value,
        icon: this.iconBase64 == ''? this.cleanBase64(this.category.icon):this.cleanBase64(this.iconBase64)
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
