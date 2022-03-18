import { Injectable } from '@angular/core';
import {ApiPaths, environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginApi = environment.baseUrl + ApiPaths.Login;
  private googleLoginApi = environment.baseUrl + ApiPaths.GoogleLogin;
  private registerApi = environment.baseUrl + ApiPaths.Register;
  private refreshApi = environment.baseUrl + ApiPaths.Refresh;
  private logoutApi = environment.baseUrl + ApiPaths.Logout;
  private userApi = environment.baseUrl + ApiPaths.User;

  constructor(
    private http: HttpClient
  ) {
  }

  getUser(): Observable<any> {
    return this.http.get<any>(this.userApi)
  }

  login(formData: any): Observable<any> {
    return this.http.post<any>(this.loginApi, formData)
  }

  loginWithGoogle() {
    this.http.get<any>(this.googleLoginApi).subscribe(response => {
      window.location.href = response.url;
    });
  }

  register(formData: any): Observable<any>  {
    return this.http.post(this.registerApi, formData);
  }

  refresh() {
    return this.http.post<any>(this.refreshApi, {})
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutApi, {})
  }
}
