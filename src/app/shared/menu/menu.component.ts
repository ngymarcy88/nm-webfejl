import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 @Output() selectedPage: EventEmitter<string> = new EventEmitter();
 @Input() currentPage: string = '';
 @Input() loggedinUser?: firebase.default.User|null;
 @Output() NavBarClose: EventEmitter<boolean> = new EventEmitter();
 @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  menuSwitch()
  {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean)
  {
    this.NavBarClose.emit(true);
    if (logout === true)
    {
      this.onLogout.emit(logout);
    }
  }
}
