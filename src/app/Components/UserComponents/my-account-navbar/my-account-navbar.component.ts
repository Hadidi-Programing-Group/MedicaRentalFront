import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html',
  styleUrls: ['./my-account-navbar.component.css'],
})
export class MyAccountNavbarComponent {
  @Output() componentUpdater = new EventEmitter();
  @ViewChild('profile') activeLink: any;

  notifyChange(event: any, view: string) {
    if (this.activeLink.nativeElement) {
      this.activeLink.nativeElement.classList.remove('active');
    } else {
      this.activeLink.classList.remove('active');
    }
    this.activeLink = event.target;
    this.activeLink.classList.add('active');
    this.componentUpdater.emit(view);
  }
}
