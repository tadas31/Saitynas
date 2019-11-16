import { Component, OnInit } from '@angular/core';
import { PartService } from '../../services/part.service';

import { Part } from '../../models/Part';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.css']
})
export class EditPartComponent implements OnInit {

  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;

  id: string;

  part: Part = new Part();
  parts: Part[] = [];

  constructor(private partServive:PartService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(!this.isAdmin)
      this.router.navigate(['/404']);

    this.id = this.route.snapshot.paramMap.get('id');

    this.partServive.getsPartsById(this.id).subscribe(
      part => {
        this.part = part;
      },
      error => {
        this.router.navigate(['/404']);
      }
    );
  }

  onEdit() {
    this.partServive.editPart(this.part).subscribe(part => {
      this.parts.push(part);
      this.router.navigate(['/part/' + part.id]);
    });
  }

}
