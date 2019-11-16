import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/models/Computer';
import { ComputerService } from '../../services/computer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Part } from 'src/app/models/Part';
import { PartService } from 'src/app/services/part.service';

@Component({
  selector: 'app-edit-computer',
  templateUrl: './edit-computer.component.html',
  styleUrls: ['./edit-computer.component.css']
})
export class EditComputerComponent implements OnInit {

  userId: string = localStorage.getItem('UserId');

  id: string;

  computer: Computer = new Computer();
  computers: Computer[] = [];

  cpu : Part = new Part();
  motherboard: Part = new Part();
  ram: Part = new Part();
  case: Part = new Part();
  psu: Part = new Part();

  constructor(private computerService: ComputerService, private partService: PartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(this.userId == null)
      this.router.navigate(['/404']);

    this.id = this.route.snapshot.paramMap.get('id');

    this.computerService.getComputerById(this.id).subscribe(
      computer => {
        this.computer = computer;
        if(this.userId != computer.user_id)
          this.router.navigate(['/404']);

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

  onEdit() {
    const newComputer: Computer = {
      id: this.id,
      name: this.computer.name,
      description: this.computer.description,
      image_url: this.computer.image_url,
      motherboard_id: localStorage.getItem('update_motherboard') ? localStorage.getItem('update_motherboard') : this.computer.motherboard_id,
      cpu_id: localStorage.getItem('update_cpu') ? localStorage.getItem('update_cpu') : this.computer.cpu_id,
      ram_id: localStorage.getItem('update_ram') ? localStorage.getItem('update_ram') : this.computer.ram_id,
      case_id:localStorage.getItem('update_case') ? localStorage.getItem('update_case') : this.computer.case_id,
      psu_id: localStorage.getItem('update_psu') ? localStorage.getItem('update_psu') : this.computer.psu_id,
      user_id: null
    }

    this.computerService.editComputer(newComputer).subscribe(computer => {
      this.computers.push(computer);

      localStorage.removeItem('update_motherboard');
      localStorage.removeItem('update_cpu');
      localStorage.removeItem('update_ram');
      localStorage.removeItem('update_case');
      localStorage.removeItem('update_psu');
      window.location.replace('/computer/' + computer.id);
    });
  }

  removePart(partType: string) {
    localStorage.removeItem('update_' + partType);
    switch (partType) {
      case "cpu":
        this.cpu = new Part();
        break;
      case "motherboard":
          this.motherboard = new Part();
          break;
      case "ram":
          this.ram = new Part();
          break;
      case "case":
          this.case = new Part();
          break;
      case "psu":
          this.psu = new Part();
          this.psu.type = "psu";
          break;
    }
  }

}
