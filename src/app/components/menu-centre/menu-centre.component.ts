import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-centre',
  templateUrl: './menu-centre.component.html',
  styleUrls: ['./menu-centre.component.css']
})
export class MenuCentreComponent implements OnInit {

  private user: any;
  entity: string;
  
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.entity = this.user.type_entite;
    }
  }

}
