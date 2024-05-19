import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/Users';
import { DbService } from '../../shared/services/db.service';
import {Router} from "@angular/router"
import { user } from '@angular/fire/auth';
import { Torrent } from 'src/app/shared/models/Torrents';
import {Comment} from '../../shared/models/Comments';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PTorrent } from '../models/PTorrents';

@Component({
  selector: 'app-answerdialog',
  templateUrl: './answerdialog.component.html',
  styleUrls: ['./answerdialog.component.css']
})
export class AnswerdialogComponent implements OnInit {

  userdb:User|undefined;
  useruidlog:string | undefined;
  seekForm = new FormGroup({
    name:  new FormControl(''),
    date:  new FormControl(''),
    description:  new FormControl('')
  });


  constructor(
    private dialogRef: MatDialogRef<AnswerdialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service:DbService
  ) { }



  ngOnInit(): void {
  }
  
  async onSubmit()
  {
    await this.getOwner();
    const seek:PTorrent ={
      name: this.seekForm.get('name')?.value,
      date: this.seekForm.get('date')?.value,
      description : this.seekForm.get('description')?.value,
      owner: this.userdb?.id as string,
      username: this.userdb?.username as string
    }
    console.log(seek);
    this.service.createNewSeek(seek).then(()=>{
      window.alert('Sikeres hozzadas');
    });
  }

  goBack()
  {

  }

  getOwner()
  {
    return new Promise<void>((resolve,reject) =>
    {
      this.service.getUserbyCurrentID().subscribe(
      {
        next: data =>
        {
          this.userdb = data;
          console.log(this.userdb?.username);
          resolve();
        }
      });
    });  
  }
}
