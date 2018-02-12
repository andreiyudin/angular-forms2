import { Component, OnInit } from '@angular/core';
import { UsersService } from '../db-services/users.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from "lodash";

@Component({
  selector: 'app-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any>;
  filteredUsers: Array<any>;
  confirmPopup: any = { 'show': false, 'responseSubject': new Subject<any>() };;
  alertMessage: any = {
    message: '',
    type: 'success'
  };
  filters:any = {
    inactive:false
  }

  constructor(private usersService: UsersService) { }


  ngOnInit() {
    this.getData();
  }

  getData() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = _.filter(this.users,{'inactive':false});
    });
  }

  showInactive(){
    this.filters.inactive = !this.filters.inactive;
    if(this.filters.inactive){
      this.filteredUsers = this.users;
    }else{
      this.filteredUsers = _.filter(this.users,{'inactive':false});
    }

  }

  delete(id) {
    this.confirmPopup.show = true;
    let observable = this.confirmPopup.responseSubject.asObservable();
    observable.subscribe(res => {
      if(res){
        this.usersService.delete(id).subscribe(data=>{
          _.remove(this.users,{'id':id});
        },(error)=>{
          this.alertMessage.message = 'Erreur Enregistrement';
          this.alertMessage.type = 'danger';
        });
      }
      this.confirmPopup.show = false;
    });
    return observable;
  }

}
