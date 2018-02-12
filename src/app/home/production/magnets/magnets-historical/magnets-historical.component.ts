import { Component, OnInit } from '@angular/core';
import { MagnetsService } from '../db-services/magnets.service';
import { CollectionsService } from '../../../../shared/services/collections.service';
import { AuthService } from '../../../../auth/auth.service';
import * as moment from 'moment/moment';
import * as _ from "lodash";

@Component({
  selector: 'app-magnets-historical',
  templateUrl: './magnets-historical.component.html',
  styleUrls: ['./magnets-historical.component.css'],
  providers: [CollectionsService]
})
export class MagnetsHistoricalComponent implements OnInit {

  magnets: Array<any>;
  magnetsFiltered: Array<any>;
  moment = moment;
  isAdmin;

  filters = {
    date: {
      from: moment().subtract(1, 'months').format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD")
    },
    magnets: {
      datetime: '',
      magnetsId: '',
      username: '',
      workingProperly: ''
    }
  };


  constructor(private magnetsService: MagnetsService, private collectionsService: CollectionsService, private authService: AuthService) { }

  ngOnInit() {
    this.getData();
  }

  filter() {
    this.magnetsFiltered = _.filter(this.magnets, (magnets) => {
      var res: boolean;
      if (this.collectionsService.isObjectFilled(this.filters.magnets, [])) {
        return this.collectionsService.filterObjectProperties(magnets, this.collectionsService.contains, this.filters.magnets, []);
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
    this.magnetsService.getMagnets(this.filters.date.from, this.filters.date.to + ' 23:59.59').subscribe(magnets => {
      magnets.forEach((magnets, i, a) => {
        this.collectionsService.convertBooleanString(magnets, ["workingProperly"], "Oui", "Non");
      });
      this.magnets = magnets;
      this.magnetsFiltered = magnets;
      this.filter();
    });

    this.authService.getUserRights().subscribe(userRights => {
      this.isAdmin = userRights.admin;
    });
  }

  eraseFilter() {
    this.collectionsService.eraseProperties(this.filters.magnets, []);
    this.filter();
  }


}
