import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { UserProfileInfoDto } from 'src/app/Dtos/UserProfileInfoDto ';
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
  NationalImgBase64: any;
  UnionCardImgBase64: any;
  IsSubmitButtonClicked = false;

  updateProfileForm: FormGroup = this.fb.group({
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
        Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ],
    ],
    password: ['', [Validators.required]],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern('^(010|011|012|015)\\d{8}$')],
    ],
    NationalID: ['', [Validators.required, Validators.pattern('^\\d{14}$')]],
    Address: ['', [Validators.required]],
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

  onSubmit() {}

  ngOnInit(): void {
    this.userService.GetInfo().subscribe({
      next: (data: UserProfileInfoDto) => {
        this.currentUser = data;
        this.NationalImgBase64 = data.nationalImage
        this.UnionCardImgBase64 = data.unionImage
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
