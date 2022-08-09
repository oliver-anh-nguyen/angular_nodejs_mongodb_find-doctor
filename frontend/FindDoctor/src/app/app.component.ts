import {Component, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";
import {UserService} from "./login/user.service";
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  loading$ = this.loader.loading$;
  isLoggedIn: boolean = false;
  sub!: Subscription;
  username: string = '';
  DEFAULT_AVATAR_URL = 'assets/images/default_avatar.jpeg';
  avatarUrl = '';
  constructor(private userService: UserService, private router: Router,
              public loader: LoadingService) {
    this.sub = this.userService.userState$.subscribe(userState => {
      console.log(userState)
      if (userState && userState.token) {
        this.isLoggedIn = true
        this.username = this.userService.getUserState()?.fullname as string;
        this.avatarUrl = this.userService.getUserState()?.avatarurl as string;
        console.log(this.avatarUrl);
        if (!this.avatarUrl || this.avatarUrl.trim().length === 0) {
          this.avatarUrl = this.DEFAULT_AVATAR_URL;
        }
      } else {
        this.isLoggedIn = false;
      }
    })

    this.userService.refreshState();
    const userState = this.userService.getUserState();
    if (!userState) {
      this.router.navigate(['/', 'login']);
    }
  }

  isPatient(): boolean {
    const userState = this.userService.getUserState();
    if (userState?.role === 'PATIENT') {
      return true
    }
    return false
  }

  isDoctor(): boolean {
    const userState = this.userService.getUserState();
    if (userState?.role === 'DOCTOR') {
      return true
    }
    return false
  }

  search() {
    if (this.isPatient()) {
      this.router.navigate(['/', 'find-doctors']);
    }
  }

  profile() {
    if (this.isPatient()) {
      this.router.navigate(['/', 'profile-patient']);
    }
    if (this.isDoctor()) {
      this.router.navigate(['/', 'profile-doctor']);
    }
  }

  appointments() {
    if (this.isPatient()) {
      this.router.navigate(['/', 'patient']);
    }
    if (this.isDoctor()) {
      this.router.navigate(['/', 'doctor']);
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/', 'login']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
