import { Injectable } from '@angular/core';
import {ApiPaths, environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Match} from "../interfaces/Match";
import {MatchEvent} from "../interfaces/MatchEvent";
import {GameEvent} from "../interfaces/GameEvent";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})

export class MatchService {
  private matchesUri = environment.baseUrl + ApiPaths.Matches;
  private resultsUri = environment.baseUrl + ApiPaths.Results;
  private fixturesUri = environment.baseUrl + ApiPaths.Fixtures;
  private matchEventsUri = environment.baseUrl + ApiPaths.MatchEvents;
  private gameEventsUri = environment.baseUrl + ApiPaths.GameEvents;
  private matchEventTypesUri = environment.baseUrl + ApiPaths.MatchEvents + '/types';
  private gameEventTypesUri = environment.baseUrl + ApiPaths.GameEvents + '/types';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getMatches(page:number = 1) {
    return this.http.get<any>(this.matchesUri + `?page=${page}`);
  }

  getFixtures() {
    return this.http.get<any>(this.fixturesUri);
  }

  getResults() {
    return this.http.get<any>(this.resultsUri);
  }

  getMatch(id: number) {
    return this.http.get<any>(this.matchesUri + `/${id}`);
  }

  addMatch(match: any) {
    const matchData = {
      home_team_id: match.home_team.id,
      away_team_id: match.away_team.id,
      stadium_id: match.stadium.id,
      date: match.date.replace('T', ' ')+':00'
    };
    return this.http.post<any>(this.matchesUri, matchData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('access_token')}`
      })
    });
  }

  postMatchEvent(match: Match, event: MatchEvent) {
    const data = {
      match_id: match.id,
      match_event_type_id: event.event_type.id,
      minute: event.minute,
      description: event.description
    }
    return this.http.post<any>(this.matchEventsUri, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('access_token')}`
      })
    });
  }

  postGameEvent(match: Match, event: GameEvent) {
    const data = {
      match_id: match.id,
      game_event_type_id: event.event_type.id,
      minute: event.minute,
      description: event.description,
      team_id: event.team_id,
      player_id: event.player_id
    }
    return this.http.post<any>(this.gameEventsUri, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('access_token')}`
      })
    });
  }

  getMatchEventTypes() {
    return this.http.get<any>(this.matchEventTypesUri);
  }

  getGameEventTypes() {
    return this.http.get<any>(this.gameEventTypesUri);
  }
}
