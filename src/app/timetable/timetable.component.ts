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
  private subjectMatrix: GroupList[][] = [];
  public colorsOfSubjects: string[][] = [];

  ngOnInit() {
    this.createSubjectMatrix();
  }

  createSubjectMatrix() {
    const colors: string[] = ['aqua', 'cornflowerblue', 'darkcyan', 'lightblue', 'lightgreen', 'lightpink', 'skyblue', 'violet'];

    for (let i = 0; i < 8; i++) {
      this.subjectMatrix.push([null, null, null, null, null, null]);
      this.colorsOfSubjects.push(['', '', '', '', '', '', '']);
    }

    const hoursMap = { '7:00': 0, '9:00': 1, '11:00': 2, '13:00': 3, '15:00': 4, '16:00': 5, '18:00': 6, '20:00': 7 };

    console.log(this.groups.length);
    for (const group of this.groups) {
      for (const info of group.classInfo) {
        const hour = hoursMap[info.day];
        this.colorsOfSubjects[hour][info.day] = colors[(hour * 10 + info.day) % 8];
        this.subjectMatrix[hour][info.day] = group;
      }
    }
  }

}
