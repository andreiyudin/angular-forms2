import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../db-services/products.service';
import { CollectionsService } from '../../../../shared/services/collections.service';

import * as moment from 'moment/moment';
import * as _ from "lodash";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VarietiesService } from '../db-services/varieties.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [CollectionsService, VarietiesService]
})
export class ProductsListComponent implements OnInit {
  products: Array<any>;
  varieties: Array<any>;
  filteredVarieties: Array<any>;
  filteredProducts: Array<any>;
  moment = moment;
  toUpdate: boolean;
  productListForm: FormGroup;
  counter = 0;

  filters = {
    productId: '',
    inactive: false,
    breadType: 1,
    varietyType: 2
  };

  alertMessage: any = {
    message: '',
    type: 'success'
  };

  constructor(private productService: ProductsService, private varietiesService: VarietiesService, private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.getData();
    this.createProductListForm();
  }

  changeBreadFilter(value) {
    this.filters.breadType = value;
    this.modelize();
  }

  setProductListForm(product) {
    this.productListForm.controls['breadType'].setValue(product.breadType);
  }

  createProductListForm() {
    this.productListForm = new FormGroup(
      {
        breadType: new FormControl('1'),
      }
    );
  }

  onSkuInfo(productIn: any[]) {
    this.productService.productToModify.emit(productIn);
  }

  filter() {
    // this.filteredProducts = _.filter(this.filteredProducts, (product) => {
    //   var res: boolean;
    //   if (this.collectionsService.isObjectFilled(this.filters, ["inactive"])) {
    //     return this.collectionsService.filterObjectProperties(product, this.collectionsService.contains, this.filters, ["inactive"]);
    //   } else {
    //     return true;
    //   }
    // });

    // filter varieties
    this.filteredVarieties = _.filter(this.varieties, {'type': this.filters.varietyType}) ;

    if (this.filters.inactive ) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = _.filter(this.products, {'inactive': false});
    }

    this.modelize();
  }

  modelize(){
    this.filteredVarieties.forEach((variety,i,a)=>{
      variety.products = _.filter(this.filteredProducts,{'varietyId':variety.varietyId, 'breadType': this.filters.breadType});
    })
  }

  filterPeriod() {
    this.getData();
    this.filter();
  }
  
  getData() {
    this.products = this.productService.getFakeProducts2();
    this.varieties = this.varietiesService.getFakeVarieties();
    this.filter();
    // this.productService.getProducts().subscribe(products => {
    //   this.products = products;
    //   this.filteredProducts = products;
    //   this.filter();
    // });
  }

  eraseFilter() {
    this.collectionsService.eraseProperties(this.filters, ["from", "to"]);
    this.filter();
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  save() {

    var arrayPromises = [];
    let productsToUpdate = JSON.parse(JSON.stringify(this.products));

    this.productService.updateMany(productsToUpdate).toPromise().then((products) => {
      this.setData(products);
      this.toUpdate = false;
      this.alertMessage.message = "Enregistrement réussi!"
      this.alertMessage.type = "success";
      this.clearMessage(2);
    }).catch((error) => {
      this.alertMessage.message = "Erreur Enregistrement"
      this.alertMessage.type = "danger";
    });

  }

  setData(products) {
    this.products = products;
    this.filter();
  }

  clearMessage(time) {
    setTimeout(() => {
      this.alertMessage.message = ''
    }, time * 1000);
  }
}
