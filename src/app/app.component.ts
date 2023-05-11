import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommunicationService } from './Services/Communication/communication.service';
import { SignalRService } from './Services/SignalR/signal-r.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = environment.title;
  showNavbar = true;

  constructor(
    private navbarService: CommunicationService,
    private signalRService: SignalRService,
    private readonly router: Router
  ) {
    if(localStorage.getItem('isAuthenticated') == 'true' && localStorage.getItem('userRole') == 'Client'){
      this.checkConnection();
    }
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbar = !(
          event.url === '/admin' || event.url.startsWith('/admin/')
        );
      });
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
