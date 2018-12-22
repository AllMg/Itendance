import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { RbService } from '../../services/rb/rb.service';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
  selector: 'app-rb-recette',
  templateUrl: './rb-recette.component.html',
  styleUrls: ['./rb-recette.component.css']
})
export class RbRecetteComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;
  @ViewChild('modalMessageImport') modalMessageImport;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Import = {
    fichier: "Parcourir mon ordinateur",
    liste: [],
    nbTraiteAuto: 0,
    nbNonTraiteAuto: 0,
    format: ["Compte", "Code", "Date", "Valeur", "Libelle1", "Libelle2", "Montant", "Ref"],
    afficheErreur: false
  };

  Manuel = {
    liste: [],
    indice: -1,
    filtre: {
      compte: "",
      code: null
    },
    listeFlag: [],
    flagChoisi: -1,
    observation: "",
    grandLivre: []
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private rbService: RbService) { }

  ngOnInit() {
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
    if (nom == "manuel") {
      this.prendListeFlag();
      this.prendListeNonTraiteAuto();
    }
  }

  fichierChange($event) {
    this.afficheChargement();
    let fichier = $event.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      let donnees = e.target.result;
      let workBook: XLSX.WorkBook = XLSX.read(donnees, { type: 'binary' });
      let feuille = workBook.SheetNames[0];
      let workSheet: XLSX.WorkSheet = workBook.Sheets[feuille];
      let liste = XLSX.utils.sheet_to_json(workSheet, { raw: true });
      if (liste.length > 0) {
        if (this.bonFormatDeDonnees(liste[0])) {
          this.Import.liste = liste;
        }
        else {
          this.Import.liste = [];
        }
      }
      this.fermeChargement();
    };
    fileReader.onerror = () => {
      this.toast.error("Lecture du fichier impossible");
      this.fermeChargement();
    };
    fileReader.readAsBinaryString(fichier);
    this.Import.fichier = fichier.name;
  }

  bonFormatDeDonnees(element) {
    let attr = [];
    for (let att in element) {
      attr.push(att);
    }
    if (attr.length != this.Import.format.length) {
      this.Import.afficheErreur = true;
      this.ouvreMessageImport();
      return false;
    }
    let nbOk = 0;
    for (let format of this.Import.format) {
      for (let att of attr) {
        if (att == format) {
          nbOk++;
        }
      }
    }
    if (nbOk == this.Import.format.length) {
      return true;
    }
    else {
      this.Import.afficheErreur = true;
      this.ouvreMessageImport();
      return false;
    }
  }

  importerLesDonnees() {
    this.afficheChargement();
    let that = this;
    let observ = this.rbService.rappBancTopic("importerDonnéesExcelRBSE", this.Import.liste, true).subscribe(obs => {
      console.log("importerDonnéesExcelRBSE", obs);
      if (obs.success) {
        that.Import.afficheErreur = false;
        that.Import.nbTraiteAuto = obs.msg.nbTraiteAuto;
        that.Import.nbNonTraiteAuto = obs.msg.nbNonTraiteAuto;
        that.Import.liste = [];
      }
      else {
        that.toast.error(obs.msg);
      }
      observ.unsubscribe();
    });
  }

  voirRapprochementManuel() {
    this.fermeMessageImport();
    this.prendListeFlag();
    this.prendListeNonTraiteAuto();
    this.Menu.sousMenu = "manuel";
  }

  prendListeNonTraiteAuto() {
    let that = this;
    let observ = this.rbService.rappBancTopic("prendListeNonTraiteAutoRBSE", this.Manuel.filtre, true).subscribe(obs => {
      console.log("prendListeNonTraiteAutoRBSE", obs);
      if (obs.success) {
        that.Manuel.liste = obs.msg;
      }
      observ.unsubscribe();
    });
  }

  prendListeFlag() {
    if (this.Manuel.listeFlag.length == 0) {
      let that = this;
      let observ = this.rbService.rappBancTopic("prendListeFlagRBSE", "", true).subscribe(obs => {
        console.log("prendListeFlagRBSE", obs);
        if (obs.success) {
          that.Manuel.listeFlag = obs.msg;
        }
        observ.unsubscribe();
      });
    }
  }

  clickLigne(index){
    this.Manuel.indice = index;
    this.Manuel.flagChoisi = this.Manuel.liste[index].idTypeFlag;
    this.Manuel.grandLivre = [];
    this.Manuel.observation = "";
    this.Menu.sousMenu = "ligne";
    let that = this;
    let argument = {
      cpte: this.Manuel.liste[index].compte,
      codedr: this.Manuel.liste[index].codeDr,
      debut: this.Manuel.liste[index].dateOperation,
      fin: this.Manuel.liste[index].dateValeur,
      exercice: "" // est déjà compris dans la date début et fin
    };
    let observ = this.rbService.getGLDR(argument).subscribe(obs=>{
      console.log("getGLDR",obs);
      if(obs.success){
        that.Manuel.grandLivre = obs.msg.gl;
      }
      observ.unsubscribe();
    });
  }

  validerEtatLigne(){
    this.afficheChargement();
    let that = this;
    let argument = {
      idRecette: this.Manuel.liste[this.Manuel.indice].idRecette,
      observation: this.Manuel.observation
    };
    let observ = this.rbService.rappBancTopic("changerFlagRecetteRBSE",argument,true).subscribe(obs=>{
      console.log("changerFlagRecetteRBSE",obs);
      that.fermeChargement();
      if(obs.success){
        that.Menu.sousMenu = "manuel";
        that.Manuel.liste.splice(that.Manuel.indice, 1);
        that.Manuel.indice = -1;
      }
      else{
        that.toast.error(obs.msg);
      }
      observ.unsubscribe();
    });
  }

  revenirALaListe(){
    this.Menu.sousMenu = "manuel";
    this.Manuel.indice = -1;
  }

  ouvreMessageImport() {
    $(this.modalMessageImport.nativeElement).modal('show');
  }

  fermeMessageImport() {
    $(this.modalMessageImport.nativeElement).modal('hide');
  }

  afficheChargement() {
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement() {
    $(this.modalChargement.nativeElement).modal('hide');
  }

  /* 
  date: aaaa-mm-jj 
  resultat: jj/mm/aaaa
  */
  avoirDateSlash(date) {
    if (date == "" || date == null || date == undefined) {
      return "";
    }
    else {
      let strs = date.toString().split("-");
      let resultat = strs[2] + "/" + strs[1] + "/" + strs[0];
      return resultat;
    }
  }

}
