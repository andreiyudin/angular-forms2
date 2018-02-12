import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements AfterViewInit {

  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  formSubmitted = false;
  form: FormGroup;
  msgShown:boolean = false;

  constructor(public fb: FormBuilder, private authService: AuthService,private router:Router) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.authService.clearUserRights();
  }

  login() {
    if(this.form.valid){
    this.authService.auth(this.form.value).subscribe(data => {
      data.isLog = true;
      this.authService.setUserRights(data);
      this.router.navigate(['/home']);
    }, error => {
      this.msgShown=true;
    });
    }else{
      this.formSubmitted = true;
    }
  }

  showMsg(){
    this.msgShown=true;
  }

  hideMsg(){
    this.msgShown=false;
  }
}
