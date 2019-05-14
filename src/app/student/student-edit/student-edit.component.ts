import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Student } from '../Student';
import { UserService } from '../../user.service';

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
              private userService: UserService) { }

  ngOnInit() {
    this.student = new Student('', '', '',
    {
      name: '',
      subjects: []
    },
    [], '', 'ISC');
  }

  submit(form: NgForm) {
    const id = form.value.id;
    const studentAux = this.userService.getStudents().find(s => s.id.toUpperCase() === id.toUpperCase());
    if (studentAux) {
      this.invalidEntry = true;
      this.errorMessage = 'Usuario ya existente';
      form.reset();
    } else {
      if (form.value.password !== form.value.confirmPassword) {
        this.invalidEntry = true;
        this.errorMessage = 'Las contraseñas deben coincidir';
      } else {
        this.userService.setActiveStudent(Object.assign ({}, this.student));
        this.authService.login();
        this.router.navigate(['/home'], {relativeTo: this.route});
      }
    }
    form.reset();
  }
}
