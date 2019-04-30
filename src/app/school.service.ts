import { Injectable } from '@angular/core';
import { Subject } from './subject-list/subject/Subject';
import { Teacher } from './teacher/Teacher';
import { GroupList } from './subject-list/subject/group-list/GroupList';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  public subjects: Subject[] = [];
  public teachers: Teacher[] = [];
  public groups: GroupList[] = [];

  constructor() {

    let requestURL = 'https://api.myjson.com/bins/1h7z7k';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    // request.responseType = 'json';
    request.send();
    let self = this;
    request.onload = function () {
      let jsonFile = request.response;
      //console.log(jsonFile);
      let subjects = JSON.parse(jsonFile);

      for (let subject of subjects) {
        self.addSubject(subject.name, subject.description, subject.credits, subject.area, subject.department, subject.groups);
        for (let group of subject['groups']) {
          self.groups.push(group);
        }
      }

      for (let group of self.groups) {
        self.teachers.push(group['teacher']);
        console.log(group['teacher']);
      }



      self.addSubject("Micros", "Lorem", 8, "Ipsum", "X", null);
      console.log(self.subjects)
      self.modifySubjectByName("Micros", null, "Y", null, null, "Infierno", null);
      console.log(self.subjects)
      self.deleteSubjectByName("Micros");
      console.log(self.subjects)
    };
  }

  addSubject(name: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    let id = 0;
    if(this.subjects.length > 0) id = this.subjects[-1].id + 1;

    let newSubject = new Subject(id, name, description, credits, area, department, groups);
    this.subjects.push(newSubject);
  }

  modifySubjectById(id: number, name: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    let subjectIndex = this.subjects.findIndex(sub => sub.id == id);

    if(subjectIndex != -1) {
      if(name != null) this.subjects[subjectIndex].name = name;
      if(description != null) this.subjects[subjectIndex].description = description;
      if(credits != null) this.subjects[subjectIndex].credits = credits;
      if(area != null) this.subjects[subjectIndex].area = area;
      if(department != null) this.subjects[subjectIndex].department = department;
      if(groups != null) this.subjects[subjectIndex].groups = groups;
    }
  }

  modifySubjectByName(nameToSearch: string, newName: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    let subjectIndex = this.subjects.findIndex(sub => sub.name == nameToSearch);

    if(subjectIndex != -1) {
      if(newName != null) this.subjects[subjectIndex].name = name;
      if(description != null) this.subjects[subjectIndex].description = description;
      if(credits != null) this.subjects[subjectIndex].credits = credits;
      if(area != null) this.subjects[subjectIndex].area = area;
      if(department != null) this.subjects[subjectIndex].department = department;
      if(groups != null) this.subjects[subjectIndex].groups = groups;
    }
  }

  deleteSubjectById(id: number) {
    let subjectIndex = this.subjects.findIndex(sub => sub.id == id);

    if(subjectIndex != -1) {
      this.subjects.splice(subjectIndex, 1);
    }
  }

  deleteSubjectByName(name: string) {
    let subjectIndex = this.subjects.findIndex(sub => sub.name == name);

    if(subjectIndex != -1) {
      this.subjects.splice(subjectIndex, 1);
    }
  }
}
