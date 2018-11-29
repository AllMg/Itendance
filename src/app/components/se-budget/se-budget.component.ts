import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';

declare var $: any;

@Component({
  selector: 'app-se-budget',
  templateUrl: './se-budget.component.html',
  styleUrls: ['./se-budget.component.css']
})
export class SeBudgetComponent implements OnInit {

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  quinquennat = [];
  listeAxes = [];
  listeObjectifs = [];

  Axes = {
    ngxProgr: [],
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
    ngxAxes: [],
    champ: {
      idAxe: -1,
      codeObj: "",
      libelleObj: ""
    },
    charge: false
  };

  Projets = {
    quinquennat: "",
    ngxAxes: [],
    idAxe: -1,
    ngxObjectifs: [],
    champ: {
      idObjectifStrategique: -1,
      codeProjet: "",
      libelleProjet: "",
      dateDebut: null,
      dateFin: null
    },
    charge: false
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
    for(let arriere=refDebut; arriere>1930; arriere=arriere-5){
      liste.push({id: (arriere-5)+"-"+(arriere-1), text: (arriere-5)+" au "+(arriere-1)});
    }
    liste.unshift({id: "2018-2022", text: "2018 au 2022"});
    for(let avant=refFin; avant<anneeCourant+5; avant=avant+5){
      liste.unshift({id: (avant+1)+"-"+(avant+5), text: (avant+1)+" au "+(avant+5)});
    }
    this.quinquennat = liste;
  }

	clickInMenu1(lien:string){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
    this.Menu.sousMenu = nom;
    let that = this;
    if(nom == "axes"){
      let observ = this.budgetService.budgetTopic("listeProgrammeBP","",false).subscribe(obs=>{
        if(obs.success){
          let liste = [];
          for(let i=0; i<obs.msg.length; i++){
            liste.push({id: obs.msg[i].idProgr, text: obs.msg[i].libelle});
          }
          that.Axes.ngxProgr = liste;
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }
  
  quiquennatChange(attr){
    let that = this;
    let observ = this.budgetService.budgetTopic("listeAxeBP",this[attr].quinquennat,false).subscribe(obs=>{
      if(obs.success){
        let liste = [];
        for(let i=0; i<obs.msg.length; i++){
          liste.push({id: obs.msg[i].idAxe, text: obs.msg[i].libelle});
        }
        that[attr].ngxAxes = liste;
      }
      observ.unsubscribe();
    });
  }

  axeChange(){
    let that = this;
    let observ = this.budgetService.budgetTopic("listeObjectifBP",this.Projets.idAxe,false).subscribe(obs=>{
      if(obs.success){
        let liste = [];
        for(let i=0; i<obs.msg.length; i++){
          liste.push({id: obs.msg[i].idObjectifStrategique, text: obs.msg[i].libelleObj});
        }
        that.Projets.ngxObjectifs = liste;
      }
      observ.unsubscribe();
    });
  }

  verifChampAxe(){
    if(this.Axes.champ.quinquennat == ""){
      return {estBon: false, msg: "Veuillez choisir le quinquannat de l'axe stratégique"};
    }
    this.Axes.champ.codeAxe = this.Axes.champ.codeAxe.trim();
    if(this.Axes.champ.codeAxe == ""){
      return {estBon: false, msg: "Veuillez mettre un code valide pour l'axe stratégique"};
    }
    this.Axes.champ.libelle = this.Axes.champ.libelle.trim();
    if(this.Axes.champ.libelle == ""){
      return {estBon: false, msg: "Veuillez mettre un libellé valide pour l'axe stratégique"};
    }
    if(this.Axes.champ.idProgr == -1){
      return {estBon: false, msg: "Veuillez définir dans quel Programme se situe l'axe stratégique"};
    }
    return {estBon: true, msg: null};
  }

  enregistrerAxe(){
    let verif = this.verifChampAxe();
    if(verif.estBon){
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
      let observ = this.budgetService.budgetTopic("ajoutAxeBP",argument,true).subscribe(obs=>{
        that.Axes.charge = false;
        if(obs.success){
          that.toast.success("Enregistrement de l'axe terminé");
          that.Axes.champ.codeAxe = "";
          that.Axes.champ.libelle = "";
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
    else{
      this.toast.error(verif.msg);
    }
  }

  verifChampObjectif(){
    if(this.Objectifs.champ.idAxe == -1){
      return {estBon: false, msg: "Veuillez définir dans quel axe se situe l'objectif stratégique"};
    }
    this.Objectifs.champ.codeObj = this.Objectifs.champ.codeObj.trim();
    if(this.Objectifs.champ.codeObj == ""){
      return {estBon: false, msg: "Veuillez mettre un code valide pour l'objectif stratégique"};
    }
    this.Objectifs.champ.libelleObj = this.Objectifs.champ.libelleObj.trim();
    if(this.Objectifs.champ.libelleObj == ""){
      return {estBon: false, msg: "Veuillez mettre un libellé valide pour l'objectif stratégique"};
    }
    return {estBon: true, msg: null};
  }

  enregistrerObjectif(){
    let verif = this.verifChampObjectif();
    if(verif.estBon){
      this.Objectifs.charge = true;
      let that = this;
      let observ = this.budgetService.budgetTopic("ajoutObjectBP",this.Objectifs.champ,true).subscribe(obs=>{
        that.Objectifs.charge = false;
        if(obs.success){
          that.toast.success("Enregistrement de l'objectif stratégique terminé");
          that.Objectifs.champ.codeObj = "";
          that.Objectifs.champ.libelleObj = "";
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
    else{
      this.toast.error(verif.msg);
    }
  }

  verifChampProjet(){
    if(this.Projets.champ.idObjectifStrategique == -1){
      return {estBon: false, msg: "Veuillez définir dans quel objectif stratégique se situe le projet"};
    }
    this.Projets.champ.codeProjet = this.Projets.champ.codeProjet.trim();
    if(this.Projets.champ.codeProjet == ""){
      return {estBon: false, msg: "Veuillez mettre un code valide pour le projet"};
    }
    this.Projets.champ.libelleProjet = this.Projets.champ.libelleProjet.trim();
    if(this.Projets.champ.libelleProjet == ""){
      return {estBon: false, msg: "Veuillez mettre un libellé valide pour le projet"};
    }
    if(this.Projets.champ.dateDebut == null || this.Projets.champ.dateFin == null){
      return {estBon: false, msg: "Veuillez définir la durée du projet"};
    }
    return {estBon: true, msg: null};
  }

  enregistrerProjet(){
    let verif = this.verifChampProjet();
    if(verif.estBon){
      this.Projets.charge = true;
      let that = this;
      let observ = this.budgetService.budgetTopic("ajoutProjetBP",this.Projets.champ,true).subscribe(obs=>{
        that.Projets.charge = false;
        if(obs.success){
          that.toast.success("Enregistrement du projet terminé");
          that.Projets.champ.codeProjet = "";
          that.Projets.champ.libelleProjet = "";
          that.Projets.champ.dateDebut = null;
          that.Projets.champ.dateFin = null;
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
    else{
      this.toast.error(verif.msg);
    }
  }

  /**
   * 
   * @param quinq "ex: 2018-2022"
   * retourne tableau contenant date debut et date fin (ex: [0] 2018-01-01 [1] 2022-12-31)
   */
  prendDateQuinq(quinq){
    let strs = quinq.split("-");
    let resultat = [];
    resultat.push(strs[0]+"-01-01");
    resultat.push(strs[1]+"-12-31");
    return resultat;
  }

}
