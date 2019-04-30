import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  constructor() { }

  ngOnInit() {
  }

  show(){
    this.childModal.show();
  }

  hide(){
    this.childModal.hide();
  }

}
