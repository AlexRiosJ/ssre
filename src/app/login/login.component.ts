import { Component, OnInit, } from '@angular/core';
import { UserService } from '../user.service';
import { Student } from '../student/Student';
import { NgForm, } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  student: Student;
  invalidEntry = false;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  submit(formulario: NgForm) {
    this.invalidEntry = false;
    const id = formulario.value.id;
    const password = formulario.value.password;
    if (id && password) {
      const studentAux = this.userService.getStudents().find(s => s.id.toUpperCase() === id.toUpperCase());
      if (studentAux) {
        if (studentAux.password.toUpperCase() === password.toUpperCase()) {
          this.invalidEntry = false;
          this.userService.setActiveStudent(studentAux);
          this.authService.login();
        } else {
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
