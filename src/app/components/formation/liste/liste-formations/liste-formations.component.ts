import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-formations',
  templateUrl: './liste-formations.component.html',
  styleUrls: ['./liste-formations.component.css']
})
export class ListeFormationsComponent implements OnInit {
  liste: any[];
  pageCount: any[];
  constructor() { }

  ngOnInit() {
  }

}
