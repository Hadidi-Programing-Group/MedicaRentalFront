import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserBasicInfoDto} from "../../../../Dtos/UserBasicInfoDto";
import {AccountsService} from "../../../../Services/Accounts/accounts.service";
import {RentOperationsService} from "../../../../Services/RentOperations/rent-operations.service";
import {InsertRentOperationDto} from "../../../../Dtos/RentOperation/InsertRentOperationDto";
import {ProductsService} from "../../../../Services/Products/products.service";
import {ItemMinimalDto} from "../../../../Dtos/ItemMinimalDto";

@Component({
  selector: 'app-rent-operations',
  templateUrl: './rent-operations.component.html',
  styleUrls: ['./rent-operations.component.css']
})
export class RentOperationsComponent implements OnInit
{
  rentForm = new FormGroup<any>({})
  //   = new FormGroup({
  //   clientEmail: new FormControl('',{validators: [Validators.required]}),
  //   sellerEmail: new FormControl('',{validators: [Validators.required]}),
  //   selectedItem: new FormControl('',{validators: [Validators.required]}),
  //   returnDate: new FormControl('',{validators: [Validators.required]})
  // });

  sellerItems: ItemMinimalDto[] = [];

  formSubmitted = false;
  submittedClient = false;
  submittedSeller = false;
  invalidClient = true;
  invalidSeller = true;
  invalidSubmit = false;
  client?: UserBasicInfoDto;
  seller?: UserBasicInfoDto;

  success= false
  minDate: string;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private rentOperationService: RentOperationsService,
    private itemsService: ProductsService
  )
  {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // add leading zero if needed
    this.minDate = `${year}-${month}-${day}`;
  }


  ngOnInit(): void
  {
   this.resetForm()
  }

  resetForm(){
    this.rentForm = this.formBuilder.group({
      clientEmail: ['', [Validators.required]],
      sellerEmail: ['', [Validators.required]],
      selectedItem: ['', [Validators.required]],
      returnDate: ['', [Validators.required]]
    });

    this.submittedClient = false;
    this.submittedSeller = false;
    this.invalidClient = true;
    this.invalidSeller = true;
    this.invalidSubmit = false;
  }

  getSellerItems(id: string)
  {
    this.itemsService.GetSellerItemsMinimal(id).subscribe({
      next: (data) =>
      {
        this.sellerItems = data
      }
    })
  }

  submit()
  {
    this.formSubmitted = true

    if (this.invalidClient || this.invalidSeller)
    {
      this.invalidSubmit = true
    }

    if (this.rentForm.valid)
    {
      let id = this.rentForm.get('selectedItem')?.value
      let dto = new InsertRentOperationDto(
        new Date().toISOString(),
        new Date(this.rentForm.get('returnDate')?.value).toISOString(),
        this.sellerItems.find(i => i.id == id)?.price ?? 0,
        this.client?.id ?? '',
        this.seller?.id ?? '',
        id
      )

      this.rentOperationService.InsertRentOperation(dto).subscribe({
        next: () => {
          this.success = true
          this.resetForm()
          setTimeout(()=> this.success = false, 6000)
        }
      })
    }
  }

  validateClient(email: string
  )
  {
    this.accountsService.GetInfoByEmail(email).subscribe({
      next: (data: UserBasicInfoDto) =>
      {
        this.client = data
        this.submittedClient = true
        this.invalidClient = false
      },

      error: (err) =>
      {
        console.log(err);
        this.submittedClient = true
        this.invalidClient = true
      }
    })
  }

  validateSeller(email: string
  )
  {
    this.accountsService.GetInfoByEmail(email).subscribe({
      next: (data: UserBasicInfoDto) =>
      {
        this.seller = data
        this.submittedSeller = true
        this.invalidSeller = false
        this.getSellerItems(data.id)
      },

      error: (err) =>
      {
        console.log(err);
        this.submittedSeller = true
        this.invalidSeller = true
      }
    })
  }

  sellerChanged()
  {
    this.submittedSeller = false
    this.invalidSeller = true
    this.sellerItems = []
  }

  clientChanged()
  {
    this.submittedClient = false
    this.invalidClient = true
  }
}
