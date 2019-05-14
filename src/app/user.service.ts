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
        name: 'Horario actual',
        subjects: [
          {

            groupCode: 'ESI1018N',
            name: 'Desarrollo de Aplicaciones y Servicios Web',
            teacher: {
              id: 0,
              name: 'Luis Fernando',
              lastname: 'Gutierrez Preciado'
            },
            classInfo: [{
              classRoom: 'T-202',
              day: '0',
              time: '11:00',
              language: 'Español'
            }, {
              classRoom: 'T-202',
              day: '2',
              time: '11:00',
              language: 'Español'
            }]
          }]
      },
      [], '123', 'ISC'),
    new Student('is708932', 'Alejandro', 'Rios',
      {
        name: 'Horario actual',
        subjects: [
          {

            groupCode: 'ESI1018N',
            name: 'Desarrollo de Aplicaciones y Servicios Web',
            teacher: {
              id: 0,
              name: 'Luis Fernando',
              lastname: 'Gutierrez Preciado'
            },
            classInfo: [{
              classRoom: 'T-202',
              day: '0',
              time: '11:00',
              language: 'Español'
            }, {
              classRoom: 'T-202',
              day: '2',
              time: '11:00',
              language: 'Español'
            }]
          }]
      },
      [], '1234', 'ISC'),
    new Student('is708903', 'Carlo', 'Muñoz',
      {
        name: 'Horario actual',
        subjects: [
          {

            groupCode: 'ESI1018N',
            name: 'Desarrollo de Aplicaciones y Servicios Web',
            teacher: {
              id: 0,
              name: 'Luis Fernando',
              lastname: 'Gutierrez Preciado'
            },
            classInfo: [{
              classRoom: 'T-202',
              day: '0',
              time: '11:00',
              language: 'Español'
            }, {
              classRoom: 'T-202',
              day: '2',
              time: '11:00',
              language: 'Español'
            }]
          }]
      },
      [], '098', 'ISC'),
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
    this.activeStudent = s;
  }

  getActiveStudent(): Student {
    return this.activeStudent ? this.activeStudent : null;
  }

  changeUserName() {
    if (this.activeStudent) {
      this.userName.next(this.activeStudent.name);
    }
  }

}
