import { Component, OnInit } from '@angular/core';
import { GroupList } from '../subject-list/subject/group-list/GroupList';
import { ClassInformation } from '../subject-list/subject/group-list/ClassInformation';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { TimetableService } from '../timetable/timetable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline-create',
  templateUrl: './timeline-create.component.html',
  styleUrls: ['./timeline-create.component.css']
})
export class TimelineCreateComponent implements OnInit {

  tempTimetable: GroupList[] = [];
  noNameInTimetable = false;
  repeatedTimetableName = false;
  created = false;
  private suscript: Subscription;

  constructor(private userService: UserService, private timetableService: TimetableService) { }

  ngOnInit() {
    this.suscript = this.timetableService.changeData
      .subscribe((timetable: GroupList[]) => {
          this.tempTimetable = timetable;
    });
  }

  submit(formulario: NgForm) {
    const timetableToSend = this.timetableService.tempTimetable;
    const index = this.userService.getActiveStudent().timetables.findIndex(timetable => timetable.name === formulario.value.name);
    if (index === -1 && formulario.value.name !== '' && formulario.value.name !== null) {
      this.created = true;
      this.repeatedTimetableName = false;
      this.noNameInTimetable = false;
      this.timetableService.timetableName = formulario.value.name;
      this.userService.getActiveStudent().timetables.push({ name: formulario.value.name, subjects: timetableToSend });
      this.tempTimetable = [];
      this.timetableService.tempTimetable = this.tempTimetable;
    } else if (index >= 0) {
      this.repeatedTimetableName = true;
      this.noNameInTimetable = false;
      this.created = false;
    } else {
      this.noNameInTimetable = true;
      this.created = false;
      this.repeatedTimetableName = false;
    }
    formulario.reset();
  }

}
