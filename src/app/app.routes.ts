import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjectComponent } from './components/project/project.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { ProjectsBoardComponent } from './components/projects-board/projects-board.component';

export const routes: Routes = [
  { path: 'mizito', component: LoginComponent },
  { path: 'mizito/signin', component: SignInComponent },
  { path: 'mizito/signup', component: SignUpComponent },
  { path: 'mizito/dashboard', component: DashboardComponent },
  {
    path: 'mizito/dashboard/edit-profile/:id',
    component: EditProfileComponent,
  },
  { path: 'mizito/dashboard/project-list', component: ProjectListComponent },
  { path: 'mizito/dashboard/create-project', component: AddProjectComponent },
  // { path: 'dashboard/project-details/:id', component: ProjectComponent },
  {
    path: 'mizito/dashboard',
    children: [
      {
        path: 'project-details/:id',
        component: ProjectComponent, // This is the parent component
        children: [
          {
            path: 'task-list', // For first tab button
            component: TaskListComponent, // The component you want to load when the first tab is clicked
          },
          {
            path: 'project-board', // For second tab button
            component: ProjectsBoardComponent, // The component you want to load when the second tab is clicked
          },
        ],
      },
    ],
  },
  // { path: 'dashboard/task-list', component: TaskListComponent },

  { path: '', redirectTo: 'mizito', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
