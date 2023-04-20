import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/Services/Communication/communication.service';
import { OrderByStrings } from 'src/app/Dtos/OrderByStrings';
import { FilterService } from 'src/app/Services/Filter/filter.service';
import { LoginService } from 'src/app/Services/Login/login.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private NavBarService: CommunicationService,
    private router: Router,
    private readonly filterService: FilterService,
    private readonly loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.loginService.isAuthenticatedChanged.subscribe({
      next: (data: boolean) => {
        this.isAuthenticated = data;
      },
    });
  }
  ShowRegistrationForm() {
    this.NavBarService.toggleVisibility();
    this.router.navigate(['/registration']);
  }

  LogOut() {
    localStorage.setItem('authToken', '');
    localStorage.setItem('authTokenExpDate', '');
    localStorage.setItem('isAuthenticated', '');
    this.router.navigate(['/']);
    this.loginService.isAuthenticatedChanged.emit(false);
  }

  private OrderByStrings = OrderByStrings;
  searchText = '';
  page = 1;
  orderBy = this.OrderByStrings.PriceDesc;
  isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  searchProduct() {
    this.filterService.updateSearchText(this.searchText);
    const currentUrl = this.router.url;
    const isInProducts = currentUrl.startsWith('/products');
    if (!isInProducts) {
      this.router.navigate(['/products'], {
        queryParams: { searchText: this.searchText, page: 1 },
        queryParamsHandling: 'merge',
      });
    }
  }
}
