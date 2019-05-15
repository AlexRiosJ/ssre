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
  public subjectMatrix = new Array(8);
  public colorsOfSubjects = new Array(8);

  ngOnInit() {
    this.createSubjectMatrix();
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentChecked() {
    this.createSubjectMatrix();
  }

  createSubjectMatrix() {
    const colors: string[] = ['#ffcccc', '#fffa65', '#cd84f1', '#7efff5', '#78e08f', '#c7ecee', '#63cdda', '#fad390', '#b8e994', '#e55039'];

    for (let i = 0; i < 8; i++) {
      this.subjectMatrix[i] = new Array(6);
      this.colorsOfSubjects[i] = new Array(6);
    }

    const hoursMap = { '7:00': 0, '9:00': 1, '11:00': 2, '13:00': 3, '15:00': 4, '16:00': 5, '18:00': 6, '20:00': 7 };

    if (this.groups !== undefined) {
// tslint:disable-next-line: forin
      for (const index in this.groups) {
        for (const info of this.groups[index].classInfo) {
          const hour = hoursMap[info.time];
          this.colorsOfSubjects[hour][Number(info.day)] = colors[index];
          this.subjectMatrix[hour][Number(info.day)] = this.groups[index];
        }
      }
    }
  }
}
