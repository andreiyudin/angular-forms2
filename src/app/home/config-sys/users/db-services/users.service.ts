import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';

@Injectable()
export class UsersService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getUsers() {
    var res = this.http.get('users', { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  getUser(id) {
    var res = this.http.get('user/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  create(user) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    return this.http.post('user', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(user) {
    const body = JSON.stringify(user);
    const headers = new Headers();
    return this.http.put('user', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  delete(id) {
 
    const headers = new Headers();
    return this.http.delete('user' + "/" + id, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }
  
}
