import { Component, OnInit } from '@angular/core';
import { PartService } from '../../services/part.service';
import { Router } from '@angular/router';

import { Part } from '../../models/Part';
import { ActivatedRoute } from '@angular/router';
import { RouterExtService } from 'src/app/services/router-ext.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {

  part: Part;
  id: string;

  isAdmin: boolean= (localStorage.getItem('IsAdmin') == "1") ? true : false;
  userId: string = localStorage.getItem('UserId');

  constructor(private partServive:PartService, private route: ActivatedRoute, private router: Router, private routerExtService: RouterExtService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.partServive.getsPartsById(this.id).subscribe(
        part =>{
          this.part = part;
        },
        error => {
          this.router.navigate(['/404']);
        }
      );
    }
  }

  onDelete(partId: string, partType: string, responce: boolean){
    if (responce){
      this.partServive.deletePart(partId).subscribe(part => {
        this.router.navigate(['/parts/' + partType])
      });
    }
  }

  addPart(partType: string, partId: string) {
    let previous = this.routerExtService.getPreviousPreviousUrl();
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
