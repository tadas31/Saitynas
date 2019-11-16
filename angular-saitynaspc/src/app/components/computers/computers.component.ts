import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../services/computer.service';

import { Computer } from '../../models/Computer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.css']
})
export class ComputersComponent implements OnInit {

  computers: Computer[];

  userId: string = localStorage.getItem('UserId');
  passedUserId: string;

  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;


  constructor(private computerService: ComputerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.passedUserId = this.route.snapshot.paramMap.get('userId');

    if (this.passedUserId == null)
    {
      this.computerService.getComputers().subscribe(
        computers => {
          this.computers = computers;
        },
        error => {
          this.router.navigate(['/404']);
        }
      );
    }
    else {
      this.computerService.getComputerByUserId(this.passedUserId).subscribe(
        computers => {
          this.computers = computers;
        },
        error => {
          this.router.navigate(['/404']);
        }
      );
    }
  }



}
