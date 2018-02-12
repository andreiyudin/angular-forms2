import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { AuthService } from '../../../../auth/auth.service';
import { MetalDetectionsService } from '../db-services/metal-detections.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-metal-detection-form',
  templateUrl: './metal-detection-form.component.html',
  styleUrls: ['./metal-detection-form.component.css']
})
export class MetalDetectionFormComponent implements OnInit {
  metalDetectionForm: FormGroup;
  userInfo: any = {};
  alertMessage: any = {
    message: '',
    type: 'success'
  };
  params;

  constructor(private route: ActivatedRoute, private authService: AuthService, private metalDetectionsService: MetalDetectionsService,private router:Router) { }

  ngOnInit() {
    this.authService.getUserRights().subscribe(data => {
      this.userInfo = data || {};
    })
    this.createMetalDetectionForm();
    
    this.route.params.subscribe(params => {
      this.params = params;
      if (params.id != 'new') {
        this.metalDetectionsService.getMetalDetectionById(params.id).subscribe(metaldetection => {
          this.setMetalDetectionForm(metaldetection[0]);
        });
      }
    });
  }


  createMetalDetectionForm() {
    this.metalDetectionForm = new FormGroup(
      {
        datetime: new FormControl(moment().format('YYYY-MM-DDTHH:mm'), null),
        operator: new FormControl({ value: this.userInfo.username, disabled: true }, null),
        metalLevel: new FormControl('', null),
        nbRejects: new FormControl('', null),
        ferrous: new FormControl('0', null),
        stainless: new FormControl('0', null),
        comments: new FormControl('', null),
        state: new FormControl('1', null),
        userId: new FormControl(this.userInfo.id, null),
        metalDetectionEventId: new FormControl('', null),
      }
    );
  }

  setMetalDetectionForm(metaldetection) {
    this.metalDetectionForm.controls['datetime'].setValue(moment(metaldetection.datetime).format('YYYY-MM-DDTHH:mm'));
    this.metalDetectionForm.controls['operator'].setValue(metaldetection.username);
    this.metalDetectionForm.controls['metalLevel'].setValue(metaldetection.metalLevel);
    this.metalDetectionForm.controls['nbRejects'].setValue(metaldetection.nbRejects);
    this.metalDetectionForm.controls['ferrous'].setValue(metaldetection.ferrous ? '1' : '0');
    this.metalDetectionForm.controls['stainless'].setValue(metaldetection.stainless ? '1' : '0');
    this.metalDetectionForm.controls['comments'].setValue(metaldetection.comments);
    this.metalDetectionForm.controls['userId'].setValue(metaldetection.userId);
    this.metalDetectionForm.controls['metalDetectionEventId'].setValue(metaldetection.metalDetectionEventId);
    this.metalDetectionForm.controls['state'].setValue(metaldetection.state);
  }

  add(){
    if (this.params.id == 'new') {
      this.createMetalDetectionForm();
    }else{
      this.router.navigateByUrl('/home/metal-detection/form/new');
    }
  }

  save(form) {
    if (form.valid) {
      form.value.datetime = moment(form.value.datetime).utc().format('YYYY-MM-DD HH:mm');
      if (form.value.metalDetectionEventId) {
        this.metalDetectionsService.update(form.value).subscribe((metalDetection) => {
          this.showSuccessMsg();
          this.setMetalDetectionForm(metalDetection[0]);
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        this.metalDetectionsService.create(form.value).subscribe((metalDetection) => {
          this.showSuccessMsg();
          this.setMetalDetectionForm(metalDetection[0]);
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
