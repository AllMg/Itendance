import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';

declare var $: any;

@Component({
  selector: 'app-bp-saisie',
  templateUrl: './bp-saisie.component.html',
  styleUrls: ['./bp-saisie.component.css']
})
export class BpSaisieComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;
  @ViewChild('modalModifProjet') modalModifProjet;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  listeQuinquennat = [];
  listeAxes = [];
  listeObjectifs = [];

  Axes = {
    listeProgr: [],
    champ: {
      quinquennat: "",
      idProgr: -1,
      codeAxe: "",
      libelle: ""
    },
    charge: false
  };

  Objectifs = {
    quinquennat: "",
    listeAxes: [],
    champ: {
      idAxe: -1,
      codeObj: "",
      libelleObj: ""
    },
    charge: false
  };

  Projets = {
    quinquennat: "",
    listeAxes: [],
    idAxe: -1,
    ngxObjectifs: [],
    champ: {
      idObjStrategique: -1,
      codeProjet: "",
      libelleProjet: "",
      dateDebut: null,
      dateFin: null
    },
    charge: false
  };

  Verif = {
    quinquennat: "",
    arbre: null,
    modifProgr: null,
    modif: {
      libelleAxe: "",
      libelleObj: "",
      projet: {
        idProjet: -1,
        libelleProjet: "",
        dateDebut: null,
        dateFin: null
      },
      indexA: -1,
      indexO: -1,
      indexP: -1
    }
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService) { }

  ngOnInit() {
    let refDebut = 2018;
    let refFin = 2022;
    let anneeCourant = new Date(Date.now()).getFullYear();
    let liste = [];
    for (let arriere = refDebut; arriere > 1930; arriere = arriere - 5) {
      liste.push({ id: (arriere - 5) + "-" + (arriere - 1), text: (arriere - 5) + " au " + (arriere - 1) });
    }
    liste.unshift({ id: "2018-2022", text: "2018 au 2022" });
    for (let avant = refFin; avant < anneeCourant + 5; avant = avant + 5) {
      liste.unshift({ id: (avant + 1) + "-" + (avant + 5), text: (avant + 1) + " au " + (avant + 5) });
    }
    this.listeQuinquennat = liste;
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
    let that = this;
    if (nom == "axes") {
      let observ = this.budgetService.budgetTopic("listeProgrammeBPSE", "", false).subscribe(obs => {
        console.log("listeProgrammeBPSE", obs);
        if (obs.success) {
          that.Axes.listeProgr = obs.msg;
        }
        else {
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }

  quinqAxeChange(){
    let dates = this.prendDateQuinq(this.Axes.champ.quinquennat);
    let argument = {
      dateDebut: dates[0],
      dateFin: dates[1]
    };
    let that = this;
    let observ = this.budgetService.budgetTopic("codeAxeSuivantBPSE",argument,true).subscribe(obs=>{
      console.log("codeAxeSuivantBPSE",obs);
      if(obs.success){
        that.Axes.champ.codeAxe = obs.msg;
      }
      observ.unsubscribe();
    });
  }

  quiquennatChange(attr) {
    let that = this;
    let dates = this.prendDateQuinq(this[attr].quinquennat);
    let argument = {
      dateDebut: dates[0],
      dateFin: dates[1]
    };
    let observ = this.budgetService.budgetTopic("listeAxeBPSE", argument, true).subscribe(obs => {
      console.log("listeAxeBPSE", obs);
      if (obs.success) {
        that[attr].listeAxes = obs.msg;
      }
      else {
        that.toast.error(obs.msg);
      }
      observ.unsubscribe();
    });
  }

  axeObjectifChange(){
    let that = this;
    let observ = this.budgetService.budgetTopic("codeObjectifSuivantBPSE",this.Objectifs.champ.idAxe,false).subscribe(obs=>{
      if(obs.success){
        that.Objectifs.champ.codeObj = obs.msg;
      }
      observ.unsubscribe();
    });
  }

  axeProjetChange() {
    this.Projets.champ.idObjStrategique = -1;
    this.Projets.ngxObjectifs = [];
    let that = this;
    let observ = this.budgetService.budgetTopic("listeObjectifParAxeBPSE", this.Projets.idAxe, false).subscribe(obs => {
      console.log("listeObjectifParAxeBPSE",obs);
      if (obs.success) {
        let liste = [];
        for (let i = 0; i < obs.msg.length; i++) {
          liste.push({ id: obs.msg[i].idObjStrategique, text: obs.msg[i].libelleObj });
        }
        that.Projets.ngxObjectifs = liste;
      }
      observ.unsubscribe();
    });
  }

  objectifProjetChange(){
    let that = this;
    let observ = this.budgetService.budgetTopic("codeProjetSuivantBPSE",this.Projets.champ.idObjStrategique,false).subscribe(obs=>{
      console.log("codeProjetSuivantBPSE", obs);
      if(obs.success){
        that.Projets.champ.codeProjet = obs.msg;
      }
      observ.unsubscribe();
    });
  }

  verifChampAxe() {
    if (this.Axes.champ.quinquennat == "") {
      return { estBon: false, msg: "Veuillez choisir le quinquannat de l'axe stratégique" };
    }
    this.Axes.champ.codeAxe = this.Axes.champ.codeAxe.toString().trim();
    if (this.Axes.champ.codeAxe == "") {
      return { estBon: false, msg: "Veuillez mettre un code valide pour l'axe stratégique" };
    }
    this.Axes.champ.libelle = this.Axes.champ.libelle.trim();
    if (this.Axes.champ.libelle == "") {
      return { estBon: false, msg: "Veuillez mettre un libellé valide pour l'axe stratégique" };
    }
    if (this.Axes.champ.idProgr == -1) {
      return { estBon: false, msg: "Veuillez définir dans quel Programme se situe l'axe stratégique" };
    }
    return { estBon: true, msg: null };
  }

  enregistrerAxe() {
    let verif = this.verifChampAxe();
    if (verif.estBon) {
      this.Axes.charge = true;
      let dates = this.prendDateQuinq(this.Axes.champ.quinquennat);
      let argument = {
        idProgr: this.Axes.champ.idProgr,
        codeAxe: this.Axes.champ.codeAxe,
        libelle: this.Axes.champ.libelle,
        dateDebut: dates[0],
        dateFin: dates[1]
      };
      let that = this;
      let observ = this.budgetService.budgetTopic("ajoutAxeBPSE", argument, true).subscribe(obs => {
        console.log("ajoutAxeBPSE", obs);
        that.Axes.charge = false;
        if (obs.success && obs.msg != null) {
          that.toast.success("Enregistrement de l'axe terminé");
          that.Axes.champ.codeAxe = (parseInt(that.Axes.champ.codeAxe) + 1).toString();
          that.Axes.champ.libelle = "";
        }
        else {
          if(obs.msg == null){
            that.toast.error("Cette axe est déjà dans la base");
          }
        }
        observ.unsubscribe();
      });
    }
    else {
      this.toast.error(verif.msg);
    }
  }

  verifChampObjectif() {
    if (this.Objectifs.champ.idAxe == -1) {
      return { estBon: false, msg: "Veuillez définir dans quel axe se situe l'objectif stratégique" };
    }
    this.Objectifs.champ.codeObj = this.Objectifs.champ.codeObj.toString().trim();
    if (this.Objectifs.champ.codeObj == "") {
      return { estBon: false, msg: "Veuillez mettre un code valide pour l'objectif stratégique" };
    }
    this.Objectifs.champ.libelleObj = this.Objectifs.champ.libelleObj.trim();
    if (this.Objectifs.champ.libelleObj == "") {
      return { estBon: false, msg: "Veuillez mettre un libellé valide pour l'objectif stratégique" };
    }
    return { estBon: true, msg: null };
  }

  enregistrerObjectif() {
    let verif = this.verifChampObjectif();
    if (verif.estBon) {
      this.Objectifs.charge = true;
      let that = this;
      let observ = this.budgetService.budgetTopic("ajoutObjectifStratBPSE", this.Objectifs.champ, true).subscribe(obs => {
        console.log("ajoutObjectifStratBPSE", obs);
        that.Objectifs.charge = false;
        if (obs.success && obs.msg != null) {
          that.toast.success("Enregistrement de l'objectif stratégique terminé");
          that.Objectifs.champ.codeObj = (parseInt(that.Objectifs.champ.codeObj) + 1).toString();
          that.Objectifs.champ.libelleObj = "";
        }
        else {
          if(obs.msg == null){
            that.toast.error("Ce code d'objectif est déjà présent dans la base de données");
          }
        }
        observ.unsubscribe();
      });
    }
    else {
      this.toast.error(verif.msg);
    }
  }

  verifChampProjet() {
    if (this.Projets.champ.idObjStrategique == -1) {
      return { estBon: false, msg: "Veuillez définir dans quel objectif stratégique se situe le projet" };
    }
    this.Projets.champ.codeProjet = this.Projets.champ.codeProjet.toString().trim();
    if (this.Projets.champ.codeProjet == "") {
      return { estBon: false, msg: "Veuillez mettre un code valide pour le projet" };
    }
    this.Projets.champ.libelleProjet = this.Projets.champ.libelleProjet.trim();
    if (this.Projets.champ.libelleProjet == "") {
      return { estBon: false, msg: "Veuillez mettre un libellé valide pour le projet" };
    }
    if (this.Projets.champ.dateDebut == null || this.Projets.champ.dateFin == null) {
      return { estBon: false, msg: "Veuillez définir la durée du projet" };
    }
    return { estBon: true, msg: null };
  }

  enregistrerProjet() {
    let verif = this.verifChampProjet();
    if (verif.estBon) {
      this.Projets.charge = true;
      let that = this;
      let observ = this.budgetService.budgetTopic("ajoutProjetBPSE", this.Projets.champ, true).subscribe(obs => {
        console.log("ajoutProjetBPSE",obs);
        that.Projets.charge = false;
        if (obs.success && obs.msg != null) {
          that.toast.success("Enregistrement du projet terminé");
          that.Projets.champ.codeProjet = (parseInt(that.Projets.champ.codeProjet) + 1).toString();
          that.Projets.champ.libelleProjet = "";
          that.Projets.champ.dateDebut = null;
          that.Projets.champ.dateFin = null;
        }
        else {
          if(obs.msg == null){
            that.toast.error("Ce code projet est déjà présent dans la base de données");
          }
        }
        observ.unsubscribe();
      });
    }
    else {
      this.toast.error(verif.msg);
    }
  }

  chargerArbreProgramme(){
    if(this.Verif.quinquennat != ""){
      this.afficheChargement();
      let dates = this.prendDateQuinq(this.Verif.quinquennat);
      let argument = {
        dateDebut: dates[0],
        dateFin: dates[1]
      };
      console.log("argument",argument);
      let that = this;
      let observ = this.budgetService.budgetTopic("listeArbreProgrBPSE",argument,true).subscribe(obs=>{
        console.log("listeArbreProgrBPSE",obs);
        if(obs.success){
          let arbre = obs.msg;
          for(let progr in arbre){
            for(let axe of arbre[progr].axe){
              axe.modif = false;
              for(let obj of axe.objectif){
                obj.modif = false;
              }
            }
          }
          that.Verif.arbre = arbre;
        }
        observ.unsubscribe();
        that.fermeChargement();
      });
    }
  }

  clickAxeItem(indexA,progr) {
    this.Verif.modifProgr = progr;
    this.Verif.modif.indexA = indexA;
    this.Verif.modif.libelleAxe = this.Verif.arbre[progr].axe[indexA].axe.libelle;
    this.Verif.arbre[progr].axe[indexA].modif = true;
    setTimeout(()=>{
      $("#"+progr+"_axe_"+this.Verif.arbre[progr].axe[indexA].axe.idAxe).focus();
    }, 300);
  }

  inputAxePerdu() {
    let indexA = this.Verif.modif.indexA;
    let progr = this.Verif.modifProgr;
    let libelle = this.Verif.modif.libelleAxe.trim();
    if(libelle != ""){
      let argument = {
        idAxe: this.Verif.arbre[progr].axe[indexA].axe.idAxe,
        libelle: libelle
      };
      let observ = this.budgetService.budgetTopic("modifierAxeLibelleBPSE",argument,true).subscribe(obs=>{
        console.log("modifierAxeLibelleBPSE",obs);
        observ.unsubscribe();
      });
      this.Verif.arbre[progr].axe[indexA].axe.libelle = libelle;
    }
    this.Verif.arbre[progr].axe[indexA].modif = false;
  }

  clickObjItem(indexA,indexO,progr) {
    this.Verif.modifProgr = progr;
    this.Verif.modif.indexA = indexA;
    this.Verif.modif.indexO = indexO;
    this.Verif.modif.libelleObj = this.Verif.arbre[progr].axe[indexA].objectif[indexO].objectif.libelleObj;
    this.Verif.arbre[progr].axe[indexA].objectif[indexO].modif = true;
    setTimeout(()=>{
      $("#"+progr+"_obj_"+this.Verif.arbre[progr].axe[indexA].objectif[indexO].objectif.idObjStrategique).focus();
    }, 300);
  }

  inputObjPerdu() {
    let progr = this.Verif.modifProgr;
    let indexA = this.Verif.modif.indexA;
    let indexO = this.Verif.modif.indexO;
    let libelleObj = this.Verif.modif.libelleObj.trim();
    if(libelleObj != ""){
      let argument = {
        idObjStrategique: this.Verif.arbre[progr].axe[indexA].objectif[indexO].objectif.idObjStrategique,
        libelleObj: libelleObj
      };
      let observ = this.budgetService.budgetTopic("modifierObjectifLibelleBPSE",argument,true).subscribe(obs=>{
        console.log("modifierObjectifLibelleBPSE",obs);
        observ.unsubscribe();
      });
      this.Verif.arbre[progr].axe[indexA].objectif[indexO].objectif.libelleObj = libelleObj;
    }
    this.Verif.arbre[progr].axe[indexA].objectif[indexO].modif = false;
  }

  clickProItem(indexA,indexO,indexP,progr) {
    this.Verif.modifProgr = progr;
    this.Verif.modif.indexA = indexA;
    this.Verif.modif.indexO = indexO;
    this.Verif.modif.indexP = indexP;
    this.Verif.modif.projet.idProjet = this.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].idProjet;
    this.Verif.modif.projet.libelleProjet = this.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].libelleProjet;
    this.Verif.modif.projet.dateDebut = this.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].dateDebut;
    this.Verif.modif.projet.dateFin = this.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].dateFin;
    this.ouvreModifProjet();
  }
  
  modifierProjet(){
    this.Verif.modif.projet.libelleProjet = this.Verif.modif.projet.libelleProjet.trim();
    if(this.Verif.modif.projet.libelleProjet != ""){
      let that = this;
      let observ = this.budgetService.budgetTopic("modifierProjetBPSE",this.Verif.modif.projet,true).subscribe(obs=>{
        console.log("modifierProjetBPSE",obs);
        if(obs.success){
          let progr = that.Verif.modifProgr;
          let indexA = that.Verif.modif.indexA;
          let indexO = that.Verif.modif.indexO;
          let indexP = that.Verif.modif.indexP;
          that.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].libelleProjet = that.Verif.modif.projet.libelleProjet;
          that.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].dateDebut = that.Verif.modif.projet.dateDebut;
          that.Verif.arbre[progr].axe[indexA].objectif[indexO].projet[indexP].dateFin = that.Verif.modif.projet.dateFin;
        }
        observ.unsubscribe();
      });
    }
    this.fermeModifProjet();
  }

  ouvreModifProjet(){
    $(this.modalModifProjet.nativeElement).modal('show');
  }

  fermeModifProjet(){
    $(this.modalModifProjet.nativeElement).modal('hide');
  }

	afficheChargement(){
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement(){
		$(this.modalChargement.nativeElement).modal('hide');
	}

  /**
   * 
   * @param quinq "ex: 2018-2022"
   * retourne tableau contenant date debut et date fin (ex: [0] 2018-01-01 [1] 2022-12-31)
   */
  prendDateQuinq(quinq) {
    let strs = quinq.split("-");
    let resultat = [];
    resultat.push(strs[0] + "-01-01");
    resultat.push(strs[1] + "-12-31");
    return resultat;
  }

}
