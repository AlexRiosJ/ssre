import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
