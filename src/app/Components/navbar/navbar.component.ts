import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/Services/Communication/communication.service';
import { OrderByStrings } from 'src/app/Dtos/OrderByStrings';
import { FilterService } from 'src/app/Services/Filter/filter.service';
import { LoginService } from 'src/app/Services/Login/login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import {SignalRService} from "../../Services/SignalR/signal-r.service";
import {ChatService} from "../../Services/Chat/chat.service";
import {MessageNotificationDto} from "../../Dtos/Message/MessageNotificationDto";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  toggleFormGroup = new FormGroup({
    darkMode: new FormControl(false),
  });

  notificationCount: number = 0;
  messages:MessageNotificationDto[] = [];

  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  constructor(
    private NavBarService: CommunicationService,
    private router: Router,
    private signalRService: SignalRService,
    private chatService: ChatService,
    private readonly filterService: FilterService,
    public readonly loginService: LoginService,
    private overlay: OverlayContainer
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

    this.loginService.changeUserRole.subscribe({
      next: (data: string) => {
        console.log(data);
        this.userRole = data;
      },
    });


  }

  ShowRegistrationForm() {
    this.NavBarService.toggleVisibility();
    this.router.navigate(['/registration']);
  }

  LogOut() {
    this.loginService.revokeToken()
    this.router.navigate(['/']);
    this.loginService.isAuthenticatedChanged.emit(false);
    this.signalRService.endConnection()
  }

  private OrderByStrings = OrderByStrings;
  searchText = '';
  page = 1;
  orderBy = this.OrderByStrings.PriceDesc;
  isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  userRole: string = '';

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

  updateNotifications(){
    this.chatService.GetNotificationCount().subscribe({
      next: (data: number) => this.notificationCount = data,
      error: (err) => console.error(err)
    })

    if(this.notificationCount > 0){
      this.chatService.GetLastNUnseenChats(3).subscribe({
        next: (data: MessageNotificationDto[]) => this.messages = data,
        error: (err) => console.error(err)
      })
    }
    //on each receive append (pop>3)
    // this.signalRService.newMessageEvent.subscribe({
    //   next: (data: any) => {
    //
    //   }
    // })
  }
}
