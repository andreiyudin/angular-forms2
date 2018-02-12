import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavbarComponent implements OnInit {

  configMenuShown: boolean = false;
  menuReportsShown:boolean = false;
  userRights;

  constructor(private _eref: ElementRef, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserRights().subscribe(data => {
      this.userRights = data || { isLog: false } ;
    });

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.configMenuShown = false;
      this.menuReportsShown = false;
    }
  }

  logOut() {
    this.router.navigate(['/'])
  }

}
