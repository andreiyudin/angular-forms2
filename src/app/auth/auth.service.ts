import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';


@Injectable()
export class AuthService {

  private userRightsObservable = new BehaviorSubject(null);

  constructor(private http: Http) {
    this.initAuthToken();
  }

  initAuthToken() {
    var userRights = localStorage.getItem("user");
    var token;
    if (userRights) {
      userRights = JSON.parse(userRights)||{};
      this.userRightsObservable.next(userRights);
    }
  }

  auth(loginfo) {
    const body = JSON.stringify(loginfo);
    const headers = new Headers();
  
    return this.http.post('user/auth', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  getUserRights() {
    return this.userRightsObservable.asObservable().catch(this.handleError);
  }

  setUserRights(userRights) {
    var txt = JSON.stringify(userRights);
    localStorage.setItem("user",txt);
    this.userRightsObservable.next(userRights||{});
  }

  logOff(){
    this.clearUserRights();
    this.userRightsObservable.next({});
  }

  clearUserRights(){
    localStorage.removeItem("user");
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }


}
