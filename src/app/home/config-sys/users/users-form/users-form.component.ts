import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../db-services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  userForm: FormGroup;
  constructor(private usersService: UsersService, private route: ActivatedRoute) { }
  alertMessage: any = {
    message: '',
    type: 'success'
  };
  initPwd;

  ngOnInit() {
    this.createUserForm()

    this.route.params.subscribe(params => {
      if (params.id != 'new') {
        this.usersService.getUser(params.id).subscribe(user => {
          this.setUserForm(user[0]);
        });
      }
    });
  }

  createUserForm() {
    this.userForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        id: new FormControl('', null),
        admin: new FormControl('', null),
        inactive: new FormControl('', null),
      }
    );
  }

  setUserForm(user) {
    this.userForm.controls['username'].setValue(user.username);
    this.userForm.controls['password'].setValue(user.password);
    this.userForm.controls['admin'].setValue(user.admin);
    this.userForm.controls['inactive'].setValue(user.inactive);
    this.userForm.controls['id'].setValue(user.id);
    this.initPwd = user.password;
  }

  save(form) {

    if (form.valid) {
      if (form.value.id) {

        if (form.value.password == this.initPwd) {
          delete form.value.password;
        }

        this.usersService.update(form.value).subscribe(user => {
          this.setUserForm(user);
          this.userForm.markAsPristine();
        }, error => {
          this.alertMessage.message = error.message;
          this.alertMessage.type = 'danger';
        });
      } else {
        this.usersService.create(form.value).subscribe(user => {
          this.setUserForm(user);
          this.userForm.markAsPristine();
        }, error => {
          this.alertMessage.message = error.message;
          this.alertMessage.type = 'danger';
        });
      }
    }
  }
}
