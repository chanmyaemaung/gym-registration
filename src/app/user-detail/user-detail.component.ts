import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  public userId!: number;
  public userDetails!: User;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => {
      this.userId = val['id'];
      this.fetchUserDetails(this.userId);
    });
  }

  fetchUserDetails(userID: number) {
    this.api.getRegisterUserById(userID).subscribe((res) => {
      this.userDetails = res;
      console.log(this.userDetails);
    });
  }
}
