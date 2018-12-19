import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //getting firebase user name from console
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
   }

  logout(){
    this.afAuth.auth.signOut();
  }

  login(){
    //storing the url for redirecting for eg: pshop.com/shopping-cart 
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ||  '/'; 
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
