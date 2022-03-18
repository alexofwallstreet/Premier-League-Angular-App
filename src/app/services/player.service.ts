import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment, ApiPaths} from "../environments/environment";
import {Player} from "../interfaces/Player";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUri = environment.baseUrl + ApiPaths.Players;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getPlayers(page: number = 1): Observable<any> {
    return this.http.get<any>(this.apiUri + `?page=${page}`);
  }

  updatePlayer(player: Player): Observable<any> {
    const url = this.apiUri + '/' + player.id;
    const playerToUpdate = {
      id: player.id,
      name: player.name,
      surname: player.surname,
      player_position_id: player.position.id,
      team_id: player.team.id
    }
    return this.http.put(url, playerToUpdate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.getCookie('access_token')}`
      })
    });
  }
}
