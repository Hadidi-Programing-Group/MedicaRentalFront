import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from 'src/app/Services/Communication/communication.service';
import { OrderByStrings } from 'src/app/Dtos/OrderByStrings';
import { FilterService } from 'src/app/Services/Filter/filter.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SignalRService } from '../../Services/SignalR/signal-r.service';
import { ChatService } from '../../Services/Chat/chat.service';
import { MessageNotificationDto } from '../../Dtos/Message/MessageNotificationDto';
import { MessageDto } from '../../Dtos/Message/MessageDto';
import { MessageStatus } from '../../Dtos/Message/MessageStatus';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  private OrderByStrings = OrderByStrings;
  searchText = '';
  page = 1;
  orderBy = this.OrderByStrings.PriceDesc;
  isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  userRole: string = localStorage.getItem('userRole') ?? '';
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  toggleFormGroup = new FormGroup({
    darkMode: new FormControl(false),
  });

  constructor(
    private NavBarService: CommunicationService,
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly filterService: FilterService,
    public readonly loginService: LoginService,
    private signalRService: SignalRService,
    private overlay: OverlayContainer
  ) {
    // console.log("isAuthenticated" , localStorage.getItem('isAuthenticated')==='true');
    // this.isAuthenticated = localStorage.getItem('isAuthenticated') == 'true';
  }

  ngOnInit(): void {
  
    console.log(
      'isAuthenticated',
      localStorage.getItem('isAuthenticated') === 'true'
    );
    this.isAuthenticated = localStorage.getItem('isAuthenticated') == 'true';

    this.toggleFormGroup.get('darkMode')!.valueChanges.subscribe((darkMode) => {
      if (darkMode) {
        document.body.classList.add('theme-dark');
      } else {
        document.body.classList.remove('theme-dark');
      }
    });

    this.loginService.isAuthenticatedChanged.subscribe({
      next: (data: boolean) => {
        console.log('isAuthenticatedChanged triggered');
        this.isAuthenticated = data;
      },
    });

    this.loginService.changeUserRole.subscribe({
      next: (data: string) => {
        this.userRole = data;
      },
    });
  }

  ShowRegistrationForm() {
    this.NavBarService.toggleVisibility();
    this.router.navigate(['/registration']);
  }

  LogOut() {
    this.loginService.revokeToken();
    this.router.navigate(['/']);
    this.loginService.isAuthenticatedChanged.emit(false);
    this.signalRService.endConnection();
  }

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
