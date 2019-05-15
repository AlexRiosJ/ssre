import { Injectable } from '@angular/core';
import { Student } from './student/Student';
import { Timetable } from './timetable/Timetable';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  students: Student[] = [];
  activeStudent: Student;
  userName = new Subject<string>();

  constructor(private http: HttpClient) {
    this.activeStudent = null;
    this.http.get(environment.apiUrl + '/user', {
      observe: 'response'
    })
      .subscribe(
        (res: HttpResponse<Student[]>) => {
          this.students = res.body;
        },
        err => console.log(err)
      );
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
