import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegistrationService } from 'src/app/Services/Registration/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  NationalImgBase64: any;
  UnionCardImgBase64: any;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
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
      NationalID: ['', [Validators.required, Validators.pattern('^\\d{14}$')]],
      Address: ['', [Validators.required]],
      NationalImg: ['', [Validators.required]],
      UnionCardImg: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {}

  onNaionalImgSelected(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    this.registerForm.get('NationalImg')?.setErrors(null);

    const AllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!AllowedFileTypes.includes(file.type))
      this.registerForm
        .get('NationalImg')
        ?.setErrors({ invalidFileType: true });
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.NationalImgBase64 = base64String;
      const Arr = this.NationalImgBase64.split(',', 2);
      this.NationalImgBase64 = Arr[1];
      console.log(this.NationalImgBase64);
    };
    reader.readAsDataURL(file);
    return;
  }

  onUnionCardImgSelected(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    this.registerForm.get('UnionCardImg')?.setErrors(null);

    const AllowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!AllowedFileTypes.includes(file.type))
      this.registerForm
        .get('UnionCardImg')
        ?.setErrors({ invalidFileType: true });
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.UnionCardImgBase64 = base64String;
      const Arr = this.UnionCardImgBase64.split(',', 2);
      this.UnionCardImgBase64 = Arr[1];
      console.log(this.UnionCardImgBase64);
    };
    reader.readAsDataURL(file);
    return;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      const DataToBeSent = {
        baseUserRegisterInfo: {
          firstName: userData.FName,
          lastName: userData.LName,
          email: userData.email,
          password: userData.password,
          phoneNumber: userData.phoneNumber,
          userRole: 2,
        },
        ssn: userData.NationalID,
        address: userData.Address,
        nationalIdImage: this.NationalImgBase64,
        unionCardImage: this.UnionCardImgBase64,
      };
      console.log(DataToBeSent);
      this.registrationService.RegisterUser(DataToBeSent).subscribe((res) => {
        console.log(res);
      });
    }
  }
}