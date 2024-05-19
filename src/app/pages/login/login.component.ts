import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('',Validators.required);
  password = new FormControl('',Validators.required);

  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login()
  {
    if(this.email.value === '' || this.password.value === ''){
      window.alert('Üres mezők');
      return;
    }
    this.authService.login(this.email.value,this.password.value).then(cred =>{
      console.log(cred);
      this.router.navigateByUrl('main');

    }).catch(error =>{
      console.error(error);
    });
  }
  

}
