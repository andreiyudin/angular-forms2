import { Component, OnInit, HostListener } from '@angular/core';
import { AdjustmentReasonsService } from '../db-services/adjustment-reasons.service';
import { CollectionsService } from '../../../../shared/services/collections.service';

import * as moment from 'moment/moment';
import * as _ from "lodash";

@Component({
  selector: 'app-adjustmentReasons-list',
  templateUrl: './adjustment-reasons-list.component.html',
  styleUrls: ['./adjustment-reasons-list.component.css'],
  providers: [CollectionsService]
})
export class AdjustmentReasonsListComponent implements OnInit {

  adjustmentReasons: Array<any>;
  filteredAdjustmentReasons: Array<any>;
  moment = moment;
  alertMessage: any = {
    message: '',
    type: 'success'
  };
  toUpdate: boolean;
  filters: any = { all: false };

  constructor(private adjustmentReasonService: AdjustmentReasonsService, private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.getData();
  }

  filter() {

    this.filteredAdjustmentReasons = _.orderBy(this.adjustmentReasons, ['position']);

    this.filteredAdjustmentReasons = _.filter(this.filteredAdjustmentReasons, (adjustmentReason) => {
      var res: boolean;
      if (this.collectionsService.isObjectFilled(this.filters, ["all"])) {
        return this.collectionsService.filterObjectProperties(adjustmentReason, this.collectionsService.contains, this.filters, ["all"]);
      } else {
        return true;
      }
    });
  }

  filterPeriod() {
    this.getData();
    this.filter();
  }

  getData() {
    this.adjustmentReasonService.getAdjustmentReasons().subscribe(adjustmentReasons => {
      this.setData(adjustmentReasons);
    });
  }

  setData(adjustmentReasons) {
    this.collectionsService.convertCollectionBooleanString(adjustmentReasons, ['explanation'], "Oui", "Non");
    this.adjustmentReasons = adjustmentReasons;
    this.filteredAdjustmentReasons = adjustmentReasons;
    this.filter();
  }

  eraseFilter() {
    this.collectionsService.eraseProperties(this.filters, ["from", "to"]);
    this.filter();
  }


  @HostListener('drop', ['$event']) onDrop(event) {

    let srcPosition = parseInt(event.dataTransfer.getData('item'));

    if (event["srcElement"]["parentElement"]["attributes"]["position"] && !isNaN(srcPosition)) {
      let destPosition = parseInt(event.srcElement.parentElement.attributes.position.value);
      this.toUpdate = true;

      this.adjustmentReasons = this.collectionsService.changePosition(this.adjustmentReasons, "position", srcPosition, destPosition);
      this.filter();
      
    }

  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    if (event["srcElement"]["attributes"]["position"]) {
      let srcPosition = event.srcElement.attributes.position.value;
      event.dataTransfer.setData('item', srcPosition);
    }
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
    let adjustmentReasonsToUpdate = JSON.parse(JSON.stringify(this.adjustmentReasons));

    adjustmentReasonsToUpdate.forEach((adjustmentReason, i, a) => {
      adjustmentReason.explanation = adjustmentReason.explanation == 'Oui' ? 1 : 0;
      arrayPromises.push(this.adjustmentReasonService.updatePromise(adjustmentReason))
    });

    Promise.all(arrayPromises).then((adjustmentReasons) => {
      this.setData(adjustmentReasons);
      this.alertMessage.message = "Enregistrement réussi!"
      this.alertMessage.type = "success";
      this.clearMessage(2);
    }).catch((error) => {
      this.alertMessage.message = "Erreur Enregistrement"
      this.alertMessage.type = "danger";
    });
  }

  clearMessage(time) {
    setTimeout(() => {
      this.alertMessage.message = ''
    }, time * 1000);
  }

}
