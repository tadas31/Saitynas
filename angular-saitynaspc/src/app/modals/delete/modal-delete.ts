import {Component, Input, Output, EventEmitter} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-delete',
  templateUrl: './modal-delete.html'
})
export class NgbdModalDelete {

  @Input() itemToDelete: string;
  @Output() deleteResponce = new EventEmitter();

  closeResult: string;

  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
    (result) => {
      if (result == 'ok')
        this.responce(true)
      else
        this.responce(false)
    },
     (reason) => {
        this.responce(false)
    });
  }

  responce(responce: boolean) {
    this.deleteResponce.emit(responce);
  }
}
