import { Injectable } from '@angular/core';
import {ApiPaths, environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  private stadiumsApi = environment.baseUrl + ApiPaths.Stadiums;

  constructor(private http: HttpClient) {
  }

  getStadiums(): Observable<any> {
    return this.http.get<any>(this.stadiumsApi);
  }
}

