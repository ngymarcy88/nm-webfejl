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

@Component({
  selector: 'app-comdialog',
  templateUrl: './comdialog.component.html',
  styleUrls: ['./comdialog.component.css']
})
export class ComdialogComponent implements OnInit {
  userdb:User|undefined;
  useruidlog:string | undefined;
  commentForm = new FormGroup({
    comment:  new FormControl(''),
    date: new FormControl('')
  });


  constructor(
    private dialogRef: MatDialogRef<ComdialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private service:DbService
  ) { }



  ngOnInit(): void {
  }
  
  async onSubmit()
  {
    await this.getOwner();
    const comment:Comment={
      comment: this.commentForm.get('comment')?.value as string,
      date: this.commentForm.get('date')?.value,
      username: this.userdb?.username as string,
      torrentid: this.data.ownerid,
      userid: this.userdb?.id as string
    }
    console.log(comment);
    this.service.createNewComment(comment).then(()=>{
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
