import { Injectable } from '@angular/core';
import { GroupList } from '../subject-list/subject/group-list/GroupList';
import { UserService } from '../user.service';
import { ClassInformation } from '../subject-list/subject/group-list/ClassInformation';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  public tempTimetable: GroupList[] = [];
  public timetableName: string = '';
  changeData = new Subject<GroupList[]>();

  constructor(private userService: UserService) { }

  addToTimetable(group: GroupList): boolean {
    const index = this.tempTimetable.findIndex(groupAux => groupAux.name === group.name);
    // console.log(index);
    if (index === -1 && !this.groupCollides(group.classInfo)) {
      this.tempTimetable.push(group);
      // console.table(this.tempTimetable);
      this.notifyChanges();
      return true;
    } else if (index >= 0 && this.tempTimetable[index].groupCode !== group.groupCode && !this.groupCollides(group.classInfo)) {
      this.tempTimetable.splice(index, 1);
      this.tempTimetable.push(group);
      // console.table(this.tempTimetable);
      this.notifyChanges();
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
      this.notifyChanges();
      return group;
    }
    return undefined;
  }

  notifyChanges() {
    console.log(this.tempTimetable.slice());
    this.changeData.next(this.tempTimetable.slice());
  }

}
