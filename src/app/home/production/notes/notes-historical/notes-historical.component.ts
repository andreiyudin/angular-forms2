import { Component, OnInit } from '@angular/core';
import { NotesService } from '../db-services/notes.service';
import { CollectionsService } from '../../../../shared/services/collections.service';
import { AuthService } from '../../../../auth/auth.service';
import * as moment from 'moment/moment';
import * as _ from "lodash";

@Component({
  selector: 'app-notes-historical',
  templateUrl: './notes-historical.component.html',
  styleUrls: ['./notes-historical.component.css'],
  providers: [CollectionsService]
})
export class NoteHistoricalComponent implements OnInit {

  notes: Array<any>;
  notesFiltered: Array<any>;
  moment = moment;
  isAdmin;
  userInfo;

  filters = {
    date: {
      from: moment().subtract(1, 'months').format("YYYY-MM-DD"),
      to: moment().format("YYYY-MM-DD"),
    },
    note: {
      datetime: '',
      username: '',
      description: '',
      auditedByUsername:''
    }

  };


  constructor(private notesService: NotesService, private collectionsService: CollectionsService, private authService: AuthService) { }

  ngOnInit() {
    this.getData();
  }

  filter() {
    this.notesFiltered = _.filter(this.notes, (note) => {
      var res: boolean;
      if (this.collectionsService.isObjectFilled(this.filters.note, [])) {
        return this.collectionsService.filterObjectProperties(note, this.collectionsService.contains, this.filters.note, []);
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
    this.notesService.get(this.filters.date.from, this.filters.date.to + ' 23:59.59').subscribe(notes => {
      this.notes = notes;
      this.notesFiltered = notes;
      this.filter();
    });
    this.authService.getUserRights().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.isAdmin = userInfo.admin;
    });
  }

  eraseFilter() {
    this.collectionsService.eraseProperties(this.filters.note, []);
    this.filter();
  }


  update() {

    let notesToUpdate = _.cloneDeep(this.notesFiltered);

    notesToUpdate = _.filter(notesToUpdate, (o) => {
      return o.auditedByUserId == null ? true : false;
    });

    notesToUpdate.forEach((e, i, a) => {
      e.auditedByUserId = this.userInfo.id;
    });

    this.notesService.updateMany(notesToUpdate).toPromise().then(res => {
      this.collectionsService.replaceItems(this.notesFiltered,res, 'noteId');
    }).catch(error => {
      console.log("Erreur");
    });

  }


}
