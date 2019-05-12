import { Component, OnInit, Input } from '@angular/core';
import { GroupList } from '../subject-list/subject/group-list/GroupList';

@Component({
  selector: 'app-timetable-list',
  templateUrl: './timetable-list.component.html',
  styleUrls: ['./timetable-list.component.css']
})
export class TimetableListComponent implements OnInit {

  constructor() { }

  @Input() groups: GroupList[];

  ngOnInit() {
  }

  getGroups(): GroupList[] {
    return this.groups;
  }

  getDay(day: string): string {
// tslint:disable-next-line: max-line-length
    return day === '0' ? 'Lunes' : day === '1' ? 'Martes' : day === '2' ? 'Miércoles' : day === '3' ? 'Jueves' : day === '4' ? 'Viernes' : day === '5' ? 'Sábado' : '';
  }

}
