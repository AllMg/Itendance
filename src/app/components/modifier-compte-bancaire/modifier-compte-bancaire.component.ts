import { Component, OnInit } from '@angular/core';
import { BanqueService } from '../../services/banque/banque.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-compte-bancaire',
  templateUrl: './modifier-compte-bancaire.component.html',
  styleUrls: ['./modifier-compte-bancaire.component.css']
})
export class ModifierCompteBancaireComponent implements OnInit {
  public show: boolean;
  public show1: boolean;
  user: any;
  pays: any;
  banque: any;
  lieuAgence: any;
  compteBancaire: string;
  cleRib: string;
  datedebut: string;
  codeSwift: string;
  domicialiation: string;
  departement: string;
  localite: string;
  codeRegion: string;
  boitePostal: string;
  listBanque: any[];
  listPays: any[];
  listLieuAgence: any[];
  constructor(
    private routes: Router,
    private banqueService: BanqueService,
    private toastr: ToastrService
  ) {
    this.show = false;
    this.show1 = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.banqueService.listBanque().subscribe(data => {
      if (data.success) {
        this.listBanque = data.msg;
      } else {
        alert(data.msg);
      }
    });

    this.banqueService.listPays().subscribe(data => {
      if (data.success) {
        this.listPays = data.msg;
      } else {
        alert(data.msg);
      }
    });
  }

  onModifCLick() {
    this.show = true;
    const msg = {
      'id_compte': null,
      'id_pays': parseInt(this.pays),
      'id_rel_bq_agce': this.listLieuAgence[this.lieuAgence],
      'compte': this.compteBancaire,
      'cle': this.cleRib,
      'date_debut': this.datedebut,
      'date_fin': null,
      'succursale_code': null,
      'code_swift': this.codeSwift,
      'domiciliation': this.domicialiation,
      'departement': this.departement,
      'localite': this.localite,
      'code_region': this.codeRegion,
      'bp': this.boitePostal,
      'id_empl': this.user.id_acces,
      'id_individu': this.user.id_acces
    };

    this.banqueService.modifCompteBancaire(msg).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.toastr.success("Success");
        this.routes.navigate(['/accueil-connecte']);
      } else {
        this.show = false;
        this.toastr.error(data.msg);
      }
    });
  }

  onChange() {
    this.show1 = true;
    const banque = this.listBanque[this.banque];
    console.log('banque', banque);
    this.banqueService.listAgenceByBanque(banque).subscribe(data => {
      if (data.success) {
        this.show1 = false;
        this.listLieuAgence = data.msg;
      } else {
        this.show1 = false;
        this.toastr.error(data.msg);
      }
    });
  }

}
