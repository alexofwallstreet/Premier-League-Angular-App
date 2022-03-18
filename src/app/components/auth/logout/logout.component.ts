import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "../../../services/cookie.service";
import {AuthService} from "../../../services/auth.service";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.authService.logout().subscribe(response => {
      this.cookieService.deleteCookie('access_token');
      this.cookieService.deleteCookie('expires_at');
      this.localStorageService.removeUser();
      this.router.navigate(['']);
    });
  }
}
