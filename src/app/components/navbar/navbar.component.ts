import { Component, OnInit } from '@angular/core';
import {User} from "../../interfaces/User";
import {LocalStorageService} from "../../services/local-storage.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user!: User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
