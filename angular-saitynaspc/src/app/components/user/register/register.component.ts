import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Token } from 'src/app/models/Token';
import { RegistrationData } from 'src/app/models/registrationData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string = localStorage.getItem('UserName');

  name: string;
  email: string;
  password: string;

  registrationData: RegistrationData[] = [];
  token: Token[] = [];

  error: String;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userName != null)
      this.router.navigate(['/404']);
  }

  onSubmit() {
    const data: RegistrationData = {
      'name': this.name,
      email: this.email,
      password: this.password
    }

    this.userService.register(data).subscribe(
        registrationData => {
        this.registrationData.push(registrationData);

        this.userService.login(this.email, this.password).subscribe(token => {
          this.token.push(token);
          localStorage.setItem('Token', this.token[0].token_type + " " + this.token[0].access_token);
          this.userService.userData(this.token[0].access_token).subscribe(user =>{
            localStorage.setItem('UserId', user.id);
            localStorage.setItem('UserName', user.name);
            localStorage.setItem('Email', user.email);
            localStorage.setItem('IsAdmin', JSON.stringify(user.is_admin));

            window.location.replace('');
          });
        });

      },
      error => {
        this.error = "Email already exists";
      }
    );

  }

}
