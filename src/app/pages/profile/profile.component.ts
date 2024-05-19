import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { elementAt, Observable } from 'rxjs';
import { User } from '../../shared/models/Users';
import { DbService } from '../../shared/services/db.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  item: User | undefined;
  numberofTorrents: number|undefined;
  items:Observable<any[]> | undefined;
  comments:Observable<any[]>|undefined;
  torrentcountarray:Observable<any[]>|undefined;
  torrentcounter:number|undefined;
  commentsarray:Observable<any[]>|undefined;
  commentcounter:number|undefined;
  constructor(private dbservice: DbService) { }

   ngOnInit()
   {
    this.initasync();
  }

  async initasync()
  {
    this.torrentcounter = 0;
    this.commentcounter = 0;
    await this.getOwner();
    this.dbservice.getUploadedTorrents(this.item?.id as string).subscribe(result =>{
      result.forEach(element =>{
        (this.torrentcounter as number)++;
      })
    });

    this.dbservice.getUploadedComments(this.item?.id as string).subscribe(result =>{
      result.forEach(element =>{
        (this.commentcounter as number)++;
      })
    })
  }

  getOwner()
  {
    
    return new Promise<void>((resolve,reject) =>
    {
      this.dbservice.getUserbyCurrentID().subscribe(
      {
        next: data =>
        {
          this.item = data;
          resolve();
        }
      });
    });  
  }

}
