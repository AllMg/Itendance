import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche-ap',
  templateUrl: './fiche-ap.component.html',
  styleUrls: ['./fiche-ap.component.css']
})
export class FicheApComponent implements OnInit {

  x:any;
  constructor() { }

  ngOnInit() {
    this.x="test";
  }

}
