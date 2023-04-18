import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}
  filterReset: EventEmitter<void> = new EventEmitter<void>();
  resetFilters() {
    this.filterReset.emit();
  }
}
