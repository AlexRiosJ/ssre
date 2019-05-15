import { Component, OnInit, } from '@angular/core';
import { UserService } from '../user.service';
import { Student } from '../student/Student';
import { NgForm, } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  student: Student;
  invalidEntry = false;
  suscribed = false;

  constructor(private userService: UserService,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {
  }

  submit(formulario: NgForm) {
    this.suscribed = false;
    this.invalidEntry = false;
    const id = formulario.value.id;
    const password = formulario.value.password;
    if (id && password) {
      const studentAux = this.userService.getStudents().find(s => s.id.toUpperCase() === id.toUpperCase());
      if (studentAux) {
        this.http.post(environment.apiUrl + '/login', {
          id: studentAux.id,
          password
        }).subscribe(data => {
          this.suscribed = true;
          // tslint:disable-next-line: no-string-literal
          if (data['message'] === 'success') {
            // tslint:disable-next-line: no-string-literal
            studentAux.token = data['token'];
            this.authService.login();
            this.userService.setActiveStudent(studentAux);
          }
        });
        if (!this.suscribed) {
          this.invalidEntry = true;
        }
      } else {
        this.invalidEntry = true;
      }
    } else {
      this.invalidEntry = true;
    }
    formulario.reset();
  }

}
