import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';

@Injectable()
export class MetalDetectionsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  get(from, to) {
    var res = this.http.get('metaldetections/' + from + '/' + to, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  getMetalDetectionById(id) {
    var res = this.http.get('metaldetection/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('metaldetection', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('metaldetection', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  updateMany(array) {
    const body = JSON.stringify(array);
    const headers = new Headers();
    return this.http.put('metaldetections', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
