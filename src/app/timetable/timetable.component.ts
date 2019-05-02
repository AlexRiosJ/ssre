import { Component, OnInit, Input } from '@angular/core';
import { Timetable } from './Timetable';
import { GroupList } from '../subject-list/subject/group-list/GroupList';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  constructor() { }

  @Input() groups: GroupList[];
  private subjectMatrix = new Array(8);
  public colorsOfSubjects = new Array(8);

  ngOnInit() {
    this.createSubjectMatrix();
  }

  createSubjectMatrix() {
    const colors: string[] = ['aqua', 'darkcyan', 'lightblue', 'lightgreen', 'lightpink', 'skyblue', 'violet'];

    for (let i = 0; i < 8; i++) {
      this.subjectMatrix[i] = new Array(6);
      this.colorsOfSubjects[i] = new Array(6);
    }

    const hoursMap = { '7:00': 0, '9:00': 1, '11:00': 2, '13:00': 3, '15:00': 4, '16:00': 5, '18:00': 6, '20:00': 7 };

    for (const group of this.groups) {
      for (const info of group.classInfo) {
        const hour = hoursMap[info.time];
        console.log(typeof info.day);

        this.colorsOfSubjects[hour][Number(info.day)] = colors[group.id % 7];
        this.subjectMatrix[hour][Number(info.day)] = group;
      }
    }
  }
}
