import { Component, OnInit, Input } from '@angular/core';
import { GroupList } from 'src/app/subject-list/subject/group-list/GroupList';

@Component({
  selector: 'app-timeline-group',
  templateUrl: './timeline-group.component.html',
  styleUrls: ['./timeline-group.component.css']
})
export class TimelineGroupComponent implements OnInit {

  constructor() { }

  @Input() group: GroupList;
  @Input() color: string;

  ngOnInit() {
  }

  getStyle(): string {
    return 'background-color: ' + this.color + ';';
  }

}
