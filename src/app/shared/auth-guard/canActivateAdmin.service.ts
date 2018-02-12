import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateAdmin implements CanActivate {


  constructor( private router: Router,private authService:AuthService) {

  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean  {

    return this.authService.getUserRights().map((userRights)=>{
      userRights = userRights || {};
        if(userRights.admin){
          return true;
        }else{
          return false;
        }
    });
  }

  
}