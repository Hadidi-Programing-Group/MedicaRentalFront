import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
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

import { Modal } from 'bootstrap';

import {
  // UpdateApprovalInfoDto,
  // UpdateProfileInfoDto,
  // UserApprovalInfoDto,
  UpdateUserRoleDto,
  RoleMangerUserInfoDto,
} from 'src/app/Dtos/AdminDto';
import { error } from 'jquery';

@Component({
  selector: 'app-roles-manager',
  templateUrl: './roles-manager.component.html',
  styleUrls: ['./roles-manager.component.css'],
})
export class RolesManagerComponent implements OnInit {



  registerForm: FormGroup;
  NationalImgBase64: any;
  UnionCardImgBase64: any;
  IsSubmitButtonClicked = false;
  AdminModData: RoleMangerUserInfoDto | any;

  emailTaken = false;

  updateRole: UpdateUserRoleDto = {userId: "" ,newRole: 0};

  // selectedUserId: string = "";
  // updateRoleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private navbarService: CommunicationService,
    private adminService: AdminService
  ) {
    // this.updateRoleForm = this.fb.group({
    //   userId: [{value: '', disabled: true}],
    //   newRole: ['', Validators.required]
    // });

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
      role: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.adminService.GetAllAdminMod().subscribe({
      next: (data) => {
        this.AdminModData = data;
        console.log(this.AdminModData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  openUpdateModal(userId: string) {

    const userIdInputUpdate = document.getElementById('userIdUpdate') as HTMLInputElement;
    const userIdInputDelete = document.getElementById('userIdDelete') as HTMLInputElement;
    userIdInputUpdate.value = userId;
    userIdInputDelete.value = userId;
  }

  submitUpdate() {

    const userId = (document.getElementById('userIdUpdate') as HTMLInputElement)
      .value;
    const userRole = (document.getElementById('userRole') as HTMLSelectElement)
      .value;

    this.updateRole.userId = userId;
    this.updateRole.newRole = parseInt(userRole) ;

    // console.log(` The update role modal ===> ${this.updateRole}`);
    // Send a request to the updateuserole endpoint with the form data
    // Replace the URL and method with the correct values for your API
    this.adminService.UpdateUserRole(this.updateRole).subscribe({
      next: (res) => {

        $('#updateAdminModModal').modal('hide');$('body').removeClass('modal-open');$('.modal-backdrop').remove();


        this.ngOnInit(); // Reload the data without refreshing the page
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  submitDelete() {

    const userId = (document.getElementById('userIdDelete') as HTMLInputElement)
      .value;

    this.adminService.DeleteAdminMod(userId).subscribe({
      next: (res) => {

        $('#deleteAdminModModal').modal('hide');$('body').removeClass('modal-open');$('.modal-backdrop').remove();


        this.ngOnInit(); // Reload the data without refreshing the page
      },
      error: (error) => {
        console.log(error.error);
      },
    });
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
        userRole: parseInt(userData.role),
      };
      this.registrationService.RegisterAdminMod(DataToBeSent).subscribe({
        next: (res) => {
          // this.router.navigate(['/']);
          console.log(`Account registered: ${userData.role} `);

        $('#addAdminModModal').modal('hide');$('body').removeClass('modal-open');$('.modal-backdrop').remove();

          // $('#addAdminModModal').modal('hide'); // Close the modal
          this.ngOnInit(); // Reload the data without refreshing the page
        },
        error: (error) => {
          console.log(error.error);
          if (
            error.error == `Username '${DataToBeSent.email}' is already taken.`
          ) {
            this.emailTaken = true;
            // this.router.navigate(['/emailerror']);
          } else {
            // this.router.navigate(['/registration']);
          }
        },
      });
    } else if (!this.registerForm.valid) this.IsSubmitButtonClicked = true;
  }


}
