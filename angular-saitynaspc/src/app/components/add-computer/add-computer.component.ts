import { Component, OnInit, DebugElement } from '@angular/core';
import { Computer } from 'src/app/models/Computer';
import { ComputerService } from '../../services/computer.service';
import { PartService } from '../../services/part.service';
import { Part } from 'src/app/models/Part';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-computer',
  templateUrl: './add-computer.component.html',
  styleUrls: ['./add-computer.component.css']
})
export class AddComputerComponent implements OnInit {

  userName: string = localStorage.getItem('UserName');

  name: string;
  description: string;
  image_url: string;

  computers: Computer[] = [];

  cpu : Part = new Part();
  motherboard: Part = new Part();
  ram: Part = new Part();
  case: Part = new Part();
  psu: Part = new Part();


  constructor(private computerService: ComputerService, private partService: PartService, private router: Router) { }

  ngOnInit() {
    if(this.userName == null)
      this.router.navigate(['/404']);

    if (localStorage.getItem('cpu'))
      this.partService.getsPartsById(localStorage.getItem('cpu')).subscribe(cpu => {
        this.cpu = cpu;
      });

    if (localStorage.getItem('motherboard'))
    this.partService.getsPartsById(localStorage.getItem('motherboard')).subscribe(motherboard => {
      this.motherboard = motherboard;
    });

    if (localStorage.getItem('ram'))
    this.partService.getsPartsById(localStorage.getItem('ram')).subscribe(ram => {
      this.ram = ram;
    });

    if (localStorage.getItem('case'))
    this.partService.getsPartsById(localStorage.getItem('case')).subscribe(newCase => {
      this.case = newCase;
    });

    this.partService.getsPartsById(localStorage.getItem('psu')).subscribe(
      psu => {
        this.psu = psu;
      },
      error => {
        this.psu = new Part();
        this.psu.type = "psu";
      }
    );

  }

  onSubmit(){
    const newComputer: Computer = {
      id: null,
      name: this.name,
      description: this.description,
      image_url: this.image_url,
      motherboard_id: localStorage.getItem('motherboard') ,
      cpu_id: localStorage.getItem('cpu'),
      ram_id: localStorage.getItem('ram'),
      case_id: localStorage.getItem('case'),
      psu_id: localStorage.getItem('psu'),
      user_id: null
    }
    this.computerService.addComputer(newComputer).subscribe(computer =>{
      this.computers.push(computer);
      localStorage.removeItem('motherboard');
      localStorage.removeItem('cpu');
      localStorage.removeItem('ram');
      localStorage.removeItem('case');
      localStorage.removeItem('psu');
      window.location.replace('/computer/' + computer.id);
    });
  }

  removePart(partType: string) {
    localStorage.removeItem(partType);
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
