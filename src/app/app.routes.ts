import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/edit-profile/:id', component: EditProfileComponent },
  { path: 'dashboard/project-list', component: ProjectListComponent },
  { path: 'dashboard/task-list', component: TaskListComponent },
  { path: 'mizito', component: LoginComponent },
  { path: 'mizito/signin', component: SignInComponent },
  { path: 'mizito/signup', component: SignUpComponent },
  { path: 'mizito/dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'mizito', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
