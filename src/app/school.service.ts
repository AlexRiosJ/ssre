import { Injectable } from '@angular/core';
import { Subject } from './subject-list/subject/Subject';
import { Teacher } from './teacher/Teacher';
import { GroupList } from './subject-list/subject/group-list/GroupList';
import { ClassInformation } from './subject-list/subject/group-list/ClassInformation';
import { Timetable } from './timetable/Timetable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  public allSubjects: Subject[] = [];
  public subjects: Subject[] = [];
  public teachers: Teacher[] = [];
  public groups: GroupList[] = [];

  constructor(private http: HttpClient) {

    this.http.get(environment.apiUrl + '/subjects', {
      observe: 'response'
    })
      .subscribe(
        (res: HttpResponse<Subject[]>) => {
          this.allSubjects = res.body;
        },
        err => console.log(err)
      );
  }

  // tslint:disable-next-line: variable-name
  addSubject(_id: string, code: string, name: string, description: string, credits: number,
    // tslint:disable-next-line: variable-name
             area: string, department: string, groups: GroupList[], __v: number) {
    const newSubject = new Subject(_id, code, name, description, credits, area, department, groups, __v);
    this.subjects.push(newSubject);
  }

  // tslint:disable-next-line: max-line-length
  modifySubjectById(code: string, name: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    const subjectIndex = this.subjects.findIndex(sub => sub.code === code);

    if (subjectIndex !== -1) {
      if (name != null) { this.subjects[subjectIndex].name = name; }
      if (description != null) { this.subjects[subjectIndex].description = description; }
      if (credits != null) { this.subjects[subjectIndex].credits = credits; }
      if (area != null) { this.subjects[subjectIndex].area = area; }
      if (department != null) { this.subjects[subjectIndex].department = department; }
      if (groups != null) { this.subjects[subjectIndex].groups = groups; }
    }
  }

  // tslint:disable-next-line: max-line-length
  modifySubjectByName(nameToSearch: string, newName: string, description: string, credits: number, area: string, department: string, groups: GroupList[]) {
    const subjectIndex = this.subjects.findIndex(sub => sub.name === nameToSearch);

    if (subjectIndex !== -1) {
      if (newName != null) { this.subjects[subjectIndex].name = name; }
      if (description != null) { this.subjects[subjectIndex].description = description; }
      if (credits != null) { this.subjects[subjectIndex].credits = credits; }
      if (area != null) { this.subjects[subjectIndex].area = area; }
      if (department != null) { this.subjects[subjectIndex].department = department; }
      if (groups != null) { this.subjects[subjectIndex].groups = groups; }
    }
  }

  deleteSubjectById(code: string) {
    const subjectIndex = this.subjects.findIndex(sub => sub.code === code);

    if (subjectIndex !== -1) {
      this.subjects.splice(subjectIndex, 1);
    }
  }

  deleteSubjectByName(name: string) {
    const subjectIndex = this.subjects.findIndex(sub => sub.name === name);
    console.log(subjectIndex);
    if (subjectIndex !== -1) {
      this.subjects.splice(subjectIndex, 1);
    }
  }

  // tslint:disable-next-line: variable-name
  addGroup(_id: string, groupCode: string, name: string, teacher: Teacher, classInfo: ClassInformation[]) {
    const newGroup = new GroupList(_id, groupCode, name, teacher, classInfo);
    this.groups.push(newGroup);
  }

  modifyGroupById(groupCode: string, name: string, teacher: Teacher, classInfo: ClassInformation[]) {
    const groupIndex = this.groups.findIndex(group => group.groupCode === groupCode);

    if (groupIndex !== -1) {
      if (groupCode != null) { this.groups[groupIndex].groupCode = groupCode; }
      if (name != null) { this.groups[groupIndex].name = name; }
      if (teacher != null) { this.groups[groupIndex].teacher = teacher; }
      if (classInfo != null) { this.groups[groupIndex].classInfo = classInfo; }
    }
  }

  modifyGroupByName(nameToSearch: string, name: string, teacher: Teacher, classInfo: ClassInformation[]) {
    const groupIndex = this.groups.findIndex(group => group.name === nameToSearch);

    if (groupIndex !== -1) {
      if (name != null) { this.groups[groupIndex].name = name; }
      if (teacher != null) { this.groups[groupIndex].teacher = teacher; }
      if (classInfo != null) { this.groups[groupIndex].classInfo = classInfo; }
    }
  }

  deleteGroupById(groupCode: string) {
    const groupIndex = this.groups.findIndex(group => group.groupCode === groupCode);

    if (groupIndex !== -1) {
      this.groups.splice(groupIndex, 1);
    }
  }

  deleteGroupByName(name: string) {
    const groupIndex = this.groups.findIndex(group => group.name === name);

    if (groupIndex !== -1) {

      this.groups.splice(groupIndex, 1);
    }
  }

  addTeacher(name: string, lastName: string) {
    let id = 0;
    if (this.teachers.length > 0) { id = this.teachers[this.teachers.length - 1].id + 1; }

    const teacher = new Teacher(id, name, lastName);
    this.teachers.push(teacher);
  }

  modifyTeacherById(id: number, name: string, lastName: string) {
    const teacherIndex = this.teachers.findIndex(teacher => teacher.id === id);

    if (teacherIndex !== -1) {
      if (name != null) { this.teachers[teacherIndex].name = name; }
      if (lastName != null) { this.teachers[teacherIndex].lastname = lastName; }
    }
  }

  modifyTeacherByName(nameToSearch: string, lastNameToSearch: string, name: string, lastName: string) {
    const teacherIndex = this.teachers.findIndex(teacher => teacher.name === nameToSearch && teacher.lastname === lastNameToSearch);

    if (teacherIndex !== -1) {
      if (name != null) { this.teachers[teacherIndex].name = name; }
      if (lastName != null) { this.teachers[teacherIndex].lastname = lastName; }
    }
  }

  deleteTeacherById(id: number) {
    const teacherIndex = this.teachers.findIndex(teacher => teacher.id === id);

    if (teacherIndex !== -1) {
      this.teachers.splice(teacherIndex, 1);
    }
  }

  deleteTeacherByName(name: string, lastName: string) {
    const teacherIndex = this.teachers.findIndex(teacher => teacher.name === name && teacher.lastname === lastName);

    if (teacherIndex !== -1) {
      this.teachers.splice(teacherIndex, 1);
    }
  }

  getTimetable(): GroupList[] {
    return this.groups;
  }
}
