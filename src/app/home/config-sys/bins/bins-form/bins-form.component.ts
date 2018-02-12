import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { BinsService } from '../db-services/bins.service';

import * as _ from "lodash";

@Component({
  selector: 'app-bins-form',
  templateUrl: './bins-form.component.html',
  styleUrls: ['./bins-form.component.css']
})
export class BinsFormComponent implements OnInit {
  binForm: FormGroup;
  userInfo: any = {};

  alertMessage: any = {
    message: '',
    type: 'success'
  };

 
  bin: any = {};
  bins: any = [];
  new: boolean = true;

  constructor(private binsService: BinsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.getData();
    this.createBinsForm();
  }

  setBinsForm(bin) {
    this.binForm.controls['binId'].setValue(bin.binId);
    this.binForm.controls['inactive'].setValue(bin.inactive);
  }

  createBinsForm() {
    this.binForm = new FormGroup(
      {
        binId: new FormControl('', this.isBinIdNotExist.bind(this)),
        inactive: new FormControl('', Validators.nullValidator)
      }
    );
  }

  isBinIdNotExist(c: FormControl) {
    let found = _.find(this.bins, { 'binId': c.value })
    let ret = (found && this.new) ? {
      present: {
        valid: false
      }
    } : null;
    return ret;
  }

  getData() {

    this.binsService.getBins().subscribe(bins => {
      this.bins = bins;
    });

    this.route.params.subscribe(params => {
      if (params.id != 'new') {
        this.new = false;
        this.binsService.getBinById(params.id).subscribe(bin => {
          this.bin = bin[0];
          this.setBinsForm(this.bin);
        });
      }
    });

  }

  addForm() {
    this.router.navigate(["/home/bins/form/new"]);
    this.new = true;
    this.bin = {};
    this.binForm.reset();
  }

  delete() {
    this.binsService.delete(this.bin.binId).subscribe(data => {
      this.router.navigate(["/home/bins/list"]);
    }, error => {
      this.showErrorMsg();
    });
  }

  save(form) {
    if (form.valid) {
      if (!this.new) {
        this.binsService.update(form.value).subscribe((bin) => {
          this.new = false;
          this.showSuccessMsg();
          this.setBinsForm(bin)
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        this.binsService.create(form.value).subscribe((bin) => {
          this.new = false;
          this.binForm.markAsPristine();
          this.showSuccessMsg();
          this.setBinsForm(bin)
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
