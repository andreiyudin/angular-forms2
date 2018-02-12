import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import 'rxjs/Rx';

@Injectable()
export class ProductsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getProducts() {
    var res = this.http.get('products/', { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('products', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('products', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
