import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/Admin/admin.service';

import {UserApprovalInfoWithIdDto }from 'src/app/Dtos/AdminDto'
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


  info:UserApprovalInfoWithIdDto | any;
constructor(activeRoute: ActivatedRoute, private adminService : AdminService){
  this.ID = activeRoute.snapshot.params["id"];

}

ngOnInit(): void {
  this.adminService.GetClientApprovalInfoWithId(this.ID).subscribe({
    next:(data:UserApprovalInfoWithIdDto|any)=>{
      this.info = data;
      console.log(data);
      this.nationalImage = 'data:image/png;base64,'+ data.nationalImage;
      this.unionImage = 'data:image/png;base64,'+ data.unionImage;

    },
    error:(err)=>{console.log(err)}
  })
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
