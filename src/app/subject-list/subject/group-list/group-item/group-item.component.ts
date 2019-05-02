import { Component, OnInit, Input } from '@angular/core';
import { GroupList } from '../GroupList';
import { ClassInformation } from '../ClassInformation';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {

  constructor() { }

  @Input() group: GroupList;

  ngOnInit() {
  }

  getTime(classInfo: ClassInformation): string {
    const startHour = classInfo.time.split(':')[0];
    const endHour = Number(startHour) + 2;

    return classInfo.time + ' - ' + endHour + ':00';
  }

  getDay(classInfo: ClassInformation): string {
    const daysMap = ['L', 'M', 'I', 'J', 'V', 'S'] ;
    console.log(daysMap[classInfo.day] + ': ' + classInfo.day);
    return daysMap[classInfo.day];
  }

}
