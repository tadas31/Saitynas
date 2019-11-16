import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: string = localStorage.getItem('UserId');
  userName: string = localStorage.getItem('UserName');
  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.logout(localStorage.getItem('Token').split(" ")[1]).subscribe(message => {
      localStorage.clear();
      window.location.replace('');
    });

  }

}
