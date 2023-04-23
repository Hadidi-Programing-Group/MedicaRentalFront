import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html',
  styleUrls: ['./my-account-navbar.component.css'],
})
export class MyAccountNavbarComponent implements OnInit {
  selected: string = 'profile';
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
