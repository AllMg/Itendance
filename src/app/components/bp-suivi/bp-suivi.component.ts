import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { ImmoService } from '../../services/immo/immo.service';

declare var $: any;

@Component({
  selector: 'app-bp-suivi',
  templateUrl: './bp-suivi.component.html',
  styleUrls: ['./bp-suivi.component.css']
})
export class BpSuiviComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  General = {
    visibleFCT: false,
    visibleINV: false,
    visibleREC: false,
    visibleDEP: false,
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: []
  };

  Service = {
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: []
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private immoService: ImmoService) { }

  ngOnInit() {
    
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
    if(nom=="general"){
      if(this.General.listeFCT.length == 0){
        this.chargeListeCompteFCT("General");
      }
    }
    else if(nom=="service"){
      if(this.Service.listeFCT.length == 0){
        this.chargeListeCompteFCT("Service");
      }
    }
  }

  chargerBudgetAnnuelGeneral(){

  }

  chargeListeCompteFCT(obj){
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("6").subscribe(obs => {
      console.log("getCptbyGroupe 6", obs);
      if (obs.success) {
        let liste = [];
        let indice = -1;
        for (let rubrique of obs.msg) {
          if (rubrique.idpcg.startsWith("69")) {
            break;
          }
          else {
            if (rubrique.idpcg.length == 2) {
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
            else {
              if (rubrique.imputable == "I") {
                liste[indice].enfants.push({
                  numeroCompte: rubrique.idpcg,
                  libelleCompte: rubrique.libelcpt,
                  precision: "",
                  projets: {}
                });
              }
            }
          }
        }
        let comptes = ["60451", "60452", "60453", "6048"];
        for (let compte of comptes) {
          this[obj].listeDEP.push({
            numeroCompte: compte,
            libelleCompte: "",
            projets: {}
          });
        }
        for (let compte of this[obj].listeDEP) {
          for (let rubrique of obs.msg) {
            if (rubrique.idpcg == compte.numeroCompte) {
              compte.libelleCompte = rubrique.libelcpt;
            }
          }
        }
        that[obj].listeFCT = liste;
        that.chargeListeRubriqueINV(obj);
      }
      else {
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }

  chargeListeRubriqueINV(obj) {
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("2").subscribe(obs => {
      console.log("getCptbyGroupe 2", obs);
      if (obs.success) {
        let liste = [];
        let indice = -1;
        for (let i = 0; i < obs.msg.length; i++) {
          let rubrique = obs.msg[i];
          if (rubrique.imputable == "N") {
            if (obs.msg[i + 1].imputable == "I") {
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
          }
          else {
            liste[indice].enfants.push({
              numeroCompte: rubrique.idpcg,
              libelleCompte: rubrique.libelcpt,
              precision: "",
              projets: {}
            });
          }
        }
        that[obj].listeINV = liste;
        that.chargeListeRubriqueREC(obj);
      }
      else {
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }
  
  chargeListeRubriqueREC(obj) {
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("7").subscribe(obs => {
      console.log("getCptbyGroupe 7", obs);
      if (obs.success) {
        let liste = [];
        let indice = -1;
        for (let i = 0; i < obs.msg.length; i++) {
          let rubrique = obs.msg[i];
          if (rubrique.imputable == "N") {
            if (obs.msg[i + 1].imputable == "I") {
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
          }
          else {
            liste[indice].enfants.push({
              numeroCompte: rubrique.idpcg,
              libelleCompte: rubrique.libelcpt,
              precision: "",
              projets: {}
            });
          }
        }
        that[obj].listeREC = liste;
      }
      that.fermeChargement();
      observ.unsubscribe();
    });
  }

  clickCategorieFCT(){
    this.General.visibleFCT = !this.General.visibleFCT;
  }

  clickParentFCT(obj, index) {
    this[obj].listeFCT[index].visible = !this[obj].listeFCT[index].visible;
  }

  clickCategorieINV(){
    this.General.visibleINV = !this.General.visibleINV;
  }

  clickParentINV(obj, index) {
    this[obj].listeINV[index].visible = !this[obj].listeINV[index].visible;
  }

  clickCategorieREC(){
    this.General.visibleREC = !this.General.visibleREC;
  }

  clickParentREC(obj, index) {
    this[obj].listeREC[index].visible = !this[obj].listeREC[index].visible;
  }

  clickCategorieDEP(){
    this.General.visibleDEP = !this.General.visibleDEP;
  }

  afficheChargement() {
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement() {
    $(this.modalChargement.nativeElement).modal('hide');
  }

}
