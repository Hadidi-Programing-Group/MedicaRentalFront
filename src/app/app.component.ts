import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommunicationService } from './Services/Communication/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = environment.title;

  constructor(private navbarService: CommunicationService) {}
    get isVisible(): boolean {
      return this.navbarService.isVisible;
  }
}
