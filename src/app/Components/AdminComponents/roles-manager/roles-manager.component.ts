import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/Services/Communication/communication.service';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

import { AdminService } from 'src/app/Services/Admin/admin.service';


import {
  // UpdateApprovalInfoDto,
  // UpdateProfileInfoDto,
  // UserApprovalInfoDto,
  RoleMangerUserInfoDto
} from 'src/app/Dtos/AdminDto';
import { error } from 'jquery';


@Component({
  selector: 'app-roles-manager',
  templateUrl: './roles-manager.component.html',
  styleUrls: ['./roles-manager.component.css']
})
export class RolesManagerComponent implements OnInit {
  registerForm: FormGroup;
  NationalImgBase64: any;
  UnionCardImgBase64: any;
  IsSubmitButtonClicked = false;
  AdminModData : RoleMangerUserInfoDto | any ;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private navbarService: CommunicationService,
    private adminService : AdminService
  ) {
    this.registerForm = this.fb.group({
      FName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("^[a-zA-Z '-]+$"),
        ],
      ],
      LName: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^(010|011|012|015)\\d{8}$')],
      ],
      role: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {

    this.adminService.GetAllAdminMod().subscribe({
     next : (data)=> {
      this.AdminModData = data;
      console.log(this.AdminModData);
     },
     error: (err)=> {
      console.log(err);
     }
    })
  }



  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      const DataToBeSent = {
        firstName: userData.FName,
        lastName: userData.LName,
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        userRole: parseInt(userData.role)
      };
      this.registrationService.RegisterAdminMod(DataToBeSent).subscribe({
        next: (res) => {
          // this.router.navigate(['/']);
          console.log(`Account registered: ${userData.role} `);
        },
        error: (error) => {
          console.log(error.error);
          if (
            error.error ==
            `Username '${DataToBeSent.email}' is already taken.`
          ) {
            // this.router.navigate(['/emailerror']);
          } else {
            // this.router.navigate(['/registration']);
          }
        },
      });
      // this.navbarService.toggleVisibility();
    } else if (!this.registerForm.valid) this.IsSubmitButtonClicked = true;
  }


  AddMod(){

  }

  ViewMod(){

  }
}
