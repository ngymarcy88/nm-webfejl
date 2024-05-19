import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/Users';
import { DbService } from '../../shared/services/db.service';
import {Router} from "@angular/router"
import { user } from '@angular/fire/auth';
import { Torrent } from 'src/app/shared/models/Torrents';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  userdb:User|undefined;
  useruid:string|undefined;

  torrentForm = new FormGroup({
    name:  new FormControl('',Validators.required),
    size: new FormControl('',Validators.required),
    metric: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required),
    link: new FormControl('',Validators.required),
    owner: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  constructor(private dbservice:DbService,private router:Router) { }

  ngOnInit(): void
   {
   
  }

   async onSubmit()
  {
    //TODO Proba
    await this.getOwner();
    console.log(this.userdb?.username);
     this.torrentForm.get('owner')?.setValue(this.userdb?.username);
     const torrent:Torrent ={
       name: this.torrentForm.get('name')?.value,
       size: this.torrentForm.get('size')?.value,
       metric: this.torrentForm.get('metric')?.value,
       link: this.torrentForm.get('link')?.value,
       username: this.torrentForm.get('owner')?.value,
       owner: this.userdb?.id,
       date: this.torrentForm.get('date')?.value,
       description: this.torrentForm.get('description')?.value
     }
     console.log(torrent);
     if(torrent.name === ''){
       window.alert('Töltsd ki a mezőket');
       return;
     }
     this.dbservice.createNewTorrent(torrent).then(() =>{
       window.alert('Sikeres Torrent feltöltés');
       this.router.navigateByUrl('download');
     });
    
  }

  goBack(){

  }

   getOwner()
  {
    
    return new Promise<void>((resolve,reject) =>
    {
      this.dbservice.getUserbyCurrentID().subscribe(
      {
        next: data =>
        {
          this.userdb = data;
          resolve();
        }
      });
    });  
  }

  clearForm(){
    this.torrentForm.reset();
  }

}
