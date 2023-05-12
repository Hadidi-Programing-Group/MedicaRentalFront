import {Component, OnInit} from '@angular/core';

import {UserProfileInfoWithIdDto} from 'src/app/Dtos/AdminDto';

import {AdminService} from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-pending-approvals',
  templateUrl: './pending-approvals.component.html',
  styles: [],
})
export class PendingApprovalsComponent implements OnInit {
  approvalList: UserProfileInfoWithIdDto[] = [];

  constructor(
    private readonly adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.approvalReviewList();
  }

  approvalReviewList(): void {
    this.adminService
      .clientsNeedingApproval()
      .subscribe({ next: (data) => {
        this.approvalList = data;


      },
      error: (err) => console.log(err) });
  }
}
