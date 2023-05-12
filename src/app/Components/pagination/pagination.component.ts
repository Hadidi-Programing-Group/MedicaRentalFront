import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalPages: number=0;
  @Input() currentPage: number=0;
  @Output() pageChanged = new EventEmitter<number>();

  get pageNumbers(): number[] {
    const pagesToShow = 5;
    const middlePage = Math.ceil(pagesToShow / 2);
    const startPage = Math.max(1, this.currentPage - middlePage + 1);
    const endPage = Math.min(this.totalPages, startPage + pagesToShow - 1);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  setPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
