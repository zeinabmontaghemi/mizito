import { Injectable } from '@angular/core';
import { Team, CreateOrUpdateTeam } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly baseUrl = 'https://api.example.com/teams'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  /**
   * Get team details by ID.
   * @param teamId Team ID.
   */
  getTeam(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/${teamId}`);
  }

  /**
   * Get all teams.
   */
  getAllTeams(): Observable<Team[]> {
    return this.http
      .get<{ teams: Team[] }>(`${this.baseUrl}/all`)
      .pipe(map((response) => response.teams));
  }

  /**
   * Create a new team.
   * @param team Team creation payload.
   */
  createTeam(team: CreateOrUpdateTeam): Observable<Team> {
    return this.http.post<Team>(this.baseUrl, team);
  }

  /**
   * Update an existing team.
   * @param teamId Team ID.
   * @param team Team update payload.
   */
  updateTeam(teamId: number, team: CreateOrUpdateTeam): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/${teamId}`, team);
  }

  /**
   * Delete a team by ID.
   * @param teamId Team ID.
   */
  deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${teamId}`);
  }

  /**
   * Add a member to a team.
   * @param teamId Team ID.
   * @param memberId Member ID.
   */
  addMemberToTeam(teamId: number, memberId: number): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/${teamId}/members`, {
      memberId,
    });
  }

  /**
   * Remove a member from a team.
   * @param teamId Team ID.
   * @param memberId Member ID.
   */
  removeMemberFromTeam(teamId: number, memberId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${teamId}/members/${memberId}`
    );
  }
}
