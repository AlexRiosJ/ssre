import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { SchoolService } from '../school.service';
import { environment } from 'src/environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private schoolService: SchoolService, private http: HttpClient) { }
  showDetails = false;

  ngOnInit() {
  }

  remove(name: string) {
    const index = this.userService.getActiveStudent().timetables.findIndex(timetable => timetable.name === name);
    this.userService.getActiveStudent().timetables.splice(index, 1);
    this.http.patch(environment.apiUrl + '/user/' + this.userService.getActiveStudent().id, {
      timetables: this.userService.getActiveStudent().timetables
    }, {headers: new HttpHeaders({
      'x-auth': this.userService.getActiveStudent().token
    })}).subscribe(data => console.log(data));
  }

}
