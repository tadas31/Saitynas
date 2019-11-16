import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;

  users: User[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.isAdmin) {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        this.users.sort((a, b) => { return Number(b.is_admin) - Number(a.is_admin)});
      });
    }
    else {
      this.router.navigate(['/404']);
    }
  }

  makeAdmin(userId: string) {
    this.userService.makeAdmin(userId).subscribe(user => {
      this.ngOnInit();
    });
  }

}
