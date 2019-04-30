import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GroupListComponent } from './group-list/group-list.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @ViewChild('childModal') childModal :GroupListComponent;
  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
  }

}
