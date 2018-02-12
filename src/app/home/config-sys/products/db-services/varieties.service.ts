import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';

import 'rxjs/Rx';

@Injectable()
export class VarietiesService {

    constructor(private http: Http) {

    }

    getVarieties() {
        var res = this.getFakeVarieties();
        return res;
    }

    getFakeVarieties() {
        return [
            {
                'varietyId': 1,
                'type': 2,
                'description': 'Bread1'
            },
            {
                'varietyId': 2,
                'type': 2,
                'description': 'Bread2'
            }
          
        ]
      }
}