import { Location } from '@angular/common';
import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/Users';
import { DbService } from '../../shared/services/db.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   dbuser = "useer";

  signUpForm = new FormGroup({
    email:  new FormControl('',Validators.required),
    username:  new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    repassword: new FormControl('',Validators.required),
    birth: new FormControl('',Validators.required),
    name: new FormGroup({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required)
    })
    
  });



  constructor(private location:Location,private authServ: AuthService,private dbservice:DbService,private router:Router) { }

  ngOnInit(): void {
  }



  onSubmit()
  {
    if(this.signUpForm.get('password')?.value != this.signUpForm.get('repassword')?.value){
      window.alert('Jelszavaid nem egyeznek');
      return;
    }
    console.log(this.signUpForm.value);
    this.authServ.signup(this.signUpForm.get("email")?.value,this.signUpForm.get("password")?.value).then(cred =>{
      const user:User = {
        id: cred.user?.uid as string,
        email: this.signUpForm.get('email')?.value,
        username: this.signUpForm.get('username')?.value,
        name: {
          firstname: this.signUpForm.get('name.firstname')?.value,
          lastname: this.signUpForm.get('name.lastname')?.value
        },
        dateofbirth: new Date(this.signUpForm.get('birth')?.value),
        admin: false
      }
      console.log(user);
      this.dbservice.createnewUser(user);
      window.alert('Sikeres regisztracio');
      //this.signUpForm.reset();
      this.router.navigateByUrl('profile');
    }).catch(error =>{
      window.alert("Valami hiba tortent");
      this.router.navigateByUrl("login");
      console.error(error);
    })

    
  }

  goBack(){
    this.location.back();
  }

  clearForm(){
    this.signUpForm.reset();
  }

}
