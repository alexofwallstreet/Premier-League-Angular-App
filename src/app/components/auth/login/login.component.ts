import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {CookieService} from "../../../services/cookie.service";
import {AuthInterceptor} from "../../../interceptors/auth.interceptor";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  error = ""

  constructor(
    private formBilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.form = this.formBilder.group({
      email: '',
      password: ''
    })
  }

  onSubmit(): void {
    this.authService.login(this.form.getRawValue())
      .subscribe({
        next: response => {
          this.cookieService.setCookie('access_token', response.access_token, response.expires_in);
          this.cookieService.setCookie('expires_at', response.expires_in, response.expires_in);
          AuthInterceptor.accessToken = response.access_token;
          this.authService.getUser().subscribe(user => {
            this.localStorageService.setUser(user.data);
            this.router.navigate(['']);
          })
        },
        error: err => {
          this.error = 'Incorrect login or password';
        }
      });
  }


}
