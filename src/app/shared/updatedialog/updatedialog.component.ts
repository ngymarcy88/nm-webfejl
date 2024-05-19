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
  selector: 'app-updatedialog',
  templateUrl: './updatedialog.component.html',
  styleUrls: ['./updatedialog.component.css']
})
export class UpdatedialogComponent implements OnInit {


  userdb:User|undefined;
  useruidlog:string | undefined;
  updateForm = new FormGroup({
    name:  new FormControl(''),
    size: new FormControl(''),
    metric: new FormControl(''),
    date: new FormControl(''),
    link: new FormControl(''),
    owner: new FormControl(''),
    description: new FormControl('')
  });
  torrent: Torrent|undefined;


  constructor(
    private dialogRef: MatDialogRef<UpdatedialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service:DbService
  ) { }



  ngOnInit(): void
  {
    console.log(this.data);
    console.log(this.data.uptorrent.username);
    this.torrent ={
      date:this.data.uptorrent.date,
      description:this.data.uptorrent.description,
      link:this.data.uptorrent.link,
      metric:this.data.uptorrent.metric,
      name:this.data.uptorrent.name,
      size:Number(this.data.uptorrent.size),
      owner: this.data.uptorrent.owner,
      username: this.data.uptorrent.username
    }
  }

  
  async onSubmit()
  {
    const torrentup:Torrent = {
      date:this.updateForm.get('date')?.value,
      description:this.updateForm.get('description')?.value,
      link:this.updateForm.get('link')?.value,
      metric:this.updateForm.get('metric')?.value,
      name:this.updateForm.get('name')?.value,
      size:Number(this.updateForm.get('size')?.value),
      owner: this.data.uptorrent.owner,
      username: this.data.uptorrent.username
    }
    this.service.updateTorrent(this.data.torrentid,torrentup).then(()=>{
      window.alert('Sikeres update');
    }).catch(error =>{
      console.error(error);
    })
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

  clearForm(){
    this.updateForm.reset();
  }
}
