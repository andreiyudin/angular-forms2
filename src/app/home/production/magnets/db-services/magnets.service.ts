import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';

@Injectable()
export class MagnetsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getMagnets(from, to) {
    var res = this.http.get('magnets/' + from + '/' + to, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  getMagnetsById(id) {
    var res = this.http.get('magnets/' + id,{ headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('magnets', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('magnets', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
