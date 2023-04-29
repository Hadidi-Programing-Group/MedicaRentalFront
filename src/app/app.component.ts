import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommunicationService } from './Services/Communication/communication.service';
import { SignalRService } from './Services/SignalR/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = environment.title;

  constructor(private navbarService: CommunicationService,
    private signalRService: SignalRService,
  ) {
    this.checkConnection()
  }
  get isVisible(): boolean {
    return this.navbarService.isVisible;
  }
  checkConnection() {
    if (!this.signalRService.isConnected) {
      this.signalRService.startConnection();
    }
  }
}
