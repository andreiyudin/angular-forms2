import { Injectable } from '@angular/core';
import * as _ from "lodash";

@Injectable()
export class CollectionsService {

  constructor() {

  }

  filterObjectProperties(obj, callback, filters, exception = []) {
    let res = true;
    let val;

    for (var key in filters) {
      if (Object.prototype.hasOwnProperty.call(filters, key)) {
        if (!(exception.indexOf(key) > -1) && filters[key] !== '') {
          if (res) {
            val = obj[key];
            res = callback(val, filters[key]);
          }
        }
      }
    }

    return res;
  }

  contains(val, needle) {
    let res;
    val = val + "";
    val = val.toUpperCase();
    res = val.indexOf(needle.toUpperCase()) > -1;

    return res;
  }

  isObjectFilled(obj, exception = []) {
    var res;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (!(exception.indexOf(key) > -1) && obj[key] !== '') {
          res = true;
        }

      }
    }

    return res;
  }

  convertCollectionBooleanString(array: any, booleanProperties: Array<string>, trueStr: string, falseStr: string) {
    array.forEach((e, i, a) => {
      this.convertBooleanString(e, booleanProperties, trueStr, falseStr);
    });
  }

  convertBooleanString(obj: any, booleanProperties: Array<string>, trueStr: string, falseStr: string) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if ((booleanProperties.indexOf(key) > -1)) {
          if (obj[key]) {
            obj[key] = trueStr;
          } else {
            obj[key] = falseStr;
          }
        }

      }
    }
  }

  convertCollectionStringToBoolean(array: any, booleanProperties: Array<string>, trueStr: string, falseStr: string) {
    array.forEach((e, i, a) => {
      this.convertStringToBoolean(e, booleanProperties, trueStr, falseStr);
    });
  }

  convertStringToBoolean(obj: any, booleanProperties: Array<string>, trueStr: string, falseStr: string) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if ((booleanProperties.indexOf(key) > -1)) {
          if (obj[key] == trueStr) {
            obj[key] = 1;
          } else {
            obj[key] = 0;
          }
        }

      }
    }
  }

  eraseProperties(obj, exception) {
    var res;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (!(exception.indexOf(key) > -1)) {
          obj[key] = '';
        }

      }
    }

    return res;
  }

  replaceItems(original: Array<any>, newItems: Array<any>, key: string) {
    newItems.forEach((e, i, a) => {
      var index = _.findIndex(original, { key: e[key] });
      original.forEach(function (oe, oi, oa) {
        if (e[key] == oe[key]) {
          index = oi;
        }
      });
      original.splice(index, 1, e);
    });
  }

  changePosition(collection, key, src, dest) {

    let searchObject= {};
    searchObject[key]=src;

    let index = _.findIndex(collection, searchObject);

    if (src >= dest) {
      collection[index][key] = dest - 0.1;
    } else {
      collection[index][key] = dest + 0.1;
    }

    collection = _.orderBy(collection, [key]);
    collection.forEach(function (e, i, a) {
      e[key] = i + 1;
    });

    return collection;

  }



}
