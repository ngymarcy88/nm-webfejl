import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Torrent } from '../models/Torrents';
import { User } from '../models/Users';
import { Comment } from '../models/Comments';
import { TAnswers } from '../models/TAnswers';
import { PTorrent } from '../models/PTorrents';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private firestoredb: AngularFirestore)
   {
       
   }
  
  getDatabaseList(name:string)
  {
    return this.firestoredb.collection(name).valueChanges({ idField: 'propertyId' });
  }

  getUserbyId(id:string)
  {
    return this.firestoredb.collection<User>("user").doc(id).valueChanges();
  }

  getUserbyCurrentID(){
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    return this.firestoredb.collection<User>('user').doc(user.uid).valueChanges();
  }

  createnewUser(data: User) {
    return new Promise<any>((resolve, reject) => {
      this.firestoredb
        .collection("user")
        .doc(data.id)
        .set(data);
    }).then(resolve =>{
      console.log('Sikers regisztracio');
      console.log(resolve);
      //this.router.navigateByUrl("/profile");
    }).catch(reject =>
      {
        console.error(reject);
        //this.router.navigateByUrl("/signup");
      });
  }

  createNewTorrent(data:Torrent)
  {
    return this.firestoredb.collection('torrent').add(data).then(()=>{
      console.log('Sikeres torrent hozzaadas');
    }).catch(error =>{
      console.error(error);
    });
  }

  createNewComment(data:Comment)
  {
    return this.firestoredb.collection('comment').add(data).then(()=>{
      console.log('Sikeres torrent hozzaadas');
    }).catch(error =>{
      console.error(error);
    });
  }

  createNewAnswer(data:TAnswers)
  {
    return this.firestoredb.collection('anstorrent').add(data).then(()=>{
      console.log('Sikeres torrent hozzaadas');
    }).catch(error =>{
      console.error(error);
    });
  }

  createNewSeek(data:PTorrent)
  {
    return this.firestoredb.collection('ptorrent').add(data).then(()=>{
      console.log('Sikeres keres hozzaadas');
    }).catch(error =>{
      console.error(error);
    });
  }

  selectCommentsById(id:string)
  {
    return this.firestoredb.collection<Comment>('comment',ref => ref.where('torrentid','==',id).orderBy('date','desc')).valueChanges({ idField: 'propertyId' });
  }

  selectAnswersById(id:string)
  {
    console.log(id);
    return this.firestoredb.collection('anstorrent',ref => ref.where('ptorrentid','==',id)).valueChanges({ idField: 'propertyId' });
  }

  getUploadedTorrents(id:string)
  {
     return this.firestoredb.collection('torrent',ref => ref.where('owner','==',id)).valueChanges();
  }

  getUploadedComments(id:string)
  {
     return this.firestoredb.collection('comment',ref => ref.where('userid','==',id)).valueChanges();
  }

  deleteObject(name:string,id:string)
  {
    return this.firestoredb.collection(name).doc(id).delete();
  }

  deleteUser(data: any) {
    return this.firestoredb
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .delete();
  }

  updateTorrent(id:string,data:any){
    return this.firestoredb.collection('torrent').doc(id).update(data);
  }

}
