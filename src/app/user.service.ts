import { Injectable } from '@angular/core';
import { Student } from './student/Student';
import { Timetable } from './timetable/Timetable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  students: Student[] = [
    new Student('is703358', 'Carmen', 'Martinez', null, null, '123', 'Ing. Sistemas Computacionales'),
    new Student('is708932', 'Alejandro', 'Rios', null, null, '1234', 'Ing. Sistemas Computacionales'),
    new Student('is708903', 'Carlo', 'Muñoz', null, null, '098', 'Ing. Sistemas Computacionales'),
  ];
  activeStudent: Student;
  userName = new Subject<string>();

  constructor() { 
    this.activeStudent = null;
  }

  getStudents(): Student[] {
    return this.students;
  }

  setActiveStudent(s: Student) {
    this.activeStudent = Object.assign({}, s);
  }

  getActiveStudent(): Student {
    return this.activeStudent ? this.activeStudent : null;
  }

  changeUserName() {
    this.userName.next(this.activeStudent.name);
  }

}
