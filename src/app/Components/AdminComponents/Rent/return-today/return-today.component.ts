import { Component,OnInit } from '@angular/core';
import { RentedItemsComponent } from 'src/app/Components/UserComponents/rented-items/rented-items.component';
import { GetRentedItemsDto } from 'src/app/Dtos/RentOperation/GetRentedItemsDto';
import { RentOperationsService } from 'src/app/Services/RentOperations/rent-operations.service';

@Component({
  selector: 'app-return-today',
  templateUrl: './return-today.component.html',
  styleUrls: ['./return-today.component.css']
})

export class ReturnTodayComponent implements OnInit {
  items: GetRentedItemsDto[] = [];
  today = new Date().toISOString().slice(0, 10);
  pagesCount: number = 0;
  currentPage: number = 1;

  constructor(private rentOperationService: RentOperationsService) {


   }

  ngOnInit(): void {
    this.getData();
  }

  getData()
  {
    this.rentOperationService
      .getToBeReturned(this.currentPage).subscribe({
      next: (page) => {
        this.items = page.data;
        this.pagesCount = Math.ceil(page.count / 12);
      }
    });
  }

  getFormattedReturnDate(returnDate: string): string {
    const date = new Date(returnDate);
    return date.toISOString().slice(0, 10);
  }

  acceptReturn(item: GetRentedItemsDto) {
    this.rentOperationService.acceptReturn(item.id).subscribe({
      next: () => {
        // Remove the item from the table
        this.ngOnInit();
        // this.items = this.items.filter(i => i.id !== item.id);
      },
      error: (error) => {
        // Handle error
        console.error(error);
      }
    });
  }

  onPageChanged(page: number)
  {
    this.currentPage = page;
    this.getData();
  }
}
