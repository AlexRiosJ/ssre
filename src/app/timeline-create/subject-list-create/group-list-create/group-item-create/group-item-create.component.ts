import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupList } from 'src/app/subject-list/subject/group-list/GroupList';
import { ClassInformation } from 'src/app/subject-list/subject/group-list/ClassInformation';

@Component({
  selector: 'app-group-item-create',
  templateUrl: './group-item-create.component.html',
  styleUrls: ['./group-item-create.component.css']
})
export class GroupItemCreateComponent implements OnInit {

  @Input() group: GroupList;
  @Output() addGroup = new EventEmitter();
  @Output() removeGroup = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getTime(classInfo: ClassInformation): string {
    const startHour = classInfo.time.split(':')[0];
    const endHour = Number(startHour) + 2;
    return classInfo.time + ' - ' + endHour + ':00';
  }

  getDay(classInfo: ClassInformation): string {
    const daysMap = ['L', 'M', 'I', 'J', 'V', 'S'];
    return daysMap[classInfo.day];
  }

  groupToAdd() {
    this.addGroup.emit(this.group);
  }

  groupToRemove() {
    this.removeGroup.emit(this.group);
  }

}
