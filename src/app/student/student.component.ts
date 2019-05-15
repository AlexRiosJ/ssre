import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Student } from './Student';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @ViewChild('editModal') public modal: ModalDirective;

  username: string;
  id: string;
  major: string;
  student: Student;
  invalidNewPass: boolean;
  isClosed: boolean;
  majorList = ['ISC', 'ISI', 'IE', 'IES'];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.isClosed = false;
    this.invalidNewPass = false;
    this.student = this.userService.getActiveStudent();
    this.username = this.userService.getActiveStudent().name + ' ' + this.userService.getActiveStudent().lastname;
    this.id = this.userService.getActiveStudent().id;
    this.major = this.userService.getActiveStudent().major;
  }

  submit(form: NgForm) {
    this.invalidNewPass = false;
    if (form.value.newPassword) {
      if (form.value.newPassword !== form.value.confirmPassword) {
        this.invalidNewPass = true;
      } else {
          this.student.password = form.value.newPassword;
          this.updateUser();
          form.reset();
      }
    } else {
      this.updateUser();
      form.reset();
    }
  }

  updateUser() {
    this.userService.setActiveStudent(Object.assign ({}, this.student));
    this.userService.changeUserName();
    document.getElementById('closeModal').click();
    this.router.navigate(['/home']);
  }

}
