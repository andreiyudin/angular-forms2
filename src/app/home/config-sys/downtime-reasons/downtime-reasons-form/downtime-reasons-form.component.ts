import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import { DowntimeReasonsService } from '../db-services/downtime-reasons.service';

import * as _ from "lodash";

@Component({
  selector: 'downtime-reasons-form',
  templateUrl: './downtime-reasons-form.component.html',
  styleUrls: ['./downtime-reasons-form.component.css']
})
export class DowntimeReasonsFormComponent implements OnInit {
  downtimeReasonForm: FormGroup;
  userInfo: any = {};

  alertMessage: any = {
    message: '',
    type: 'success'
  };

  downtimeReasons: any = [];
  downtimeReason: any = {};
  bins: any = [];
  new: boolean = true;

  constructor(private downtimeReasonsService: DowntimeReasonsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.getData();
    this.createDowntimeReasonsForm();
  }

  setDowntimeReasonsForm(downtimeReason) {
    this.downtimeReasonForm.controls['downtimeReasonId'].setValue(downtimeReason.downtimeReasonId);
    this.downtimeReasonForm.controls['explanation'].setValue(downtimeReason.explanation);
    this.downtimeReasonForm.controls['description'].setValue(downtimeReason.description);
    this.downtimeReasonForm.controls['position'].setValue(downtimeReason.position);
  }

  createDowntimeReasonsForm() {
    this.downtimeReasonForm = new FormGroup(
      {
        downtimeReasonId: new FormControl('', Validators.nullValidator),
        description: new FormControl('', Validators.required),
        explanation: new FormControl('1', Validators.nullValidator),
        position: new FormControl('', Validators.nullValidator)
      }
    );
  }

  getData() {

    this.downtimeReasonsService.getDowntimeReasons().subscribe(downtimeReasons => {
      this.downtimeReasons = downtimeReasons;
    });

    this.route.params.subscribe(params => {
      if (params.id != 'new') {
        this.new = false;
        this.downtimeReasonsService.getDowntimeReasonById(params.id).subscribe(downtimeReason => {
          this.downtimeReason = downtimeReason[0];
          this.setDowntimeReasonsForm(this.downtimeReason);
        });
      }
    });

  }

  addForm() {
    this.router.navigate(["/home/downtimereasons/form/new"]);
    this.new = true;
    this.downtimeReason = {};
    this.downtimeReasonForm.reset();
  }

  delete() {
    this.downtimeReasonsService.delete(this.downtimeReason.downtimeReasonId).subscribe(data => {
      this.router.navigate(["/home/downtimereasons/list"]);
    }, error => {
      this.showErrorMsg();
    });
  }

  save(form) {
    let newReason = form.value;

    if (form.valid) {
      if (!this.new) {
        this.downtimeReasonsService.update(newReason).subscribe((downtimeReason) => {
          this.new = false;
          this.showSuccessMsg();
          this.setDowntimeReasonsForm(downtimeReason)
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        this.downtimeReasonsService.getDowntimeReasonsCount().then(res => {
          newReason.position = parseInt(res[0]["nbReasons"]) + 1;
          this.downtimeReasonsService.create(newReason).subscribe((downtimeReason) => {
            this.new = false;
            this.downtimeReasonForm.markAsPristine();
            this.showSuccessMsg();
            this.setDowntimeReasonsForm(downtimeReason)
          }, (error) => {
            this.showErrorMsg();
          });
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
