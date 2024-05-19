import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/shared/services/db.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ComdialogComponent } from 'src/app/shared/comdialog/comdialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/Users';
import {Router} from "@angular/router"
import { TAnswers } from 'src/app/shared/models/TAnswers';
import { AnswerdialogComponent } from 'src/app/shared/answerdialog/answerdialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  items:Observable<any[]> | undefined;
  answers:Observable<any[]>|undefined;
  userdb: User|undefined;
  tabindex:number|undefined;


  answerForm = new FormGroup({
    answer:  new FormControl(''),
    ptorrentid:  new FormControl(''),
    username: new FormControl(''),
  });

  constructor(private firedb:DbService,
    private dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.items = this.firedb.getDatabaseList('ptorrent');
    this.answers = this.firedb.getDatabaseList('anstorrent');
  }

  getID(id:string)
  {
    console.log(id);
  }

  openDialog()
  {
    this.dialog.open(AnswerdialogComponent,{
      width: '500px',
      height: '350px'
    });
  }

  refreshAnswers($event:any,id:string){
    let index = $event.index;
    if(index === 0){
      return;
    }
    else{
      console.log(id);
      this.answers = this.firedb.selectAnswersById(id);
    }
    
  }

  refreshAnswersExpanded($event:any,id:string)
  {
    this.answers = this.firedb.selectAnswersById(id);
    console.log(this.answers);
  }

  async onIt(owner:string)
  {
    await this.getOwner();
    this.answerForm.get('ptorrentid')?.setValue(owner);
    this.answerForm.get('answer')?.setValue(this.userdb?.id);
    this.answerForm.get('username')?.setValue(this.userdb?.username);
    const answer:TAnswers = {
      answer: this.answerForm.get('answer')?.value,
      ptorrentid: this.answerForm.get('ptorrentid')?.value,
      username: this.answerForm.get('username')?.value
    }
    this.firedb.createNewAnswer(answer).then(()=>{
      window.alert('Sikeres valasz');
    });
  }

  getOwner()
  {
    return new Promise<void>((resolve,reject) =>
    {
      this.firedb.getUserbyCurrentID().subscribe(
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
