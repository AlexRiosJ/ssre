import { Component, OnInit, } from '@angular/core';
import { UserService } from '../user.service';
import { Student } from '../student/Student';
import { NgForm,  } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  student: Student;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  submit(formulario: NgForm) {
    const studentAux = this.userService.getStudents().find(s => s.id.toUpperCase() === formulario.value.id.toUpperCase());
    if (studentAux) {
      if (studentAux.password.toUpperCase() === formulario.value.password.toUpperCase()) {
        this.userService.setActiveStudent(studentAux);
        this.authService.login();
      }
    } else {
      alert('wrong user or password');
    }
    formulario.reset();
  }

}
