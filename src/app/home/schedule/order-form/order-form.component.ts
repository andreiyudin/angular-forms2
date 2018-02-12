import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { CollectionsService } from '../../../shared/services/collections.service';
import { ProductsService } from 'app/home/config-sys/products/db-services/products.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.createOrderForm();
  }

  createOrderForm() {
    this.orderForm = new FormGroup(
      {
        packer: new FormControl(''),
        breadsPerPack: new FormControl(''),
        products: new FormControl('', Validators.required),
        area: new FormControl(''),
        quantityBreads: new FormControl('', Validators.required),
        bagType: new FormControl(''),
        priority: new FormControl(''),
        patron: new FormControl(''),
        colorKwikLok: new FormControl(''),
        variety: new FormControl(''),
        dateProduction: new FormControl(''),
        recipe: new FormControl(''),
        saleDate: new FormControl(''),
        numberSlices: new FormControl(''),
        dateFreshness: new FormControl(''),
        sliceThicknesses: new FormControl('')
      }
    );
  }

  save() {

  }

  addForm() {

  }

  delete() {

  }

}
