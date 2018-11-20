import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traitement-sem-ij2',
  templateUrl: './traitement-sem-ij2.component.html',
  styleUrls: ['./traitement-sem-ij2.component.css']
})
export class TraitementSemIj2Component implements OnInit {
  idDmdIJ: any;
  individu: any;
  adresseIndividu: any;
  show = false;
  constructor() { }

  ngOnInit() {
  }
  onModifTecInfReq() {}
  onAcceptCLick() {}

}
