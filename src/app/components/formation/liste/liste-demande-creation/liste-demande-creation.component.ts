import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-demande-creation',
  templateUrl: './liste-demande-creation.component.html',
  styleUrls: ['./liste-demande-creation.component.css']
})
export class ListeDemandeCreationComponent implements OnInit {
  liste: any[];
  pageCount: any[];
  constructor() { }

  ngOnInit() {
  }

}
