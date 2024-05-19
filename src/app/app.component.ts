import { Component, EventEmitter, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NemBuqiTorrent';
  page = 'main';
  routes: Array<string> = [];
  loggedinUser?:firebase.default.User|null;

  constructor(private router:Router,private authServ:AuthService)
  {
    
  }

  ngOnInit(): void {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authServ.isUserLoggedIn().subscribe(user =>{
      this.loggedinUser = user;
      localStorage.setItem('user',JSON.stringify(this.loggedinUser));
    },error =>{
        localStorage.setItem('user',JSON.stringify('null'));
        console.error(error);
    })
  }
  changePage(selectedPage:string)
  {
    this.router.navigateByUrl(selectedPage);
  }

  sideBarToggle(sidenav : MatSidenav)
  {
    sidenav.toggle();
  }

  onClose(event: any,sidenav:MatSidenav)
  {
    if(event == true)
    {
      sidenav.close();
    }
  }

  logout( event?: boolean)
  {
    this.authServ.logout();
  }

}
