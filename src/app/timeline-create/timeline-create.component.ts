import { Component, OnInit } from '@angular/core';
import { GroupList } from '../subject-list/subject/group-list/GroupList';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-timeline-create',
  templateUrl: './timeline-create.component.html',
  styleUrls: ['./timeline-create.component.css']
})
export class TimelineCreateComponent implements OnInit {

  constructor() { }

  tempTimetable = [];

  ngOnInit() {
  }

  addToTimetable(group: GroupList): boolean {
    const index = this.tempTimetable.findIndex(groupAux => {
      return groupAux.name === group.name;
    });
    console.log(index);
    if (index === -1) {
      this.tempTimetable.push(group);
      return true;
    } else if (this.tempTimetable[index].id !== group.id) {
      this.tempTimetable.splice(index, 1);
      this.tempTimetable.push(group);
      return true;
    }
    return false;
  }

  removeToTimetable(group: GroupList): GroupList {
    const index = this.tempTimetable.findIndex(groupAux => {
      return groupAux.id === group.id;
    });
    if (index >= 0) {
      this.tempTimetable.splice(index, 1);
      return group;
    }
    return undefined;
  }

}
