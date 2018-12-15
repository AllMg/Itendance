import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { ImmoService } from '../../services/immo/immo.service';

declare var $: any;

@Component({
  selector: 'app-bp-document',
  templateUrl: './bp-document.component.html',
  styleUrls: ['./bp-document.component.css']
})
export class BpDocumentComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Recette = {
    annee: 1940,
    exercice: null,
    total: 0,
    liste: []
  };

  Dep041 = {
    annee: 1940,
    exercice: null,
    totalFCT: 0,
    totalINV: 0,
    listeFCT: [],
    listeINV: []
  };

  Dep804 = {
    annee: 1940,
    exercice: null,
    totalFCT: 0,
    totalINV: 0,
    listeFCT: [],
    listeINV: []
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private immoService: ImmoService) {
    let annee = new Date(Date.now()).getFullYear();
    this.Recette.annee = annee;
    this.Dep041.annee = annee;
    this.Dep804.annee = annee;
  }

  ngOnInit() {
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
  }

  chargerRecettes() {
    this.afficheChargement();
    this.Recette.exercice = this.Recette.annee;
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("7").subscribe(obs => {
      console.log("getCptbyGroupe 7", obs);
      if (obs.success) {
        that.initListe("Recette", "liste", obs);
        that.prendRecetteValeur();
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }

  /**
   * 
   * @param obj Recette ou Dep041 ou Dep804
   * @param tab listeFCT ou listeINV ou liste, attribut de l'objet obj
   * @param obs l'objet réponse depuis l'appel d'un topic
   */
  initListe(obj, tab, obs) {
    let liste = [];
    let indice = -1;
    for (let i = 0; i < obs.msg.length; i++) {
      if (obs.msg[i].idpcg.length == 2) {
        liste.push({
          numeroCompte: obs.msg[i].idpcg,
          libelleCompte: obs.msg[i].libelcpt,
          enfants: []
        });
        indice++;
      }
      else if (obs.msg[i].idpcg.length == 3) {
        liste[indice].enfants.push({
          numeroCompte: obs.msg[i].idpcg,
          libelleCompte: obs.msg[i].libelcpt,
          valeur: 0
        });
      }
    }
    this.enleveSansEnfant(liste, 0);
    this[obj][tab] = liste;
  }

  /**
   * 
   * @param liste le tableau qui contient les éléments
   * @param indice l'indice courant d'un élément
   * retire l'élément parent qui n'a pas d'enfant (à trois chiffre)
   */
  enleveSansEnfant(liste, indice) {
    if (indice < liste.length) {
      if (liste[indice].enfants.length == 0) {
        liste.splice(indice, 1);
        this.enleveSansEnfant(liste, indice);
      }
      else {
        this.enleveSansEnfant(liste, indice + 1);
      }
    }
  }

  chargerDepenses041() {
    this.afficheChargement();
    this.Dep041.exercice = this.Dep041.annee;
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("6").subscribe(obs => {
      console.log("getCptbyGroupe 6", obs);
      observ.unsubscribe();
      if (obs.success) {
        that.initListe("Dep041", "listeFCT", obs);
        observ = this.budgetService.getCptbyGroupe("2").subscribe(obs2 => {
          console.log("getCptbyGroupe 2", obs2);
          observ.unsubscribe();
          if (obs2.success) { 
            that.initListe("Dep041", "listeINV", obs2);
            that.prendDepenseValeur("Dep041", "041", "listeFCT", "totalFCT");
            that.prendDepenseValeur("Dep041", "041", "listeINV", "totalINV");
            that.fermeChargement();
          }
          observ.unsubscribe();
        });
      }
      else {
        that.fermeChargement();
      }
    });
  }

  chargerDepenses804() {
    this.afficheChargement();
    this.Dep804.exercice = this.Dep804.annee;
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("6").subscribe(obs => {
      console.log("getCptbyGroupe 6", obs);
      observ.unsubscribe();
      if (obs.success) {
        that.initListe("Dep804", "listeFCT", obs);
        observ = this.budgetService.getCptbyGroupe("2").subscribe(obs2 => {
          console.log("getCptbyGroupe 2", obs2);
          observ.unsubscribe();
          if (obs2.success) { 
            that.initListe("Dep804", "listeINV", obs2);
            that.prendDepenseValeur("Dep804", "804", "listeFCT", "totalFCT");
            that.prendDepenseValeur("Dep804", "804", "listeINV", "totalINV");
            that.fermeChargement();
          }
          observ.unsubscribe();
        });
      }
      else {
        that.fermeChargement();
      }
    });
  }

  prendRecetteValeur(){
    let argument = {
      annee: this.Recette.exercice,
      numeroComptes: []
    };
    for(let parent of this.Recette.liste){
      for(let enf of parent.enfants){
        argument.numeroComptes.push(enf.numeroCompte);
      }
    }
    let that = this;
    let observ = this.budgetService.budgetTopic("prendDocumentRecetteBPSE",argument,true).subscribe(obs=>{
      console.log("prendDocumentRecetteBPSE",obs);
      if(obs.success){
        let indice = 0;
        let total = 0;
        for(let parent of that.Recette.liste){
          for(let enf of parent.enfants){
            enf.valeur = obs.msg[indice];
            total += obs.msg[indice];
            indice++;
          }
        }
        that.Recette.total = total;
      }
      observ.unsubscribe();
    });
  }

  prendDepenseValeur(obj, progr, tab, som){
    let argument = {
      annee: this[obj].exercice,
      codeProgr: progr,
      numeroComptes: []
    };
    for(let parent of this[obj][tab]){
      for(let enf of parent.enfants){
        argument.numeroComptes.push(enf.numeroCompte);
      }
    }
    let that = this;
    let observ = this.budgetService.budgetTopic("prendDocumentDepenseParProgrBPSE",argument,true).subscribe(obs=>{
      console.log("prendDocumentDepenseParProgrBPSE",obs);
      if(obs.success){
        let indice = 0;
        let total = 0;
        for(let parent of that[obj][tab]){
          for(let enf of parent.enfants){
            enf.valeur = obs.msg[indice];
            total += obs.msg[indice];
            indice++;
          }
        }
        that[obj][som] = total;
      }
      observ.unsubscribe();
    });
  }

  afficheChargement() {
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement() {
    $(this.modalChargement.nativeElement).modal('hide');
  }

}
