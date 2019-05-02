import { Injectable } from '@angular/core';
import { Student } from './student/Student';
import { Timetable } from './timetable/Timetable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  students: Student[] = [
    new Student('is703358', 'Carmen', 'Martinez', null, '123'),
    new Student('is1234', 'Mariana', 'Sierra', null, '234')
  ];
  activeStudent: Student;
  userName = new Subject<string>();

  constructor() { }

  getStudents(): Student[] {
    return this.students;
  }

  setActiveStudent(s: Student) {
    console.log(s);
    this.activeStudent = Object.assign({}, s);
  }

  getActiveStudent(): Student {
    return this.activeStudent ? this.activeStudent : null;
  }

  changeUserName() {
    console.log(this.activeStudent)
    this.userName.next(this.activeStudent.name);
  }

}
