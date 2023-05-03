import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css'],
})
export class AdminSideBarComponent {
  selected: string = 'reports';
  @Output() componentUpdater = new EventEmitter();

  constructor(private cdr: ChangeDetectorRef) {}

  // ...

  ngOnInit() {
    // Manually trigger change detection after a short delay
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }

  notifyChange(view: string) {
    this.selected = view;
    this.componentUpdater.emit(view);
  }
}
