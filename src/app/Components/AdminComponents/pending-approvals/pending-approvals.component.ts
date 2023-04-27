import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data, error } from 'jquery';

import {
  // UpdateApprovalInfoDto,
  // UpdateProfileInfoDto,
  // UserApprovalInfoDto,
  UserProfileInfoWithIdDto
} from 'src/app/Dtos/AdminDto';

import { AdminService } from 'src/app/Services/Admin/admin.service';
@Component({
  selector: 'app-pending-approvals',
  templateUrl: './pending-approvals.component.html',
  styles: [],
})
export class PendingApprovalsComponent implements OnInit {
  approvalList: UserProfileInfoWithIdDto[] = [];

  constructor(
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.approvalReviewList();
  }

  approvalReviewList(): void {
    this.adminService
      .clientsNeedingApproval()
      .subscribe({ next: (data) => {
        this.approvalList = data;
        console.log(this.approvalList);


      },
      error: (err) => console.log(err) });
  }
}
