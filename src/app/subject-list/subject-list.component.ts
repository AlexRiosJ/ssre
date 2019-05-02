import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
import { Subject } from './subject/Subject';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
  }

  getSubjects(): Subject[] {
    return this.schoolService.allSubjects;
  }
}
