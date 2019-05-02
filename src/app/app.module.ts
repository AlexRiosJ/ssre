import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TimetableComponent } from './timetable/timetable.component';
import { StudentComponent } from './student/student.component';
import { SubjectComponent } from './subject-list/subject/subject.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { TeacherComponent } from './teacher/teacher.component';
import { GroupListComponent } from './subject-list/subject/group-list/group-list.component';
import { GroupItemComponent } from './subject-list/subject/group-list/group-item/group-item.component';
import { LoginComponent } from './login/login.component';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { FormsModule } from '@angular/forms';
import { TimelineCreateComponent } from './timeline-create/timeline-create.component';
import {SubjectListCreateComponent} from './timeline-create/subject-list-create/subject-list-create.component';
import { TimelineGroupComponent } from './timetable/timeline-group/timeline-group/timeline-group.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimetableComponent,
    StudentComponent,
    SubjectComponent,
    SubjectListComponent,
    HomeComponent,
    AboutComponent,
    LandingComponent,
    TeacherComponent,
    GroupListComponent,
    GroupItemComponent,
    LoginComponent,
    StudentEditComponent,
    TimelineCreateComponent,
    SubjectListCreateComponent,
    TimelineGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
