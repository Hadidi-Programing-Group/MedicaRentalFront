import { Component } from '@angular/core';
import { BlockUserInfoDto } from 'src/app/Dtos/BlockUserInfoDto';
import { StatusDto } from 'src/app/Dtos/StatusDto';
import { UserBasicInfoDto } from 'src/app/Dtos/UserBasicInfoDto';
import { AccountsService } from 'src/app/Services/Accounts/accounts.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-block-users',
  templateUrl: './block-users.component.html',
  styles: [],
})
export class BlockUsersComponent {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly userService: UserService
  ) {}

  client?: UserBasicInfoDto;
  submittedclient = false;
  invalidclient = false;
  blockSuccess = false;
  requestSuccess = false;
  formSubmitted = false;
  requestMessage = '';

  endTime: Date = new Date();

  validateclient(email: string) {
    this.accountsService.GetInfoByEmail(email).subscribe({
      next: (data: UserBasicInfoDto) => {
        this.client = data;
        this.submittedclient = true;
        this.invalidclient = false;
      },

      error: (err) => {
        console.log(err);
        this.submittedclient = true;
        this.invalidclient = true;
      },
    });
  }

  clientChanged() {
    this.submittedclient = false;
    this.invalidclient = true;
  }

  BlockReported() {
    this.endTime.setFullYear(this.endTime.getFullYear() + 20);

    if (this.client) {
      const blockUserInfo = new BlockUserInfoDto(this.client.id, this.endTime);
      this.userService.BlockUser(blockUserInfo).subscribe({
        next: (data: StatusDto) => {
          if (this.client)
            this.client.isBlocked = true;

          this.requestSuccess = true;
          this.formSubmitted = true;
          this.requestMessage = data.statusMessage;
          console.log(data);
        },
        error: (err: any) => {
          this.requestSuccess = false;
          this.formSubmitted = true;
          this.requestMessage = err.error.statusMessage;
          console.log(err);
        },
      });
    }
  }

  UnBlockReported(email: string) {
    this.userService.UnblockUser(email).subscribe({
      next: (data: StatusDto) => {
        if (this.client)
          this.client.isBlocked = false;
        this.requestSuccess = true;
        this.formSubmitted = true;
        this.requestMessage = data.statusMessage;
        console.log(data);
      },
      error: (err: any) => {
        this.requestSuccess = false;
        this.formSubmitted = true;
        this.requestMessage = err.error.statusMessage;
        console.log(err);
      },
    });
  }

  // private readonly callObject = {
  //   next: (data: StatusDto) => {
  //     this.blockSuccess = true;
  //     this.blockSubmitted = true;
  //     this.blockMessage = data.statusMessage;
  //     console.log(data);
  //   },
  //   error: (err: any) => {
  //     this.blockSuccess = false;
  //     this.blockSubmitted = true;
  //     this.blockMessage = err.error.statusMessage;
  //     console.log(err);
  //   },
  // };
}
