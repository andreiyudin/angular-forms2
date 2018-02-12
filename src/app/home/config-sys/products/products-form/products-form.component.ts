import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { ProductsService } from '../db-services/products.service';

import * as _ from "lodash";

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  productForm: FormGroup;
  userInfo: any = {};
  todayDate = new Date().toISOString().split('T')[0];
  productToUpdate: any = [];

  alertMessage: any = {
    message: '',
    type: 'success'
  };

  products: any = [];
  product: any = {};
  bins: any = [];
  new: boolean = true;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router) {
  }

  getProductToUpdateData() {
    this.productsService.getProductToModify().subscribe(productModify => {
        this.product = productModify;
        console.log(this.product);
        console.log(this.product.productId);
        this.setProductsForm(this.product);
        // this.products.push(productModify);
        // this.product = this.products[0];
        // console.log(this.product.productId);
      });
  }

  ngOnInit() {
    // this.getData();
    this.getProductToUpdateData();
    this.createProductsForm();
  }

  // ngOnDestroy() {
  //   this.productsService.getProductToModify().unsubscribe();
  // }

  setProductsForm(product) {
    this.productForm.controls['productId'].setValue(product.productId);
    this.productForm.controls['breadType'].setValue(product.breadType);
    this.productForm.controls['packer1'].setValue(product.packer1);
    this.productForm.controls['packer2'].setValue(product.packer2);
    this.productForm.controls['packer3'].setValue(product.packer3);
    this.productForm.controls['packer4'].setValue(product.packer4);
    this.productForm.controls['packer5'].setValue(product.packer5);
    this.productForm.controls['packer6'].setValue(product.packer6);
    this.productForm.controls['packer7'].setValue(product.packer7);
    this.productForm.controls['packer8'].setValue(product.packer8);
    this.productForm.controls['packer9'].setValue(product.packer9);
    this.productForm.controls['packer10'].setValue(product.packer10);
    this.productForm.controls['packer11'].setValue(product.packer11);
    this.productForm.controls['varietyId'].setValue(product.variety);
    this.productForm.controls['trayHeight'].setValue(product.trayHeight);
    this.productForm.controls['sliceWidth'].setValue(product.sliceWidth);
    this.productForm.controls['patron'].setValue(product.patron);
    this.productForm.controls['quantityPackage'].setValue(product.quantityPackage);
    this.productForm.controls['bagType'].setValue(product.bagType);
    this.productForm.controls['dateModified'].setValue(product.dateModified);
    this.productForm.controls['inactive'].setValue(product.inactive);
  }

  createProductsForm() {
    this.productForm = new FormGroup(
      {
        productId: new FormControl('', Validators.required),
        breadType: new FormControl('1'),
        packer1: new FormControl('', Validators.required),
        packer2: new FormControl('', Validators.required),
        packer3: new FormControl('', Validators.required),
        packer4: new FormControl('', Validators.required),
        packer5: new FormControl('', Validators.required),
        packer6: new FormControl('', Validators.required),
        packer7: new FormControl('', Validators.required),
        packer8: new FormControl('', Validators.required),
        packer9: new FormControl('', Validators.required),
        packer10: new FormControl('', Validators.required),
        packer11: new FormControl('', Validators.required),
        varietyId: new FormControl('1', Validators.required),
        trayHeight: new FormControl('', Validators.required),
        sliceWidth: new FormControl('', Validators.required),
        patron: new FormControl('', Validators.required),
        quantityPackage: new FormControl('1', Validators.required),
        bagType: new FormControl('1', Validators.required),
        dateModified: new FormControl('', Validators.required),
        inactive: new FormControl('1')
      }
    );
  }

  isProductIdNotExist(c: FormControl) {
    let found = _.find(this.products, { 'productId': c.value })
    let ret = (found && this.new) ? {
      present: {
        valid: false
      }
    } : null;
    return ret;
  }

  getData() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.route.params.subscribe(params => {
      if (params.id != 'new') {
        this.new = false;
        this.productsService.getProductById(params.id).subscribe(product => {
          this.product = product[0];
          this.setProductsForm(this.product);
        });
      }
    });

  }

  addForm() {
    this.router.navigate(["/home/products/form/new"]);
    this.new = true;
    this.product = {};
    this.productForm.reset();
  }

  delete() {
    this.productsService.delete(this.product.productId).subscribe(data => {
      this.router.navigate(["/home/products/list"]);
    }, error => {
      this.showErrorMsg();
    });
  }

  save(form) {
    if (form.valid) {
      if (!this.new) {
        this.productsService.update(form.value).subscribe((product) => {
          this.new = false;
          this.showSuccessMsg();
          this.setProductsForm(product)
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        form.value.position = this.products.length+1;
        this.productsService.create(form.value).subscribe((product) => {
          this.new = false;
          this.products.push(product);
          this.productForm.markAsPristine();
          this.showSuccessMsg();
          this.setProductsForm(product)
        }, (error) => {
          this.showErrorMsg();
        });
      }
    }
  }

  showSuccessMsg() {
    this.alertMessage.message = "Enregistrements Réussi!"
    this.alertMessage.type = "success";
    this.clearMessage(2);
  }

  showErrorMsg() {
    this.alertMessage.message = 'Erreur Enregistrement';
    this.alertMessage.type = 'danger';
  }

  clearMessage(time) {
    setTimeout(() => {
      this.alertMessage.message = ''
    }, time * 1000);
  }

}
