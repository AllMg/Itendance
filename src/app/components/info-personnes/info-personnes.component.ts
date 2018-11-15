import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-personnes',
  templateUrl: './info-personnes.component.html',
  styleUrls: ['./info-personnes.component.css']
})
export class InfoPersonnesComponent implements OnInit {

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
