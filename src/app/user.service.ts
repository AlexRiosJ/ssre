import { Injectable } from '@angular/core';
import { Student } from './student/Student';
import { Timetable } from './timetable/Timetable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  students: Student[] = [
    new Student('is703358', 'Carmen', 'Martinez',
    {
      name: 'xd',
      subjects: [
      { id: 2, name: 'Arqui', teacher: 
                                  { id: 0, name: 'Johan', lastname: 'Perez' },
          classInfo: [{ classRoom: 'D-116', day: 2, time: '11:00', language: 'Spanish' },
                      { classRoom: 'T-204', day: 3, time: '11:00', language: 'Spanish' }]
      }]
    },
    [], '123', 'Ing. Sistemas Computacionales'),
    new Student('is708932', 'Alejandro', 'Rios',
      {
        name: 'xd',
        subjects: [
          { id: 2, name: 'Arqui', teacher:
                                    { id: 0, name: 'Johan', lastname: 'Perez' },
            classInfo: [{ classRoom: 'D-116', day: 2, time: '11:00', language: 'Spanish' },
                        { classRoom: 'T-204', day: 3, time: '11:00', language: 'Spanish' }]
          }]
      },
     [], '1234', 'Ing. Sistemas Computacionales'),
    new Student('is708903', 'Carlo', 'Muñoz',
    {
      name: 'xd',
      subjects: [
        { id: 2, name: 'Arqui', teacher: 
                                  { id: 0, name: 'Johan', lastname: 'Perez' },
          classInfo: [{ classRoom: 'D-116', day: 2, time: '11:00', language: 'Spanish' },
                      { classRoom: 'T-204', day: 3, time: '11:00', language: 'Spanish' }]
        }]
    },
    [], '098', 'Ing. Sistemas Computacionales'),
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
