import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  errors = {
    name: '',
    email: '',
    password: '',
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: ''
    })
  }

  onSubmit(): void {
    this.authService.register(this.form.getRawValue())
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/login']);
        },
        error: err => {
          const errors = err.error.errors;
          for (let prop in this.errors) {
            // @ts-ignore
            this.errors[prop] = errors[prop];
          }
        }
      });
  }
}
