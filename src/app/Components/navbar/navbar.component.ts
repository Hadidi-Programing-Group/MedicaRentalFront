import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/Services/Communication/communication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private NavBarService : CommunicationService, private router : Router){}
  ShowRegistrationForm(){
     this.NavBarService.toggleVisibility();
     this.router.navigate(['/registration']);
  }
}
