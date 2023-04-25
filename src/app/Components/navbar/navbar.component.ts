import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/Services/Communication/communication.service';
import { OrderByStrings } from 'src/app/Dtos/OrderByStrings';
import { FilterService } from 'src/app/Services/Filter/filter.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  toggleFormGroup = new FormGroup({
    darkMode: new FormControl(false),
  });

  @HostBinding('class') className ='';
  darkClassName='theme-dark';
  lightClassName='theme-light';

  constructor(
    private NavBarService: CommunicationService,
    private router: Router,
    private readonly filterService: FilterService,
    private readonly loginService: LoginService,
    private overlay:OverlayContainer
  ) {}

  ngOnInit(): void {
    this.toggleFormGroup.get('darkMode')!.valueChanges.subscribe((darkMode) => {
      if (darkMode) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
    });

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
    this.loginService.revokeToken().subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
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
