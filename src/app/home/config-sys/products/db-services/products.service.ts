import { Injectable, EventEmitter  } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import * as moment from 'moment/moment';
import * as _ from "lodash";
import 'rxjs/Rx';

@Injectable()
export class ProductsService {
  private headers = new Headers;
  productToModify = new EventEmitter<any[]>();
  products2: Array<any>;
  productToUpdate: Array<any>;
  // productToModify: EventEmitter<string[]>= new EventEmitter<string[]>();

  constructor(private http: Http) {

  }

  getProducts() {
    var res = this.http.get('products', { headers: this.headers }).map((response: Response) => this.adjustDateTime(response));
    return res;
  }

  getProductToModify() {
    return this.productToModify;
  }
 
  getProductById(id) {
    var res = this.http.get('product/' + id, { headers: this.headers }).map((response: Response) => response.json());
    return res;
  }

  adjustDateTime(products) {
    products = products.json();

    products.forEach(product => {
      product.datetime = moment(product.datetime).format("YYYY-MM-DD HH:mm");
    });

    return products;
  }

  create(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.post('product', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  update(form) {
    const body = JSON.stringify(form);
    const headers = new Headers();
    return this.http.put('product', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  updateMany(products) {
    const body = JSON.stringify(products);
    const headers = new Headers();
    return this.http.put('products', body, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }

  delete(id) {
    const headers = new Headers();
    return this.http.delete('product' + "/" + id, {
      headers: headers
    }).map((data: Response) => data.json()).catch(this.handleError);
  }


  private handleError(error: any) {
    return Observable.throw(error.json());
  }

  // [ https://www.json-generator.com/ 
  //   '{{repeat(10, 10)}}',
  //   {   
  //     productId:'{{integer(100,500)}}',
  //   }
  // ]

  getFakeProducts() {
    return [
      {
        "productId": 101,
        "description": '',
        "type": 1,
        "variety": 1,
        "inactive":true
      },
      {
        "productId": 100,
        "inactive":true
      },
      {
        "productId": 100,
        "inactive":true
      },
      {
        "productId": 102,
        "inactive":false
      },
      {
        "productId": 101,
        "inactive":false
      },
      {
        "productId": 102,
        "inactive":false
      },
      {
        "productId": 102,
        "inactive":false
      },
      {
        "productId": 100,
        "inactive":false
      },
      {
        "productId": 100,
        "inactive":false
      },
      {
        "productId": 104,
        "inactive":false
      }
    ]
  }

  getFakeProducts2() {
    return [
      {
        'productId': 44,
        'breadType': 1,
        'varietyId': 1,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 55,
        'breadType': 1,
        'varietyId': 1,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 66,
        'breadType': 1,
        'varietyId': 1,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 77,
        'breadType': 1,
        'varietyId': 1,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 88,
        'breadType': 1,
        'varietyId': 1,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 99,
        'breadType': 1,
        'varietyId': 2,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 100,
        'breadType': 1,
        'varietyId': 2,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 101,
        'breadType': 1,
        'varietyId': 2,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 102,
        'breadType': 1,
        'varietyId': 2,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 103,
        'breadType': 1,
        'varietyId': 2,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'packer6': '',
        'packer7': '',
        'packer8': '',
        'packer9': '',
        'packer10': '',
        'packer11': '',
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 104,
        'breadType': 2,
        'varietyId': 1,
        'packer1': '',
        'packer2': '',
        'packer3': '',
        'packer4': '',
        'packer6': 1,
        'packer7': 2,
        'packer8': 1,
        'packer9': 2,
        'packer10': 1,
        'packer11': 2,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 105,
        'breadType': 2,
        'varietyId': 2,
        'packer1': '',
        'packer2': '',
        'packer3': '',
        'packer4': '',
        'packer6': 1,
        'packer7': 2,
        'packer8': 1,
        'packer9': 2,
        'packer10': 1,
        'packer11': 2,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      },
      {
        'productId': 106,
        'breadType': 2,
        'varietyId': 2,
        'packer1': '',
        'packer2': '',
        'packer3': '',
        'packer4': '',
        'packer6': 1,
        'packer7': 2,
        'packer8': 1,
        'packer9': 2,
        'packer10': 1,
        'packer11': 2,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'quantityPackage': 3,
        'bagType': 3,
        'dateModified': '2017-01-01',
        'inactive': false
      }
    ]
  }

  getFakeConfigurationSku() {
    return [
      {
        'variety': 1,
        'productId': 44,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'dateModified': '2017-01-01'
      },
      {
        'variety': 1,
        'productId': 55,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'dateModified': '2017-01-01'
      },
      {
        'variety': 1,
        'productId': 66,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'dateModified': '2017-01-01'
      },
      {
        'variety': 1,
        'productId': 88,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'dateModified': '2017-01-01'
      },
      {
        'variety': 1,
        'productId': 99,
        'packer1': 1,
        'packer2': 2,
        'packer3': 3,
        'packer4': 4,
        'trayHeight': 1,
        'sliceWidth': 2,
        'patron': 3,
        'dateModified': '2017-01-01'
      }
    ]
  }



}
