import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private schoolService: SchoolService) { }

  ngOnInit() {
  }

}
