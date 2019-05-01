import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/school.service';
import { Subject } from 'src/app/subject-list/subject/Subject';

@Component({
  selector: 'app-subject-list-create',
  templateUrl: './subject-list-create.component.html',
  styleUrls: ['./subject-list-create.component.css']
})
export class SubjectListCreateComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
  }

  getSubjects(): Subject[] {
    return this.schoolService.allSubjects;
  }

}
