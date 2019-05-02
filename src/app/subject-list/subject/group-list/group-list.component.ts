import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from '../Subject';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor() { }

  @Input() subject: Subject;

  ngOnInit() {
  }

  show() {
    this.childModal.show();
  }

  hide() {
    this.childModal.hide();
  }

}
