import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  username: string;
  id: string;
  major: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getActiveStudent().name + ' ' + this.userService.getActiveStudent().lastname;
    this.id = this.userService.getActiveStudent().id;
    this.major = this.userService.getActiveStudent().major;
  }

}
