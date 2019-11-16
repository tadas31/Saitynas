import { Component, OnInit } from '@angular/core';
import { PartService } from '../../services/part.service';
import { RouterExtService } from '../../services/router-ext.service';

import { Part } from '../../models/Part';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css']
})
export class PartsComponent implements OnInit {

  parts: Part[];
  type: string;

  isAdmin: boolean = (localStorage.getItem('IsAdmin') == "1") ? true : false;
  userId: string = localStorage.getItem('UserId');

  constructor(private partServive: PartService, private route: ActivatedRoute, private router: Router, private routerExtService: RouterExtService) {

   }

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type');

    if (this.type == null){
      this.partServive.getParts().subscribe(
        parts => {
          this.parts = parts;
        },
        error => {
          this.router.navigate(['/404']);
        }
      );
    }
    else{
      this.partServive.getsPartsByType(this.type).subscribe(
        parts => {
          this.parts = parts;
        },
        error => {
          this.router.navigate(['/404']);
        }
      );
    }
  }

  onDelete(partId: string, responce: boolean){
    if (responce)
      this.partServive.deletePart(partId).subscribe(part => {
        this.ngOnInit();
      });
  }

  addPart(partType: string, partId: string) {
    let previous = this.routerExtService.getPreviousUrl();
    if(previous.indexOf('editcomputer') != -1) {
      localStorage.setItem('update_' + partType, partId);
      this.router.navigate([previous]);
    }
    else {
      localStorage.setItem(partType, partId);
      this.router.navigate(['/newcomputer']);
    }
  }
}
