import { Injectable } from '@angular/core';
import {ApiPaths, environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../interfaces/Position";

@Injectable({
  providedIn: 'root'
})
export class PlayerPositionService {
  private positionsUri = environment.baseUrl + ApiPaths.PlayerPositions;

  constructor(private http: HttpClient) {
  }

  getPositions(page: number = 1): Observable<any> {
    return this.http.get<any>(this.positionsUri);
  }
}

