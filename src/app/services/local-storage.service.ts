import { Injectable } from '@angular/core';
import {User} from "../interfaces/User";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private userService: UserService) { }

  getUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }

  setUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userService.setUser(user);
  }

  removeUser() {
    localStorage.removeItem('currentUser');
    this.userService.deleteUser();
  }
}
