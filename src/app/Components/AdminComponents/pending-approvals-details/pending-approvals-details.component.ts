import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/Admin/admin.service';

import {UserApprovalInfoWithIdDto,
  UserProfileInfoWithIdDto
}from 'src/app/Dtos/AdminDto'
import { error } from 'jquery';
@Component({
  selector: 'app-pending-approvals-details',
  templateUrl: './pending-approvals-details.component.html',
  styles: [
  ]
})
export class PendingApprovalsDetailsComponent implements OnInit{

  ID:any;
  nationalId:any;
  nationalImage:any;
  unionImage:any;
  isApproved = false;


  info:UserApprovalInfoWithIdDto | any;
  extraInfo: UserProfileInfoWithIdDto| any;

constructor(activeRoute: ActivatedRoute, private adminService : AdminService , private router: Router){
  this.ID = activeRoute.snapshot.params["id"];

}

ngOnInit(): void {

  this.adminService.GetClientApprovalInfoWithId(this.ID).subscribe({
    next:(data:UserApprovalInfoWithIdDto|any)=>{
      this.info = data;
      console.log(data);
      this.nationalImage = 'data:image/png;base64,'+ data.nationalImage;
      this.unionImage = 'data:image/png;base64,'+ data.unionImage;
      this.nationalId = data.nationalId;

    },
    error:(err)=>{console.log(err)}
  })

  this.adminService.GetClientInfoWithId(this.ID).subscribe({
    next:(data:UserProfileInfoWithIdDto|any) => {
      this.extraInfo = data;
      this.isApproved = data.isGrantedRent;
    },
    error: (err) => {console.log(err)}
  })
}


onApproveClick(email: string): void {
  this.isApproved = true;
  this.adminService.ApproveUser(email).subscribe({
    next: (data) => {console.log("Approved")},
    error: ( err) => {console.log(err)}
  }
  );

}


onRejectedNationalClick():void {
  this.adminService.RejectUser(this.ID, {
    "nationalId": this.nationalId,
    "nationalImage": null,
    "unionImage": this.unionImage
  }).subscribe({
    next: (data) => {console.log("Data saved")},
    error: ( err) => {console.log(err)}
  });

}

onRejectedUnionClick():void {
  this.adminService.RejectUser(this.ID, {
    "nationalId": this.nationalId,
    "nationalImage": this.nationalImage,
    "unionImage": null
  }).subscribe({
    next: (data) => {console.log("Data saved")},
    error: ( err) => {console.log(err)}
  });

}


// export class UserApprovalInfoWithIdDto {
//   constructor(
//     public id : string,
//     public nationalId: string,
//     public nationalImage: string,
//     public unionImage: string
//   ) {}
// }



}
