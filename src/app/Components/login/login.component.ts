import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  constructor(private fb: FormBuilder,private loginservies: LoginService, private router:Router) 
  {
    this.loginForm = this.fb.group({
      email: [
        '',
      [
        Validators.required,
       
      ],
    ],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.loginForm.valid);
   if(this.loginForm.valid){
    const userData=this.loginForm.value;
    const DataToBeSent = {
      email: userData.email ,
      password: userData.password
    };
    console.log(DataToBeSent);
    this.loginservies.LoginUser(DataToBeSent).subscribe(
      (res: any) => { 
        const token = res.token; 
        console.log(res);
        console.log('Token:', token); 
    },
    (error)=>{
      console.log(error.error);
    });
    this.router.navigate(['/']);
   }
  }
}


