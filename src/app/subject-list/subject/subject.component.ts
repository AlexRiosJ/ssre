import { Component, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { GroupListComponent } from './group-list/group-list.component';
import { Subject } from './Subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @ViewChild('childModal') childModal: GroupListComponent;
  constructor(private viewContainerRef: ViewContainerRef) { }

  @Input() subject: Subject;

  ngOnInit() {
  }

}
