import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from 'src/app/Services/Login/login.service';
import {SignalRService} from '../../Services/SignalR/signal-r.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private loginservies: LoginService,
    private signalRService: SignalRService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  wrongInfo = false;
  errorMessage: string = '';

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      const DataToBeSent = {
        email: userData.email,
        password: userData.password,
      };
      this.loginservies.LoginUser(DataToBeSent).subscribe({
        next: (data: any) => {
          localStorage.setItem('authToken', data['token']);
          localStorage.setItem('authTokenExpDate', data['expiry']);
          localStorage.setItem('isAuthenticated', 'true');
          this.loginservies.isAuthenticatedChanged.emit(true);
          localStorage.setItem('userRole', data['userRole']);
          if(data['userRole'] == 'Client'){
            this.signalRService.startConnection(data['token']);
          }
          this.loginservies.changeUserRole.emit(data['userRole']);
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (err) => {
          this.wrongInfo = true;
          this.errorMessage = err.error['statusMessage'];
        },
      });
    }
  }
}
