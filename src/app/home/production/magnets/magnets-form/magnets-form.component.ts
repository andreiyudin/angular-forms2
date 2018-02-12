import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { AuthService } from '../../../../auth/auth.service';
import { MagnetsService } from '../db-services/magnets.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-magnets-form',
  templateUrl: './magnets-form.component.html',
  styleUrls: ['./magnets-form.component.css'],

})
export class MagnetsFormComponent implements OnInit {
  magnetsForm: FormGroup;
  userInfo: any = {};
  alertMessage: any = {
    message: '',
    type: 'success'
  };
  params;

  constructor(private authService: AuthService, private magnetsService: MagnetsService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.authService.getUserRights().subscribe(data => {
      this.userInfo = data || {};
    })
    this.createMagnetsForm();

    this.route.params.subscribe(params => {
      this.params = params;
      if (params.id != 'new') {
        this.magnetsService.getMagnetsById(params.id).subscribe(magnets => {
          this.setMagnetsForm(magnets[0]);
        });
      }
    });

  }

  createMagnetsForm() {
    this.magnetsForm = new FormGroup(
      {
        datetime: new FormControl(moment().format('YYYY-MM-DDTHH:mm'), null),
        operator: new FormControl({ value: this.userInfo.username, disabled: true }, null),
        workingProperly: new FormControl('0', null),
        userId: new FormControl(this.userInfo.id, null),
        state: new FormControl(1, null),
        magnetId: new FormControl('', null)
      }
    );
  }

  setMagnetsForm(magnets) {

    this.magnetsForm.controls['datetime'].setValue(moment(magnets.datetime).format('YYYY-MM-DDTHH:mm'));
    this.magnetsForm.controls['operator'].setValue(magnets.username);
    this.magnetsForm.controls['workingProperly'].setValue(magnets.workingProperly ? "1" : "0");
    this.magnetsForm.controls['userId'].setValue(magnets.userId);
    this.magnetsForm.controls['state'].setValue(magnets.state);
    this.magnetsForm.controls['magnetId'].setValue(magnets.magnetId);
    
  }

  add(){
    if (this.params.id == 'new') {
      this.createMagnetsForm();
    }else{
      this.router.navigateByUrl('/home/magnets/form/new');
    }
  }

  save(form) {
    if (form.valid) {
      form.value.datetime = moment(form.value.datetime).utc().format('YYYY-MM-DD HH:mm')
      if (form.value.magnetId) {
        this.magnetsService.update(form.value).subscribe((magnet) => {
          this.showSuccessMsg();
          this.setMagnetsForm(magnet[0]);
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        this.magnetsService.create(form.value).subscribe((metalDetection) => {
          this.showSuccessMsg();
          this.setMagnetsForm(metalDetection[0]);
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
