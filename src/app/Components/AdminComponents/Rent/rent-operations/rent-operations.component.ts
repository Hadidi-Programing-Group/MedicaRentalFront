import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private rentOperationService: RentOperationsService,
    private itemsService: ProductsService
  )
  {
  }


  ngOnInit(): void
  {
    this.rentForm = this.formBuilder.group({
      clientEmail: ['', [Validators.required]],
      sellerEmail: ['', [Validators.required]],
      selectedItem: ['', [Validators.required]],
      returnDate: ['', [Validators.required]]
    });
  }

  getSellerItems(id:string)
  {
    this.itemsService.GetSellerItemsMinimal(id).subscribe({
      next:(data)=> {
        console.log(data)
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
      console.log('heeeeeeereeeeeeeeee')
      let dto = new InsertRentOperationDto(
        new Date().toISOString(),
        this.rentForm.get('returnDate')?.value,
        200,
        this.client?.id ?? '',
        this.seller?.id ?? '',
        this.rentForm.get('selectedItem')?.value,
      )
      this.rentOperationService.InsertRentOperation(dto).subscribe({
        next: () =>
        {
          console.log('posted')
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
