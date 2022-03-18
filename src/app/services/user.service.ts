import { Injectable } from '@angular/core';
import {User} from "../interfaces/User";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: User;

  guestUser: User = {
    id: 0,
    name: '',
    email: '',
    remember_token: null,
    role: '',
    is_logged: false
  }

  constructor() {
    this.currentUser = this.guestUser;
  }

  getUser() {
    return this.currentUser;
  }

  setUser(user: User) {
    this.currentUser = user;
  }

  deleteUser() {
    this.currentUser = this.guestUser;
  }
}
