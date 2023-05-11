import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Login/login.service';
import { SignalRService } from '../../Services/SignalR/signal-r.service';
import { environment } from '../../../environments/environment';

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
    private signalRService: SignalRService,
    private loginservies: LoginService,
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
          this.signalRService.startConnection(data['token']);
          localStorage.setItem('userRole', data['userRole']);
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
