import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Subject } from '../../../subject-list/subject/Subject';
import { GroupList } from '../../../subject-list/subject/group-list/GroupList';
import { TimelineCreateComponent } from '../../timeline-create.component';

@Component({
  selector: 'app-group-list-create',
  templateUrl: './group-list-create.component.html',
  styleUrls: ['./group-list-create.component.css']
})
export class GroupListCreateComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;

  unableToAdd = false;
  added = false;

  constructor(private timetable: TimelineCreateComponent) { }

  @Input() subject: Subject;

  ngOnInit() {
    this.unableToAdd = false;
    this.added = false;
  }

  show() {
    this.childModal.show();
  }

  hide() {
    this.childModal.hide();
  }

  addGroupToTimetable(group: GroupList): boolean {
    this.unableToAdd = this.timetable.addToTimetable(group) ? false : true;
    this.added = !this.unableToAdd;
    return this.added;
  }

  removeGroupToTimetable(group: GroupList): GroupList {
    return this.timetable.removeToTimetable(group);
  }

}
