import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter()


  onSearchClick(searchText: string) {
    this.searchEvent.emit(searchText);
  }
}
