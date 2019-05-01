import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LandingComponent } from './landing/landing.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { StudentComponent } from './student/student.component';
import { TimelineCreateComponent } from './timeline-create/timeline-create.component';

const routes: Routes = [
  {path: '', component :HomeComponent, canActivate: [AuthGuardService]},
  {path: 'home', component: HomeComponent,  canActivate: [AuthGuardService] },
  {path: 'landing', component: LandingComponent},
  {path: 'about', component: AboutComponent},
  {path: 'subjects', component: SubjectListComponent},
  {path: 'preferences', component: StudentComponent},
  {path: 'create', component: TimelineCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
