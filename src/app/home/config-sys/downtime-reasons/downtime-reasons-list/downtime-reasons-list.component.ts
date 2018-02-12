import { Component, OnInit, HostListener } from '@angular/core';
import { DowntimeReasonsService } from '../db-services/downtime-reasons.service';
import { CollectionsService } from '../../../../shared/services/collections.service';

import * as moment from 'moment/moment';
import * as _ from "lodash";

@Component({
  selector: 'app-downtimeReasons-list',
  templateUrl: './downtime-reasons-list.component.html',
  styleUrls: ['./downtime-reasons-list.component.css'],
  providers: [CollectionsService]
})
export class DowntimeReasonsListComponent implements OnInit {

  alertMessage: any = {
    message: '',
    type: 'success'
  };

  downtimeReasons: Array<any>;
  filteredDowntimeReasons: Array<any>;
  moment = moment;
  toUpdate: boolean;

  filters: any = { all: false };

  constructor(private downtimeReasonService: DowntimeReasonsService, private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.getData();
  }

  filter() {

    this.filteredDowntimeReasons = _.orderBy(this.downtimeReasons, ['position']);

    this.filteredDowntimeReasons = _.filter(this.filteredDowntimeReasons, (downtimeReason) => {
      var res: boolean;
      if (this.collectionsService.isObjectFilled(this.filters, ["all"])) {
        return this.collectionsService.filterObjectProperties(downtimeReason, this.collectionsService.contains, this.filters, ["all"]);
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
    this.downtimeReasonService.getDowntimeReasons().subscribe(downtimeReasons => {
      this.setData(downtimeReasons);
    });
  }

  setData(downtimeReasons) {
    this.collectionsService.convertCollectionBooleanString(downtimeReasons, ['explanation'], "Oui", "Non");
    this.downtimeReasons = downtimeReasons;
    this.filteredDowntimeReasons = downtimeReasons;
    this.filter();
  }

  eraseFilter() {
    this.collectionsService.eraseProperties(this.filters, ["from", "to"]);
    this.filter();
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {

    if (event["srcElement"]["attributes"]["position"]) {
      let srcPosition = event.srcElement.attributes.position.value;
      event.dataTransfer.setData('item', srcPosition);
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    let srcPosition = parseInt(event.dataTransfer.getData('item'));
    if (event["srcElement"]["parentElement"]["attributes"]["position"] && !isNaN(srcPosition)) {
      let destPosition = parseInt(event.srcElement.parentElement.attributes.position.value);
      this.toUpdate = true;
      this.downtimeReasons = this.collectionsService.changePosition(this.downtimeReasons, "position", srcPosition, destPosition);
      this.filter();
    }
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  save() {
    var arrayPromises = [];
    let downtimeReasonsToUpdate = JSON.parse(JSON.stringify(this.downtimeReasons));

    downtimeReasonsToUpdate.forEach((downtimeReason, i, a) => {
      downtimeReason.explanation = downtimeReason.explanation == 'Oui' ? 1 : 0;
      arrayPromises.push(this.downtimeReasonService.updatePromise(downtimeReason))
    });

    Promise.all(arrayPromises).then((downtimeReasons) => {
      this.setData(downtimeReasons);
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
