import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/Services/Login/login.service';

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
  ) {}
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') ?? '';
  }

  userRole?: string = localStorage.getItem('userRole') ?? '';


  LogOut() {
    this.loginService.revokeToken();
    this.router.navigate(['/']);
    this.loginService.isAuthenticatedChanged.emit(false);
  }
}
