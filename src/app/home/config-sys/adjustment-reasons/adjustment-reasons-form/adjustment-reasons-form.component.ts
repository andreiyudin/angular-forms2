import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { AdjustmentReasonsService } from '../db-services/adjustment-reasons.service';


import * as _ from "lodash";

@Component({
  selector: 'adjustment-reasons-form',
  templateUrl: './adjustment-reasons-form.component.html',
  styleUrls: ['./adjustment-reasons-form.component.css']
})
export class AdjustmentReasonsFormComponent implements OnInit {
  adjustmentReasonForm: FormGroup;
  userInfo: any = {};

  alertMessage: any = {
    message: '',
    type: 'success'
  };

  adjustmentReasons: any = [];
  adjustmentReason: any = {};
  bins: any = [];
  new: boolean = true;
  machines:Array<any>=[];

  constructor(private adjustmentReasonsService: AdjustmentReasonsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.getData();
    this.createAdjustmentReasonsForm();
  }

  setAdjustmentReasonsForm(adjustmentReason) {
    this.adjustmentReasonForm.controls['adjustmentReasonId'].setValue(adjustmentReason.adjustmentReasonId);
    this.adjustmentReasonForm.controls['explanation'].setValue(adjustmentReason.explanation);
    this.adjustmentReasonForm.controls['description'].setValue(adjustmentReason.description);
    this.adjustmentReasonForm.controls['position'].setValue(adjustmentReason.position);
  }

  createAdjustmentReasonsForm() {
    this.adjustmentReasonForm = new FormGroup(
      {
        adjustmentReasonId: new FormControl('', Validators.nullValidator),
        description: new FormControl('', Validators.required),
        explanation: new FormControl('', Validators.nullValidator),
        position: new FormControl('', Validators.nullValidator)
      }
    );
  }

  getData() {

    this.adjustmentReasonsService.getAdjustmentReasons().subscribe(adjustmentReasons => {
      this.adjustmentReasons = adjustmentReasons;
    });



    this.route.params.subscribe(params => {
      if (params.id != 'new') {
        this.new = false;
        this.adjustmentReasonsService.getAdjustmentReasonById(params.id).subscribe(adjustmentReason => {
          this.adjustmentReason = adjustmentReason[0];
          this.setAdjustmentReasonsForm(this.adjustmentReason);
        });
      }
    });
  }

  addForm() {
    this.router.navigate(["/home/adjustmentreasons/form/new"]);
    this.new = true;
    this.adjustmentReason = {};
    this.adjustmentReasonForm.reset();
  }

  delete() {
    this.adjustmentReasonsService.delete(this.adjustmentReason.adjustmentReasonId).subscribe(data => {
      this.router.navigate(["/home/adjustmentreasons/list"]);
    }, error => {
      this.showErrorMsg();
    });
  }

  save(form) {

    let newReason = form.value;

    if (form.valid) {
      if (!this.new) {
        this.adjustmentReasonsService.update(newReason).subscribe((adjustmentReason) => {
          this.new = false;
          this.showSuccessMsg();
          this.setAdjustmentReasonsForm(adjustmentReason)
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        this.adjustmentReasonsService.getAdjustmentReasonsCount().then(res => {
          newReason.position = parseInt(res[0]["nbReasons"]) + 1;

          this.createNewReason(newReason);
        }, (error) => {
          this.showErrorMsg();
        });
      }
    }
  }

  createNewReason(newReason) {

    this.adjustmentReasonsService.create(newReason).subscribe((adjustmentReason) => {
      this.new = false;
      this.adjustmentReasonForm.markAsPristine();
      this.showSuccessMsg();
      this.setAdjustmentReasonsForm(adjustmentReason)
    }, (error) => {
      this.showErrorMsg();
    });
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
