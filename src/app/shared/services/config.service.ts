import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {

  }

  get getServerSetting() {
    if (isDevMode()) {
      return {
        address: 'http://localhost:5000'
      }
    } else {
      return {
        address: 'http://192.168.0.253:5000'
      }
    }
  }

}
