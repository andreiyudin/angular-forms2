import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { AuthService } from '../../../../auth/auth.service';
import { NotesService } from '../db-services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  userInfo: any = {};
  alertMessage: any = {
    message: '',
    type: 'success'
  };
  params;
  confirmPopup: any = { 'show': false, 'responseSubject': new Subject<any>() };;

  constructor(private route: ActivatedRoute, private authService: AuthService, private notesService: NotesService, private router: Router) { }

  ngOnInit() {
    this.authService.getUserRights().subscribe(data => {
      this.userInfo = data || {};
      console.log(this.userInfo);
    })

    this.createNoteForm();

    this.route.params.subscribe(params => {
      this.params = params;
      if (params.id != 'new') {
        this.notesService.getNoteById(params.id).subscribe(note => {
          this.setNoteForm(note[0]);
        });
      }
    });


  }


  createNoteForm() {
    this.noteForm = new FormGroup(
      {
        datetime: new FormControl(moment().format('YYYY-MM-DDTHH:mm'), null),
        operator: new FormControl({ value: this.userInfo.username, disabled: true }, null),
        noteId: new FormControl('', null),
        userId: new FormControl(this.userInfo.id, null),
        description: new FormControl('', null),
      }
    );
  }

  setNoteForm(note) {
    this.noteForm.controls['datetime'].setValue(moment(note.datetime).format('YYYY-MM-DDTHH:mm'));
    this.noteForm.controls['operator'].setValue(note.username);
    this.noteForm.controls['noteId'].setValue(note.noteId);
    this.noteForm.controls['userId'].setValue(note.userId);
    this.noteForm.controls['description'].setValue(note.description);
  }

  add() {
    if (this.params.id == 'new') {
      this.createNoteForm();
    } else {
      this.router.navigateByUrl('/home/notes/form/new');
    }
  }


  delete(id) {
    this.confirmPopup.show = true;
    let observable = this.confirmPopup.responseSubject.asObservable();
    observable.subscribe(res => {
      if (res) {
        this.notesService.delete(this.noteForm.controls['noteId'].value).subscribe((note) => {
          this.showSuccessMsg();
          this.router.navigateByUrl('/home/notes/historical');
        }, (error) => {
          this.showErrorMsg();
        });
      }
      this.confirmPopup.show = false;
    });
    return observable;
  }

  save(form) {
    if (form.valid) {
      form.value.datetime = moment(form.value.datetime).utc().format('YYYY-MM-DD HH:mm');
      if (form.value.noteId) {
        this.notesService.update(form.value).subscribe((note) => {
          this.showSuccessMsg();
          this.setNoteForm(note);
        }, (error) => {
          this.showErrorMsg();
        });
      } else {
        this.notesService.create(form.value).subscribe((note) => {
          this.showSuccessMsg();
          this.setNoteForm(note[0]);
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
