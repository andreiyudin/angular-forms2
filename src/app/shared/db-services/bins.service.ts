import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';

@Injectable()
export class BinsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getBins() {
    var res = this.http.get('bins/', { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('bins', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('bins', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }


  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
