import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ComdialogComponent } from 'src/app/shared/comdialog/comdialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Torrent } from 'src/app/shared/models/Torrents';
import { UpdatedialogComponent } from 'src/app/shared/updatedialog/updatedialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})



export class DownloadComponent implements OnInit {
  items:Observable<any[]> | undefined;
  comments:Observable<any[]>|undefined;
  user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  tabindex:number|undefined;
  constructor(private firedb:DbService,
    private dialog: MatDialog,
    private authserive:AuthService) {
    
   }

  ngOnInit(): void {
    this.items = this.firedb.getDatabaseList('torrent');
    this.comments = this.firedb.getDatabaseList('comment');
  }

  getID(id:string)
  {
    console.log(id);
  }

  openDialog(id:string)
  {
    this.dialog.open(ComdialogComponent,{
      width: '500px',
      data: {ownerid: id},
    });
  }

  refreshComment($event:any,id:string){
    let index = $event.index;
    if(index === 0){
      return;
    }
    else{
      this.comments = this.firedb.selectCommentsById(id);
    }
    
  }

  refreshCommentExpand($event:any,id:string)
  {
    this.comments = this.firedb.selectCommentsById(id);
  }

  setStep()
  {

  }

  onDelete(id:string)
  {
    this.firedb.deleteObject("torrent",id).then(()=>{
      window.alert('Sikeres torles');
    });
    
  }

  onDeleteParam(name:string,id:string)
  {
    this.firedb.deleteObject(name,id).then(()=>{
      window.alert('Sikeres torles');
    });
    
  }

  onUpdate(id:string,datep:any,descriptionp:string,linkp:string,metricp:string,namep:string,sizep:string,ownerp:string,usernamep:string)
  {
    const torrent:Torrent ={
      date:datep,
      description:descriptionp,
      link:descriptionp,
      metric:metricp,
      name:namep,
      size:Number(sizep),
      owner: ownerp,
      username: usernamep
    }

    this.dialog.open(UpdatedialogComponent,{
      height: '750px',
      data: {uptorrent: torrent,torrentid:id}
    });
    
  }




}
