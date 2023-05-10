import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-brand-modal',
  templateUrl: './brand-modal.component.html',
  styleUrls: ['./brand-modal.component.css']
})
export class BrandModalComponent implements OnInit, OnChanges
{
@Input() submitted = false
@Input() success = false
@Input() isAdd = false

@Input() brand: { name: string, countryOfOrigin: string, image: string } = {name: '', countryOfOrigin: '', image: ''}

@Output() cancelAddEvent = new EventEmitter()
@Output() confirmAddEvent = new EventEmitter()

  operation = ''
  operationVerb = ''
  submitClicked = false
  brandForm: FormGroup = new FormGroup<any>({})
  imageBase64: string = ''
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

    this.brandForm = this.formBuilder.group({
      name:
        [
          this.brand.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("^[a-zA-Z ]+$"),
          ]
        ],
      image: ['', this.isAdd?[Validators.required]:[]],
      cof: this.brand.countryOfOrigin
    });
  }

  onSubmit()
  {
    this.submitClicked = true
    if (this.brandForm.valid)
    {
      this.confirmAddEvent.emit({
        name: this.brandForm.get('name')?.value,
        countryOfOrigin: this.brandForm.get('cof')?.value,
        image: this.imageBase64 == ''? this.cleanBase64(this.brand.image):this.cleanBase64(this.imageBase64)
      })
    }
  }

  onImageSelected(event: any)
  {
    const file = event.target.files[0];
    console.log(file.type)

    if (['image/jpeg', 'image/x-png', 'image/png'].findIndex(m => m == file.type) == -1)
    {
      this.brandForm
        .get('image')
        ?.setErrors({invalidFileType: true});
    }

    const reader = new FileReader();

    reader.onload = () =>
    {
      this.imageBase64 = reader.result as string
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
