import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-manage-categories-navbar',
  templateUrl: './manage-categories-navbar.component.html',
  styleUrls: ['./manage-categories-navbar.component.css']
})
export class ManageCategoriesNavbarComponent {
  selected: string = 'categories';
  @Output() componentUpdater = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  notifyChange(view: string) {
    this.selected = view;
    this.componentUpdater.emit(view);
  }
}
