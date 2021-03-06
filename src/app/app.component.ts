import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {LocalStorageService} from "./services/local-storage.service";
import {AuthService} from "./services/auth.service";
import {CookieService} from "./services/cookie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthInterceptor} from "./interceptors/auth.interceptor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;
  title = 'premier-league-frontend';

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const token = this.cookieService.getCookie('access_token');
    if (token) {
      AuthInterceptor.accessToken = token;
      this.authService.getUser()
        .subscribe({
          next: (user: any) => {
            this.localStorageService.setUser(user.data);
          },
          error: () => {
            this.router.navigate(['/login']);
          }
        })
    } else {
      this.route.queryParams.subscribe(params => {
        if (params['access_token']) {
          this.cookieService.setCookie('access_token', params['access_token'], params['expires_at']);
          this.cookieService.setCookie('expires_at', params['expires_at'], params['expires_at']);
          AuthInterceptor.accessToken = params['access_token'];
          this.authService.getUser()
            .subscribe({
              next: (user: any) => {
                this.localStorageService.setUser(user.data);
              },
              error: () => {
                this.router.navigate(['/login']);
              }
            })
        }
      })
    }
  }
}
