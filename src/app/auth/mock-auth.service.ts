import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/Rx';


@Injectable()
export class MockAuthService {

  constructor() {

  }

  getUserRights() {
    return Observable.of({});
  }




}
