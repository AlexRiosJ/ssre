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

  constructor(private timetable: TimelineCreateComponent) { }

  @Input() subject: Subject;

  ngOnInit() {
  }

  show() {
    this.childModal.show();
  }

  hide() {
    this.childModal.hide();
  }

  addGroupToTimetable(group: GroupList) {
    const added = this.timetable.addToTimetable(group);
    console.log(added);
  }

  removeGroupToTimetable(group: GroupList) {
    const removed = this.timetable.removeToTimetable(group);
    console.log(removed);
  }

}
