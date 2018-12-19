import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService,
              private router:Router,) { }
  
  canActivate(state,route: RouterStateSnapshot){
    return this.auth.user$.map(user => {
      if (user) return true;
      
      this.router.navigate(['/app-login'],{ queryParams: { returnUrl: state.Url}});
      return false;
    });
  }
}
