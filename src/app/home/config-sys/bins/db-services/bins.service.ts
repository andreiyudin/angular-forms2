import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';

import 'rxjs/Rx';

@Injectable()
export class BinsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getBins() {
    var res = this.http.get('bins', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    return res;
  }

  getBinById(id) {
    var res = this.http.get('bin/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  adjustDateTime(bins) {
    bins = bins.json();

    bins.forEach(bin => {
      bin.datetime = moment(bin.datetime).format("YYYY-MM-DD HH:mm");
    });

    return bins;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('bin', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('bin', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  updateMany(bins) {
    const body = JSON.stringify(bins);
    const headers = new Headers();
    return this.http.put('bins', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  delete(id) {
    const headers = new Headers();
    return this.http.delete('bin' + "/" + id, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }


  private handleError(error: any) {
    return Observable.throw(error.json());
  }

  // [ https://www.json-generator.com/ 
  //   '{{repeat(10, 10)}}',
  //   {   
  //     binId:'{{integer(100,500)}}',
  //   }
  // ]

  getFakeBins() {
    return [
      {
        "binId": 101,
        "inactive":true
      },
      {
        "binId": 100,
        "inactive":true
      },
      {
        "binId": 100,
        "inactive":true
      },
      {
        "binId": 102,
        "inactive":false
      },
      {
        "binId": 101,
        "inactive":false
      },
      {
        "binId": 102,
        "inactive":false
      },
      {
        "binId": 102,
        "inactive":false
      },
      {
        "binId": 100,
        "inactive":false
      },
      {
        "binId": 100,
        "inactive":false
      },
      {
        "binId": 104,
        "inactive":false
      }
    ]
  }
}
