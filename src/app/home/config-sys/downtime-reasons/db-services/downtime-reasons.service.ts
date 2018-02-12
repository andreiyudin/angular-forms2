import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';

import 'rxjs/Rx';

@Injectable()
export class DowntimeReasonsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getDowntimeReasons() {
    var res = this.http.get('downtimereasons', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    return res;
  }

  getDowntimeReasonsCount() {
    var res = this.http.get('downtimereasons/count', { headers: this.headers }).map((response: Response) => response.json()).toPromise();
    return res;
  }
  

  getDowntimeReasonById(id) {
    var res = this.http.get('downtimereason/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  adjustDateTime(downtimeReasons) {
    downtimeReasons = downtimeReasons.json();

    downtimeReasons.forEach(downtimeReason => {
      downtimeReason.datetime = moment(downtimeReason.datetime).format("YYYY-MM-DD HH:mm");
    });

    return downtimeReasons;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('downtimereason', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('downtimereason', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  updatePromise(form) {
    return this.update(form).toPromise();
  }

  delete(id) {
    const headers = new Headers();
    return this.http.delete('downtimereason' + "/" + id, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  // [ https://www.json-generator.com/ 
  // [
  //   '{{repeat(10, 10)}}',
  //   {   
  //     downtimeReasonId:'{{index()}}',
  //     description:'{{lorem(3,"words")}}',
  //     predefined:'{{integer(0, 1)}}'
  //   }
  // ]

  getFakeDowntimeReasons () {
    return [
      {
        "downtimeReasonId": 0,
        "description": "est reprehenderit ipsum",
        "predefined": 1
      },
      {
        "downtimeReasonId": 1,
        "description": "ipsum commodo consectetur",
        "predefined": 1
      },
      {
        "downtimeReasonId": 2,
        "description": "dolor amet fugiat",
        "predefined": 1
      },
      {
        "downtimeReasonId": 3,
        "description": "commodo quis pariatur",
        "predefined": 1
      },
      {
        "downtimeReasonId": 4,
        "description": "in eiusmod nulla",
        "predefined": 1
      },
      {
        "downtimeReasonId": 5,
        "description": "incididunt cupidatat est",
        "predefined": 0
      },
      {
        "downtimeReasonId": 6,
        "description": "deserunt dolore exercitation",
        "predefined": 1
      },
      {
        "downtimeReasonId": 7,
        "description": "dolor commodo esse",
        "predefined": 1
      },
      {
        "downtimeReasonId": 8,
        "description": "elit elit proident",
        "predefined": 1
      },
      {
        "downtimeReasonId": 9,
        "description": "non ad sit",
        "predefined": 0
      }
    ]
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }



}
