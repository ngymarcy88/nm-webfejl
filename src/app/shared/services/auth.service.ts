import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email:string,password:string)
  {
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  signup(email:string,password:string)
  {
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  logout(){
    return this.auth.signOut().then(() =>{
      console.log('Logged out succesfully.');
    }).catch(error =>{
      console.error(error);
    });
  }


}
