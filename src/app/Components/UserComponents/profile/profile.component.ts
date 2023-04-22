import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { UserProfileInfoDto } from 'src/app/Dtos/UserProfileInfoDto ';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  currentUser: UserProfileInfoDto | any;

  ngOnInit(): void {
    this.userService.GetInfo().subscribe({
      next: (data: UserProfileInfoDto) => {
        this.currentUser = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
