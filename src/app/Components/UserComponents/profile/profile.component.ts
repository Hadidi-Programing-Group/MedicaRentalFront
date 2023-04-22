import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  UpdateProfileInfoDto,
  UserApprovalInfoDto,
  UserProfileInfoDto,
} from 'src/app/Dtos/UserProfileInfoDto';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder
  ) {}

  currentUser?: UserProfileInfoDto;
  currentUserApprovalInfo?: UserApprovalInfoDto;
  NationalImgBase64: any;
  UnionCardImgBase64: any;
  IsSubmitButtonClicked = false;
  IsUpdated = false;

  updateProfileForm: FormGroup = this.fb.group({
    FName: [
      ``,
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
        Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern('^(010|011|012|015)\\d{8}$')],
    ],
    Address: ['', [Validators.required]],
  });

  updateApprovalInfoForm: FormGroup = this.fb.group({
    NationalID: ['', [Validators.required, Validators.pattern('^\\d{14}$')]],
    NationalImg: ['', [Validators.required]],
    UnionCardImg: ['', [Validators.required]],
  });

  onNaionalImgSelected(event: any): void {
    const file = event.target.files[0];
    this.updateProfileForm.get('NationalImg')?.setErrors(null);

    const AllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!AllowedFileTypes.includes(file.type))
      this.updateProfileForm
        .get('NationalImg')
        ?.setErrors({ invalidFileType: true });
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.NationalImgBase64 = base64String;
      const Arr = this.NationalImgBase64.split(',', 2);
      this.NationalImgBase64 = Arr[1];
    };
    reader.readAsDataURL(file);
    return;
  }

  onUnionCardImgSelected(event: any): void {
    const file = event.target.files[0];
    this.updateProfileForm.get('UnionCardImg')?.setErrors(null);

    const AllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!AllowedFileTypes.includes(file.type))
      this.updateProfileForm
        .get('UnionCardImg')
        ?.setErrors({ invalidFileType: true });
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.UnionCardImgBase64 = base64String;
      const Arr = this.UnionCardImgBase64.split(',', 2);
      this.UnionCardImgBase64 = Arr[1];
    };
    reader.readAsDataURL(file);
    return;
  }

  onProfileSubmit() {
    if (this.updateProfileForm.valid) {
      const userData = this.updateProfileForm.value;
      console.log(userData);
      const DataToBeSent: UpdateProfileInfoDto = new UpdateProfileInfoDto(
        userData.FName,
        userData.LName,
        userData.phoneNumber,
        userData.Address,
        userData.email
      );
      this.userService.UpdateInfo(DataToBeSent).subscribe({
        next: (res) => {
          this.IsUpdated = true;
        },
        error: (err) => {
          this.IsUpdated = false;
        },
      });
    } else this.IsSubmitButtonClicked = true;
  }
  onApprovalInfoSubmit() {}

  ngOnInit(): void {
    this.userService.GetInfo().subscribe({
      next: (data: UserProfileInfoDto) => {
        this.currentUser = data;
        this.updateProfileForm
          .get('FName')
          ?.setValue(this.currentUser?.firstName);
        this.updateProfileForm
          .get('LName')
          ?.setValue(this.currentUser?.lastName);
        this.updateProfileForm
          .get('Address')
          ?.setValue(this.currentUser?.address);
        this.updateProfileForm
          .get('phoneNumber')
          ?.setValue(this.currentUser?.phoneNumber);
        this.updateProfileForm.get('email')?.setValue(this.currentUser?.email);
        if (!this.currentUser.isGrantedRent) {
          this.userService.GetApprovalInfo().subscribe({
            next: (data: UserApprovalInfoDto) => {
              this.currentUserApprovalInfo = data;
              this.NationalImgBase64 = data.nationalImage;
              this.UnionCardImgBase64 = data.unionImage;
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
