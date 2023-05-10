import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordDto } from 'src/app/Dtos/ForgetPasswordDto';
import { LoginService } from 'src/app/Services/Login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  successMessage?: string;
  errorMessage?: string;
  showSuccess?: boolean;
  showError?: boolean;

  constructor(private readonly loginService: LoginService) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  public validateControl = (controlName: string) => {
    return (
      this.forgotPasswordForm.get(controlName)?.invalid &&
      this.forgotPasswordForm.get(controlName)?.touched
    );
  };
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName)?.hasError(errorName);
  };

  public forgotPassword = (forgotPasswordFormValue: any) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: `${environment.websiteURL}/resetpassword`,
    };
    this.loginService.forgotPassword(forgotPassDto).subscribe({
      next: (data) => {
        this.showSuccess = true;
        this.successMessage =
          'The link has been sent, please check your email to reset your password.';
      },
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = 'Invalid Request';
      },
    });
  };
}
