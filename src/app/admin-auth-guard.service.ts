import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService,
              private userService: UserService) { }

  // canActivate():Observable<boolean>{
  //   return this.auth.user$.pipe(switchMap(user => this.userService.get(user.uid)),
  //     map((appUser:AppUser) => appUser.isAdmin)
  //   )
  //   }
  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map((appUser: AppUser) => appUser.isAdmin)
    )
}
}