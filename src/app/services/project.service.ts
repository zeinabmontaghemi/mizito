import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://your-backend-url/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/all`);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

  createProject(projectData: {
    name: string;
    teamId: number;
    imageUrl: string;
  }): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/project`, projectData);
  }

  updateProject(
    projectId: number,
    projectData: { name: string; teamId: number; imageUrl: string }
  ): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${projectId}`, projectData);
  }

  deleteProject(ProjectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${ProjectId}`);
  }
}
