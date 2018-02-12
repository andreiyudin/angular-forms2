import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';

@Injectable()
export class BatchesService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getBatches() {
    var res = this.http.get('batches/', { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
