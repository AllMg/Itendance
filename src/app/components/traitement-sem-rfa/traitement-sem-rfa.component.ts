import { Component, OnInit } from '@angular/core';
import { Params } from '../../../assets/fontawesome-free-5.0.9/advanced-options/use-with-node-js/fontawesome';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-traitement-sem-rfa',
  templateUrl: './traitement-sem-rfa.component.html',
  styleUrls: ['./traitement-sem-rfa.component.css']
})
export class TraitementSemRfaComponent implements OnInit {
  idDmdIJ: any;
  individu: any;
  adresseIndividu: any;
  show = false;
  reference: any;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.reference = params['id'];
    });
  }
  onModifTecInfReq() {}
  onAcceptCLick() {}


}
