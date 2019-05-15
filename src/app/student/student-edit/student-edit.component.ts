import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from '../Student';
import { UserService } from '../../user.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  majorList = ['ISC', 'ISI', 'IE', 'IES'];
  student: Student;
  invalidEntry: boolean;
  errorMessage: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit() {
    this.student = new Student('', '', '', '',
      {
        name: '',
        subjects: []
      },
      [], '', 'ISC', 'student', 'dummyToken', 0);
  }

  submit(form: NgForm) {
    const id = form.value.id;
    const studentAux = this.userService.getStudents().find(s => s.id.toUpperCase() === id.toUpperCase());
    if (studentAux) {
      this.invalidEntry = true;
      this.errorMessage = 'Usuario ya existente';
      form.reset();
    } else {
      if (form.value.password !== form.value.confirmPassword) {
        this.invalidEntry = true;
        this.errorMessage = 'Las contraseñas deben coincidir';
      } else {
        this.http.post(environment.apiUrl + '/user', {
          id: this.student.id,
          name: this.student.name,
          lastname: this.student.lastname,
          currentTimetable: this.student.currentTimetable,
          timetables: this.student.timetables,
          password: this.student.password,
          major: this.student.major,
          access: this.student.access,
          token: this.student.token
        }).subscribe(data => {
          this.http.post(environment.apiUrl + '/login', {
            id: form.value.id,
            password: form.value.password
          }).subscribe(data2 => {
            // tslint:disable-next-line: no-string-literal
            if (data2['message'] === 'success') {
              this.userService.setActiveStudent(Object.assign({}, this.student));
              this.authService.login();
              this.router.navigate(['/home'], { relativeTo: this.route });
            } else {
              this.invalidEntry = true;
              this.errorMessage = 'Error al registrar usuario';
            }
          });
        });
      }
    }
  }
}
