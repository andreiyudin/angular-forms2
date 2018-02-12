import { Component, OnInit } from '@angular/core';
import { MetalDetectionsService } from '../db-services/metal-detections.service';
import { CollectionsService } from '../../../../shared/services/collections.service';
import { AuthService } from '../../../../auth/auth.service';
import * as moment from 'moment/moment';
import * as _ from "lodash";

@Component({
  selector: 'app-metal-detection-historical',
  templateUrl: './metal-detection-historical.component.html',
  styleUrls: ['./metal-detection-historical.component.css'],
  providers: [CollectionsService]
})
export class MetalDetectionHistoricalComponent implements OnInit {

  metalDetections: Array<any>;
  metalDetectionsFiltered: Array<any>;
  moment = moment;
  isAdmin;
  userInfo;

  filters = {
    date: {
      from: moment().subtract(1, 'months').format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
    },
    metalDetection: {
      datetime: '',
      metalDetectionEventId: '',
      username: '',
      ferrous: '',
      stainless: '',
      metalLevel: '',
      nbRejects: '',
      comments: ''
    }
  };


  constructor(private metalDetectionsService: MetalDetectionsService, private collectionsService: CollectionsService, private authService: AuthService) { }

  ngOnInit() {
    this.getData();
  }

  filter() {
    this.metalDetectionsFiltered = _.filter(this.metalDetections, (metalDetection) => {
      var res: boolean;
      if (this.collectionsService.isObjectFilled(this.filters.metalDetection, [])) {
        return this.collectionsService.filterObjectProperties(metalDetection, this.collectionsService.contains, this.filters.metalDetection, []);
      } else {
        return true;
      }
    });
  }

  filterPeriod($event) {
    this.filters.date = $event;
    this.getData();
  }

  getData() {
    this.metalDetectionsService.get(this.filters.date.from, this.filters.date.to + ' 23:59.59').subscribe(metalDetections => {
      metalDetections.forEach((metalDetection, i, a) => {
        this.collectionsService.convertBooleanString(metalDetection, ["ferrous", "stainless"], "Oui", "Non");
      });
      this.metalDetections = metalDetections;
      this.metalDetectionsFiltered = metalDetections;
      this.filter();
    });
    this.authService.getUserRights().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.isAdmin = userInfo.admin;
    });
  }

  eraseFilter() {
    this.collectionsService.eraseProperties(this.filters.metalDetection, []);
    this.filter();
  }


  update() {

    let metalDetectionsToUpdate = _.cloneDeep(this.metalDetectionsFiltered);

    metalDetectionsToUpdate = _.filter(metalDetectionsToUpdate, (o) => {
      return o.auditedByUserId == null ? true : false;
    });

    this.collectionsService.convertCollectionStringToBoolean(metalDetectionsToUpdate, ["ferrous", "stainless"], "Oui", "Non");

    metalDetectionsToUpdate.forEach((e, i, a) => {
      e.auditedByUserId = this.userInfo.id;
    });

    this.metalDetectionsService.updateMany(metalDetectionsToUpdate).toPromise().then(res => {
      this.collectionsService.convertCollectionBooleanString(res, ["ferrous", "stainless"], "Oui", "Non");
      this.collectionsService.replaceItems(this.metalDetections,res, 'metalDetectionEventId')
      this.filter();
    }).catch(error => {
      console.log("Erreur");
    });

  }


}
