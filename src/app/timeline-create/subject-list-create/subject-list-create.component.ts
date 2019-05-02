import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../../school.service';
import { Subject } from '../../subject-list/subject/Subject';
import { GroupListCreateComponent } from './group-list-create/group-list-create.component';

@Component({
  selector: 'app-subject-list-create',
  templateUrl: './subject-list-create.component.html',
  styleUrls: ['./subject-list-create.component.css']
})
export class SubjectListCreateComponent implements OnInit {
  @ViewChild('childModal') childModal: GroupListCreateComponent;
  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
  }

  getSubjects(): Subject[] {
    return this.schoolService.allSubjects;
  }

}
