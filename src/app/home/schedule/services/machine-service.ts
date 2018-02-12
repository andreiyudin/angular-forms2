import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';
import 'rxjs/Rx';
import * as _ from "lodash";


@Injectable()
export class MachineService {
    private headers = new Headers;

    constructor(private http: Http) {

    }

    getBreadPackagingMachines() {
        return Observable.of([{ "machineId": 1, "orders": [] }, { "machineId": 2, "orders": [] }, { "machineId": 3, "orders": [] }, { "machineId": 4, "orders": [] }]);
    }

    getSmallBreadPackagingMachines() {

    }

    getFakeBreadPackagingMachines() {
        return [{ "machineId": 1, "orders": [] }, { "machineId": 2, "orders": [] }, { "machineId": 3, "orders": [] }, { "machineId": 4, "orders": [] }];
    }

}
