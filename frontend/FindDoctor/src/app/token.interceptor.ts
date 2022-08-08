import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {UserService} from "./login/user.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  totalRequests = 0;
  requestsCompleted = 0;

  constructor(private userService: UserService, private loader: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    this.totalRequests++;

    if (!this.userService.getUserState()) {
      return next.handle(request).pipe(
        finalize(() => {
          this.requestsCompleted++;
          console.log(this.requestsCompleted, this.totalRequests);
          if (this.requestsCompleted === this.totalRequests) {
            this.loader.hide();
            this.totalRequests = 0;
            this.requestsCompleted = 0;
          }
        })
      );
    }
    const clone = request.clone({setHeaders: {Authorization: `Bearer ${this.userService.userState$.value.token}`}})
    return next.handle(clone).pipe(
      finalize(() => {
        this.requestsCompleted++;
        console.log(this.requestsCompleted, this.totalRequests);
        if (this.requestsCompleted === this.totalRequests) {
          this.loader.hide();
          this.totalRequests = 0;
          this.requestsCompleted = 0;
        }
      })
    );
  }
}
