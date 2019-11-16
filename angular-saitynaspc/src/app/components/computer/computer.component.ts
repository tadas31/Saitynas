import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../../services/computer.service';

import { Computer } from '../../models/Computer';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService } from 'src/app/services/part.service';
import { Part } from 'src/app/models/Part';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {

  computer: Computer;
  id: string;

  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;
  userId: string = localStorage.getItem('UserId');

  cpu : Part = new Part();
  motherboard: Part = new Part();
  ram: Part = new Part();
  case: Part = new Part();
  psu: Part = new Part();

  constructor(private computerService: ComputerService, private partService: PartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.computerService.getComputerById(this.id).subscribe(
      computer => {
        this.computer = computer;

        if (localStorage.getItem('update_cpu') || this.computer.cpu_id)
        this.partService.getsPartsById(localStorage.getItem('update_cpu') ? localStorage.getItem('update_cpu') : this.computer.cpu_id).subscribe(cpu => {
          this.cpu = cpu;
        });

        if (localStorage.getItem('update_motherboard') || this.computer.motherboard_id)
        this.partService.getsPartsById(localStorage.getItem('update_motherboard') ? localStorage.getItem('update_motherboard') : this.computer.motherboard_id).subscribe(motherboard => {
          this.motherboard = motherboard;
        });

        if (localStorage.getItem('update_ram') || this.computer.ram_id)
        this.partService.getsPartsById(localStorage.getItem('update_ram') ? localStorage.getItem('update_ram') : this.computer.ram_id).subscribe(ram => {
          this.ram = ram;
        });

        if (localStorage.getItem('update_case') || this.computer.case_id)
        this.partService.getsPartsById(localStorage.getItem('update_case') ? localStorage.getItem('update_case') : this.computer.case_id).subscribe(newCase => {
          this.case = newCase;
        });

        this.partService.getsPartsById(localStorage.getItem('update_psu') ? localStorage.getItem('update_psu') : this.computer.psu_id).subscribe(
          psu => {
            this.psu = psu;
          },
          error => {
            this.psu = new Part();
            this.psu.type = "psu";
          }
        );

      },
      error => {
        this.router.navigate(['/404']);
      }
    );
  }

  onDelete(computerId: string, responce: boolean) {
    if (responce)
      this.computerService.deleteComputer(computerId).subscribe(computer => {
        this.ngOnInit();
        this.router.navigate(['']);
      });

  }

}
