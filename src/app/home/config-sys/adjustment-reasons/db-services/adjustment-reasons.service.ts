import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';

import 'rxjs/Rx';

@Injectable()
export class AdjustmentReasonsService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  getAdjustmentReasons() {
    var res = this.http.get('adjustmentreasons', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    return res;
  }

  getAdjustmentReasonsCount() {
    var res = this.http.get('adjustmentreasons/count', { headers: this.headers }).map((response: Response) => response.json()).toPromise();
    return res;
  }
  
  getPredefinedAdjustmentReasons() {
    var res = this.http.get('explanation/adjustmentreasons', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    return res;
  }

  getAdjustmentReasonById(id) {
    var res = this.http.get('adjustmentreason/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  adjustDateTime(adjustmentReasons) {
    adjustmentReasons = adjustmentReasons.json();

    adjustmentReasons.forEach(adjustmentReason => {
      adjustmentReason.datetime = moment(adjustmentReason.datetime).format("YYYY-MM-DD HH:mm");
    });

    return adjustmentReasons;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('adjustmentreason', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('adjustmentreason', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  updatePromise(form){
    return this.update(form).toPromise();
  }

  delete(id) {
    const headers = new Headers();
    return this.http.delete('adjustmentreason' + "/" + id, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  // [ https://www.json-generator.com/ 
  // [
  //   '{{repeat(10, 10)}}',
  //   {   
  //     adjustmentReasonId:'{{index()}}',
  //     description:'{{lorem(3,"words")}}',
  //     explanation:'{{integer(0, 1)}}'
  //   }
  // ]

  getFakeAdjustmentReasons () {
    return [
      {
        "adjustmentReasonId": 0,
        "description": "est reprehenderit ipsum",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 1,
        "description": "ipsum commodo consectetur",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 2,
        "description": "dolor amet fugiat",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 3,
        "description": "commodo quis pariatur",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 4,
        "description": "in eiusmod nulla",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 5,
        "description": "incididunt cupidatat est",
        "explanation": 0
      },
      {
        "adjustmentReasonId": 6,
        "description": "deserunt dolore exercitation",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 7,
        "description": "dolor commodo esse",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 8,
        "description": "elit elit proident",
        "explanation": 1
      },
      {
        "adjustmentReasonId": 9,
        "description": "non ad sit",
        "explanation": 0
      }
    ]
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }



}
