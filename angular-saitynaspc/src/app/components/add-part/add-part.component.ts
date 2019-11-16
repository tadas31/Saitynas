import { Component, OnInit } from '@angular/core';
import { PartService } from '../../services/part.service';

import { Part } from '../../models/Part';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;

  part: Part = new Part();
  parts: Part[] = [];

  constructor(private partServive:PartService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(!this.isAdmin)
      this.router.navigate(['/404']);

    this.part.type = "";
  }

  onSubmit(){
    this.partServive.addPart(this.part).subscribe(part =>{
      this.parts.push(part);
      this.router.navigate(['/part/' + part.id]);
    });
  }

}
