import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { ImmoService } from '../../services/immo/immo.service';

declare var $: any;

@Component({
  selector: 'app-bp-elaboration',
  templateUrl: './bp-elaboration.component.html',
  styleUrls: ['./bp-elaboration.component.css']
})
export class BpElaborationComponent implements OnInit {
  
  @ViewChild('modalChargement') modalChargement;
  @ViewChild('tdSepare') tdSepare: ElementRef;

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Individu = {
    idIndividu: null,
    codeService: null
  };

  exerciceBudget: number;

  Service = {
    estVue: false,
    categorie: "fct",
    listeProjet: [],
    listeFCT: [],
    listeINV: [],
    listeREC: [],
    listeDEP: []
  };

  Validation = {
    ngxServices: [],
    refService: null,
    listeProjet: []
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
		private immoService: ImmoService) {
      this.exerciceBudget = new Date(Date.now()).getFullYear() + 1;
      let that = this;
      let observ = this.immoService.getAllRefDrhService().subscribe(obs=>{
        if(obs.success){
          obs.msg.sort((a, b)=>{
            if(a.libelle > b.libelle){
              return 1;
            }
            else if(a.libelle < b.libelle){
              return -1;
            }
            return 0;
          });
          let listeService = obs.msg;
          let liste = [];
          for(let i=0; i<listeService.length; i++){
            liste.push({
              id: listeService[i].code_service, 
              text: listeService[i].libelle + " " + listeService[i].code_service
            });
          }
          that.Validation.ngxServices = liste;
        }
        observ.unsubscribe();
      });
  }

  ngOnInit() {
    let utilisateur = JSON.parse(localStorage.getItem('user'));
    let that = this;
    let observ = this.budgetService.getServiceDirection(utilisateur.id_acces).subscribe(obs=>{
      console.log("Utilisateur", obs);
      if(obs.success){
        that.Individu.idIndividu = utilisateur.id_acces;
        that.Individu.codeService = obs.msg[0].code_service.code_service;
      }
      observ.unsubscribe();
    });
    this.calculAngleSepare();
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom) {
    this.Menu.sousMenu = nom;
    if(nom == "service" && !this.Service.estVue){
      this.Service.estVue = true;
      let comptes = ["60451","60452","60453","6048"];
      for(let compte of comptes){
        this.Service.listeDEP.push({
          numeroCompte: compte,
          libelleCompte: "",
          projets: {}
        });
      }
      this.chargeListeRubriqueFCT();
    }
  }

  chargeListeRubriqueFCT(){
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("6").subscribe(obs=>{
      console.log("getCptbyGroupe 6",obs);
      if(obs.success){
        let liste = [];
        let indice = -1;
        for(let rubrique of obs.msg){
          if(rubrique.idpcg.startsWith("69")){
            break;
          }
          else{
            if(rubrique.idpcg.length == 2){
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
            else{
              if(rubrique.imputable == "I"){
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
        for(let compte of this.Service.listeDEP){
          for(let rubrique of obs.msg){
            if(rubrique.idpcg == compte.numeroCompte){
              compte.libelleCompte = rubrique.libelcpt;
            }
          }
        }
        that.Service.listeFCT = liste;
        that.chargeListeRubriqueINV();
      }
      else{
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }

  chargeListeRubriqueINV(){
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("2").subscribe(obs=>{
      console.log("getCptbyGroupe 2",obs);
      if(obs.success){
        let liste = [];
        let indice = -1;
        for(let i=0; i<obs.msg.length; i++){
          let rubrique = obs.msg[i];
          if(rubrique.imputable == "N"){
            if(obs.msg[i+1].imputable == "I"){
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
          }
          else{
            liste[indice].enfants.push({
              numeroCompte: rubrique.idpcg,
              libelleCompte: rubrique.libelcpt,
              precision: "",
              projets: {}
            });
          }
        }
        that.Service.listeINV = liste;
        that.chargeListeRubriqueREC();
      }
      else{
        that.fermeChargement();
      }
      observ.unsubscribe();
    });
  }

  chargeListeRubriqueREC(){
    this.afficheChargement();
    let that = this;
    let observ = this.budgetService.getCptbyGroupe("7").subscribe(obs=>{
      console.log("getCptbyGroupe 7",obs);
      if(obs.success){
        let liste = [];
        let indice = -1;
        for(let i=0; i<obs.msg.length; i++){
          let rubrique = obs.msg[i];
          if(rubrique.imputable == "N"){
            if(obs.msg[i+1].imputable == "I"){
              liste.push({
                numeroCompte: rubrique.idpcg,
                libelleCompte: rubrique.libelcpt,
                enfants: [],
                visible: false
              });
              indice++;
            }
          }
          else{
            liste[indice].enfants.push({
              numeroCompte: rubrique.idpcg,
              libelleCompte: rubrique.libelcpt,
              precision: "",
              projets: {}
            });
          }
        }
        that.Service.listeREC = liste;
      }
      that.fermeChargement();
      observ.unsubscribe();
    });
  }

  clickParentFCT(index){
    this.Service.listeFCT[index].visible = !this.Service.listeFCT[index].visible;
  }

  clickParentINV(index){
    this.Service.listeINV[index].visible = !this.Service.listeINV[index].visible;
  }

  clickParentREC(index){
    this.Service.listeREC[index].visible = !this.Service.listeREC[index].visible;
  }

  clickCategorie(cat){
    this.Service.categorie = cat;
  }

  chargerBudgetServiceEtSe(){
    /*this.afficheChargement();
    let that = this;
    let observ = this.budgetService.budgetTopic("",this.Validation.refService,false).subscribe(obs=>{
      if(obs.success){

      }
      observ.unsubscribe();
    });*/
  }

  calculAngleSepare(){
    let ele = this.tdSepare.nativeElement;

    let ab = ele.clientHeight;
    let bc = ele.clientWidth;
    let hyp = Math.sqrt(ab * ab + bc * bc);
    let rad = Math.asin(ab/hyp);
    let nouvDeg = rad * 180 / Math.PI;
    
    ele.children[1].style.transform = "rotate("+nouvDeg+"deg)";
  }

	afficheChargement(){
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement(){
		$(this.modalChargement.nativeElement).modal('hide');
	}

}
