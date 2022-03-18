import { Injectable } from '@angular/core';
import {ApiPaths, environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../interfaces/Team";
import {CookieService} from "./cookie.service";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsUri = environment.baseUrl + ApiPaths.Teams;
  private teamsListUri = environment.baseUrl + ApiPaths.TeamsList;
  private favoriteTeamUri = environment.baseUrl + ApiPaths.UserFavoriteTeam;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getTeams(user: User): Observable<any> {
    return this.http.get<any>(this.teamsUri + `?user_id=${user.id}`);
  }

  getTeamsList(user: User): Observable<any> {
    return this.http.get<any>(this.teamsListUri + `?user_id=${user.id}`);
  }

  getTeamTable(): Observable<any> {
    return this.http.get<any>(this.teamsUri + ApiPaths.Table);
  }

  addUserFavoriteTeam(team: Team, user: User): Observable<any> {
    return this.http.post<any>(this.favoriteTeamUri,
      {user_id: user.id, team_id: team.id}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('access_token')}`
      })
    });
  }

  deleteUserFavoriteTeam(team: Team): Observable<any> {
    const url = this.favoriteTeamUri + `/${team.is_favorite.id}`;
    return this.http.delete<any>(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('access_token')}`
      })
    });
  }
}
