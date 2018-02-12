import { Component, OnInit, HostListener } from '@angular/core';
import { BinsService } from '../db-services/bins.service';
import { CollectionsService } from '../../../../shared/services/collections.service';

import * as moment from 'moment/moment';
import * as _ from "lodash";

@Component({
  selector: 'app-bins-list',
  templateUrl: './bins-list.component.html',
  styleUrls: ['./bins-list.component.css'],
  providers: [CollectionsService]
})


export class BinsListComponent implements OnInit {

  bins: Array<any>;
  filteredBins: Array<any>;
  moment = moment;
  toUpdate: boolean;

  filters = {
    binId: '',
    inactive: false
  };

  alertMessage: any = {
    message: '',
    type: 'success'
  };

  constructor(private binService: BinsService, private collectionsService: CollectionsService) { }

  ngOnInit() {
    this.getData();
  }

  filter() {
    if (this.filters.inactive) {
      this.filteredBins = this.bins;
    } else {
      this.filteredBins = _.filter(this.bins, (o) => { return o.inactive != true });
    }

    this.filteredBins = _.filter(this.filteredBins, (bin) => {
      var res: boolean;
      if (this.collectionsService.isObjectFilled(this.filters, ["inactive"])) {
        return this.collectionsService.filterObjectProperties(bin, this.collectionsService.contains, this.filters, ["inactive"]);
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
    this.binService.getBins().subscribe(bins => {
      this.bins = bins;
      this.filteredBins = bins;
      this.filter();
    });
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

  @HostListener('drop', ['$event']) onDrop(event) {
    let srcPosition = parseInt(event.dataTransfer.getData('item'));
    if (event["srcElement"]["parentElement"]["attributes"]["position"]&&!isNaN(srcPosition)) {
      let destPosition = parseInt(event.srcElement.parentElement.attributes.position.value);
      this.toUpdate = true;
      this.bins = this.collectionsService.changePosition(this.bins, "position", srcPosition, destPosition);
      this.filter();
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
    let binsToUpdate = JSON.parse(JSON.stringify(this.bins));

    this.binService.updateMany(binsToUpdate).toPromise().then((bins) => {
      this.setData(bins);
      this.toUpdate = false;
      this.alertMessage.message = "Enregistrement réussi!"
      this.alertMessage.type = "success";
      this.clearMessage(2);
    }).catch((error) => {
      this.alertMessage.message = "Erreur Enregistrement"
      this.alertMessage.type = "danger";
    });

  }

  setData(bins) {
    this.bins = bins;
    this.filter();
  }

  clearMessage(time) {
    setTimeout(() => {
      this.alertMessage.message = ''
    }, time * 1000);
  }


}
