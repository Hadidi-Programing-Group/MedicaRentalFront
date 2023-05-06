import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SignalRService } from 'src/app/Services/SignalR/signal-r.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  selected: string = 'reports';
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly signalRService: SignalRService
  ) {}
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') ?? '';
  }

  userRole?: string = localStorage.getItem('userRole') ?? '';
  updateComponent(view: string) {
    this.selected = view;
  }

  LogOut() {
    this.loginService.revokeToken();
    this.router.navigate(['/']);
    this.loginService.isAuthenticatedChanged.emit(false);
    this.signalRService.endConnection();
  }
}
