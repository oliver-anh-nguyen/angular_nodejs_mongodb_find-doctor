import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "./UserInterface";
import jwtDecode from "jwt-decode";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userState$ = new BehaviorSubject<{token: string}>({token: ''});

  constructor(private  http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<{token: string}>(`${environment.baseUrl}users/login`, {username, password});
  }

  getUserState(): User | null {
    if (!this.userState$ || !this.userState$.value) return null;
    const decoded = this.userState$.value.token && jwtDecode(this.userState$.value.token) as User;
    return decoded || null;
  }

  persistState() {
    localStorage.setItem('userState', JSON.stringify(this.userState$.value));
  }

  refreshState() {
    const userState = localStorage.getItem('userState');
    if (userState) {
      this.userState$.next(JSON.parse(userState));
    }
  }

  logout() {
    this.userState$.next({token: ''});
    localStorage.clear();
  }
}
