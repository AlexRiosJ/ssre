import { Component, OnInit } from '@angular/core';
import { GroupList } from '../subject-list/subject/group-list/GroupList';
import { ClassInformation } from '../subject-list/subject/group-list/ClassInformation';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-timeline-create',
  templateUrl: './timeline-create.component.html',
  styleUrls: ['./timeline-create.component.css']
})
export class TimelineCreateComponent implements OnInit {

  public tempTimetable: GroupList[] = [];
  timetableName = '';
  noNameInTimetable = false;
  repeatedTimetableName = false;
  created = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  addToTimetable(group: GroupList): boolean {
    const index = this.tempTimetable.findIndex(groupAux => groupAux.name === group.name);
    // console.log(index);
    if (index === -1 && !this.groupCollides(group.classInfo)) {
      this.tempTimetable.push(group);
      // console.table(this.tempTimetable);
      return true;
    } else if (index >= 0 && this.tempTimetable[index].groupCode !== group.groupCode && !this.groupCollides(group.classInfo)) {
      this.tempTimetable.splice(index, 1);
      this.tempTimetable.push(group);
      // console.table(this.tempTimetable);
      return true;
    }
    return false;
  }

  groupCollides(groupClassInfo: ClassInformation[]): boolean {
    for (const subject of this.tempTimetable) {
      for (const classInfo of subject.classInfo) {
        for (const currentClassInfo of groupClassInfo) {
          if (classInfo.day === currentClassInfo.day && classInfo.time === currentClassInfo.time) {
            return true;
          }
        }
      }
    }
    return false;
  }

  removeToTimetable(group: GroupList): GroupList {
    const index = this.tempTimetable.findIndex(groupAux => groupAux.groupCode === group.groupCode);
    if (index >= 0) {
      this.tempTimetable.splice(index, 1);
      return group;
    }
    return undefined;
  }

  submit(formulario: NgForm) {
    const timetableToSend = this.tempTimetable;
    const index = this.userService.getActiveStudent().timetables.findIndex(timetable => timetable.name === formulario.value.name);
    if (index === -1 && formulario.value.name !== '' && formulario.value.name !== null) {
      this.created = true;
      this.repeatedTimetableName = false;
      this.noNameInTimetable = false;
      this.timetableName = formulario.value.name;
      this.userService.getActiveStudent().timetables.push({ name: formulario.value.name, subjects: timetableToSend });
    } else if (index >= 0) {
      this.repeatedTimetableName = true;
      this.noNameInTimetable = false;
      this.created = false;
    } else {
      this.noNameInTimetable = true;
      this.created = false;
      this.repeatedTimetableName = false;
    }
    this.tempTimetable = [];
    formulario.reset();
  }

}
