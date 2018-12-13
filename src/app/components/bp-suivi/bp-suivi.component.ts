import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
    donneeExiste: false,
    exercice: 1940,
    visibleFCT: false,
    visibleINV: false,
    visibleREC: false,
    visibleDEP: false,
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: [],
    listeProjet: [],
    indiceProjet: 0
  };

  Service = {
    donneeExiste: false,
    ngxService: [],
    filtre: {
      refService: "4050",
      anneeProjet: 1940
    },
    visibleFCT: false,
    visibleINV: false,
    visibleREC: false,
    visibleDEP: false,
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: [],
    listeProjet: [],
    indiceProjet: 0
  };

  RListe = {
    estVue: false,
    ligneMax: 20,
    liste: [],
    page: 1,
    filtre: {
      date: null,
      codeProjet: "",
      compte: ""
    }
  };

  RSaisie = {
    utiliseClass: false,
    rubrControl: new FormControl(),
    rubrOptions: [],
    listeServiceDansProjet: [],
    champ: {
      idProjet: -1,
      refServiceDest: "",
      rubriqueDest: "",
      budgetCptDest: "",
      budgetCptDestDisp: "",
      valeurRemanier: "",
      refServiceSource: "",
      rubriqueSource: "",
      budgetCptSourceDisp: ""
    },
    charge: false
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private immoService: ImmoService) {
      let annee = new Date(Date.now()).getFullYear();
      let that = this;
      this.General.exercice = annee;
      this.Service.filtre.anneeProjet = annee;
      this.RSaisie.rubrControl.valueChanges.subscribe(text=>{
        text = text.toString().trim();
        if (text.length > 0 && that.RSaisie.champ.idProjet > 0) {
          let argument = {
            idProjet: that.RSaisie.champ.idProjet,
            numeroCompte: text
          };
          let observ = that.immoService.immoTopic("rechercheRubriqueDansProjetServiceBPSE", argument, true).subscribe(obs=>{
            console.log("rechercheRubriqueDansProjetServiceBPSE",obs);
            if(obs.success){
              that.RSaisie.rubrOptions = obs.msg;
            }
            observ.unsubscribe();
          });
        }
        else{
          that.RSaisie.rubrOptions = [];
        }
      });
    }

  ngOnInit() {
    let that = this;
    let observ = this.immoService.getAllRefDrhService().subscribe(obs => {
      if (obs.success) {
        obs.msg.sort((a, b) => {
          if (a.libelle > b.libelle) {
            return 1;
          }
          else if (a.libelle < b.libelle) {
            return -1;
          }
          return 0;
        });
        let listeService = obs.msg;
        let liste = [];
        for (let i = 0; i < listeService.length; i++) {
          liste.push({
            id: listeService[i].code_service,
            text: listeService[i].libelle + " " + listeService[i].code_service
          });
        }
        that.Service.ngxService = liste;
      }
      observ.unsubscribe();
    });
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
    if(nom == "general"){
      if(this.General.listeFCT.length == 0){
        this.chargeListeCompteFCT("General");
      }
    }
    else if(nom == "service"){
      if(this.Service.listeFCT.length == 0){
        this.chargeListeCompteFCT("Service");
      }
    }
    else if(nom == "rliste"){
      if(!this.RListe.estVue){
        this.RListe.estVue = true;
        this.listeRemaniement();
      }
    }
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

  clickCategorieFCT(obj){
    this[obj].visibleFCT = !this[obj].visibleFCT;
  }

  clickParentFCT(obj, index) {
    this[obj].listeFCT[index].visible = !this[obj].listeFCT[index].visible;
  }

  clickCategorieINV(obj){
    this[obj].visibleINV = !this[obj].visibleINV;
  }

  clickParentINV(obj, index) {
    this[obj].listeINV[index].visible = !this[obj].listeINV[index].visible;
  }

  clickCategorieREC(obj){
    this[obj].visibleREC = !this[obj].visibleREC;
  }

  clickParentREC(obj, index) {
    this[obj].listeREC[index].visible = !this[obj].listeREC[index].visible;
  }

  clickCategorieDEP(obj){
    this[obj].visibleDEP = !this[obj].visibleDEP;
  }

  chargerBudgetAnnuelGeneral(){
    this.afficheChargement();
    this.General.donneeExiste = false;
    let that = this;
    let observ = this.budgetService.budgetTopic("prendBudgetAnnuelGeneralBPSE",this.General.exercice, false).subscribe(obs=>{
      console.log("prendBudgetAnnuelGeneralBPSE",obs);
      if(obs.success){
        let listeProjet = [];
        for(let objP of obs.msg){
          let projet = objP.projet;
          listeProjet.push(projet);
          for(let rubr of objP.listeBudgetRubriqueAnnuel){
            if(rubr.numeroCompte.startsWith("2")){
              that.initValeurTableau(projet, rubr, that.General.listeINV);
            }
            else if(rubr.numeroCompte.startsWith("6")){
              that.initValeurTableau(projet, rubr, that.General.listeFCT);
            }
            else{
              that.initValeurTableau(projet, rubr, that.General.listeREC);
            }
          }
        }
        listeProjet.sort((a, b)=>{
          if(a.codeProjet < b.codeProjet){
            return -1;
          }
          else if(a.codeProjet > b.codeProjet){
            return 1;
          }
          return 0;
        });
        that.General.listeProjet = listeProjet;
        if(that.General.listeProjet.length > 0){
          that.General.donneeExiste = true;
        }
      }
      observ.unsubscribe();
      that.fermeChargement();
    });
  }

  chargerBudgetAnnuelService(){
    this.afficheChargement();
    this.Service.donneeExiste = false;
    let that = this;
    let observ = this.budgetService.budgetTopic("prendBudgetAnnuelServiceBPSE",this.Service.filtre, true).subscribe(obs=>{
      console.log("prendBudgetAnnuelServiceBPSE",obs);
      if(obs.success){
        let listeProjet = [];
        for(let objP of obs.msg){
          let projet = objP.projet;
          listeProjet.push(projet);
          for(let rubr of objP.listeBudgetRubriqueAnnuel){
            if(rubr.numeroCompte.startsWith("2")){
              that.initValeurTableau(projet, rubr, that.Service.listeINV);
            }
            else if(rubr.numeroCompte.startsWith("6")){
              that.initValeurTableau(projet, rubr, that.Service.listeFCT);
            }
            else{
              that.initValeurTableau(projet, rubr, that.Service.listeREC);
            }
          }
        }
        listeProjet.sort((a, b)=>{
          if(a.codeProjet < b.codeProjet){
            return -1;
          }
          else if(a.codeProjet > b.codeProjet){
            return 1;
          }
          return 0;
        });
        that.Service.listeProjet = listeProjet;
        if(that.Service.listeProjet.length > 0){
          that.Service.donneeExiste = true;
        }
      }
      observ.unsubscribe();
      that.fermeChargement();
    });
  }

  initValeurTableau(projet, rubrique, tabParent){
    for(let parent of tabParent){
      if(rubrique.numeroCompte.startsWith(parent.numeroCompte)){
        for(let enfant of parent.enfants){
          if(rubrique.numeroCompte == enfant.numeroCompte){
            enfant.projets[projet.idProjet] = {
              valeurInitial: rubrique.valeurInitial,
              valeurOperation: rubrique.valeurOperation,
              valeurUtilise: rubrique.valeurUtilise
            };
            break;
          }
        }
        break;
      }
    }
  }

  avoirValeur(enfant, obj, attr){
    let idProjet = this[obj].listeProjet[this[obj].indiceProjet].idProjet;
    if(enfant.projets[idProjet] != undefined){
      return this.separeMillierDouble(enfant.projets[idProjet][attr]);
    }
    return "";
  }

  sommeDEP(compteDebut, obj, attr) {
    let idProjet = this[obj].listeProjet[this[obj].indiceProjet].idProjet;
    let somme = 0;
    for(let rubrique of this[obj].listeFCT[0].enfants){
      if(rubrique.numeroCompte.startsWith(compteDebut) && rubrique.projets[idProjet] != undefined){
        somme += rubrique.projets[idProjet][attr];
      }
    }
    if(somme > 0){
      return this.separeMillierDouble(somme);
    };
    return "";
  }

  clickAutreProjet(obj, sens){
    if(sens < 0){
      if(this[obj].indiceProjet == 0){
        this[obj].indiceProjet = this[obj].listeProjet.length - 1;
      }
      else{
        this[obj].indiceProjet--;
      }
    }
    else{
      if(this[obj].indiceProjet == (this[obj].listeProjet.length - 1)){
        this[obj].indiceProjet = 0;
      }
      else{
        this[obj].indiceProjet++;
      }
    }
  }

  listeRemaniement(){
    let that = this;
    let observ = this.budgetService.budgetTopic("listeRemaniementBPSE",this.RListe.filtre,true).subscribe(obs=>{
      console.log("listeRemaniementBPSE",obs);
      if(obs.success){
        that.RListe.liste = obs.msg;
      }
      observ.unsubscribe();
    });
  }

  saisieNouvRemaniement(){
    this.Menu.sousMenu = "rsaisie";
  }

  projetChange(){
    let that = this;
    let observ = this.budgetService.budgetTopic("listeServiceDansProjetBPSE",this.RSaisie.champ.idProjet,false).subscribe(obs=>{
      if(obs.success){
        that.RSaisie.listeServiceDansProjet = obs.msg;
      }
      observ.unsubscribe();
    });
  }

  rubriqueDestChange(){
    this.RSaisie.champ.rubriqueDest = this.RSaisie.champ.rubriqueDest.trim();
    if(this.RSaisie.champ.rubriqueDest.length > 5){
      let that = this;
      let argument = {
        idProjet: this.RSaisie.champ.idProjet,
        refService: this.RSaisie.champ.refServiceDest,
        numeroCompte: this.RSaisie.champ.rubriqueDest
      };
      let observ = this.budgetService.budgetTopic("prendBudgetCptDestEtDispBPSE",argument,true).subscribe(obs=>{
        console.log("prendBudgetCptDestEtDispBPSE",obs);
        if(obs.success){
          that.RSaisie.champ.budgetCptDest = that.separeMillierDouble(obs.msg.budgetCptDest);
          that.RSaisie.champ.budgetCptDestDisp = that.separeMillierDouble(obs.msg.budgetCptDestDisp);
        }
        observ.unsubscribe();
      });
    }
  }

  valeurRemanierChange(){
    this.RSaisie.champ.valeurRemanier = this.RSaisie.champ.valeurRemanier.trim().replace(/ /g, "");
    let valeur = parseInt(this.RSaisie.champ.valeurRemanier);
    let valeurN = Number(this.RSaisie.champ.valeurRemanier);
    if(!isNaN(valeurN)){
      this.RSaisie.champ.valeurRemanier = this.separeMillier(valeur.toString());
    }
    else{
      this.RSaisie.champ.valeurRemanier = "";
    }
  }

  rubriqueSourceChange(){
    this.RSaisie.champ.rubriqueSource = this.RSaisie.champ.rubriqueSource.trim();
    if(this.RSaisie.champ.rubriqueSource.length > 5){
      let that = this;
      let argument = {
        idProjet: this.RSaisie.champ.idProjet,
        refService: this.RSaisie.champ.refServiceSource,
        numeroCompte: this.RSaisie.champ.rubriqueSource
      };
      let observ = this.budgetService.budgetTopic("prendBudgetDispCptSourceBPSE",argument,true).subscribe(obs=>{
        console.log("prendBudgetDispCptSourceBPSE",obs);
        if(obs.success){
          that.RSaisie.champ.budgetCptSourceDisp = that.separeMillierDouble(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }

  effectuerRemaniement(){
    this.RSaisie.charge = true;
    let that = this;
    let argument = {
      refServiceSource: this.RSaisie.champ.refServiceSource,
      rubriqueSource: this.RSaisie.champ.rubriqueSource,
      refServiceDest: this.RSaisie.champ.refServiceDest,
      rubriqueDest: this.RSaisie.champ.rubriqueDest,
      valeurRemanier: this.RSaisie.champ.valeurRemanier,
      projetId: this.RSaisie.champ.idProjet
    };
    let observ = this.budgetService.budgetTopic("effectuerRemaniementBPSE",argument,true).subscribe(obs=>{
      console.log("effectuerRemaniementBPSE",obs);
      if(obs.success){
        for(let attr in that.RSaisie.champ){
          that.RSaisie.champ[attr] = null;
        }
      }
      that.RSaisie.charge = false;
      observ.unsubscribe();
    });
  }

  afficheChargement() {
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement() {
    $(this.modalChargement.nativeElement).modal('hide');
  }

  separeMillierDouble(valeur:number){
    if(valeur > 0){
      let double = valeur.toFixed(2);
      let strs = double.toString().split(".");
      let resultat = this.separeMillier(strs[0]);
      if(parseInt(strs[1]) > 0){
        resultat += "," + strs[1];
      }
      return resultat;
    }
    return "";
  }

  separeMillier(valeur: string) {
    valeur = valeur.trim();
    let resultat = "";
    if (valeur.length > 3) {
      for (let i = valeur.length - 1, compteur = 0; i > -1; i--) {
        resultat = valeur.charAt(i) + resultat;
        compteur++;
        if (compteur == 3) {
          compteur = 0;
          resultat = " " + resultat;
        }
      }
    }
    else {
      return valeur;
    }
    return resultat;
  }

  /* 
  date: aaaa-mm-jj 
  resultat: jj/mm/aaaa
  */
  avoirDateSlash(date){
    if(date == "" || date == null || date == undefined){
      return "";
    }
    else{
      let strs = date.toString().split("-");
      let resultat = strs[2]+"/"+strs[1]+"/"+strs[0];
      return resultat;
    }
  }

}
