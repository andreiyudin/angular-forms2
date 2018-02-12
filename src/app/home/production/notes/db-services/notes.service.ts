import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';
import 'rxjs/Rx';

@Injectable()
export class NotesService {
  private headers = new Headers;

  constructor(private http: Http) {

  }

  get(from, to) {
    var res = this.http.get('notes/' + from + '/' + to, { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    return res;
  }

  adjustDateTime(adjustmentReasons) {
    adjustmentReasons = adjustmentReasons.json();

    adjustmentReasons.forEach(adjustmentReason => {
      adjustmentReason.datetime = moment(adjustmentReason.datetime).format("YYYY-MM-DD HH:mm");
    });

    return adjustmentReasons;
  }

  getNoteById(id) {
    var res = this.http.get('note/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('note', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  delete(id) {
    var res = this.http.delete('note/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('note', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  updateMany(array) {
    const body = JSON.stringify(array);
    const headers = new Headers();
    return this.http.put('notes', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.json());
  }

}
