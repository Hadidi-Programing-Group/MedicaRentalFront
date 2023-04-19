import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html',
  styleUrls: ['./my-account-navbar.component.css'],
})
export class MyAccountNavbarComponent {
  selected: string = 'profile'
  @Output() componentUpdater = new EventEmitter();

  notifyChange(view: string) {
    this.selected = view
    this.componentUpdater.emit(view);
  }
}
