import {Component, OnInit} from '@angular/core';
import {CieService} from '../../services/cie/cie.service';
import {SoldeService} from '../../services/solde/solde.service';
import {CrgService} from '../../services/crg/crg.service';
import {MrService} from '../../services/mr/mr.service';

@Component({
  selector: 'app-cie',
  templateUrl: './cie.component.html',
  styleUrls: ['./cie.component.css']
})
export class CieComponent implements OnInit {
  cie: any[] = [];
  mr: any[] = [];
  crg: any[] = [];
  solde: any[] = [];
  situation: any[] = [];
  situation2dim = [];
  listeAnnee = [];
  listeSolde = [];
  anneSelectionne:string = "";
  showMessage:boolean = true;
  soldeCum:number= 0;
  fitreSelect = 'Selectionner une année';
  constructor ( private cieService: CieService, private soldeService: SoldeService,
                private crgService: CrgService, private mrService: MrService) {
  }
  ngOnInit() {
    this.initSituation();
  }
  clickShowModale(){
    this.showMessage = true;
  }

  twoDimSituation() {
    let fin = false;
    let objet = [];
    //console.log("nombre:"+this.situation.length);
    for ( let i = 0; i < this.situation.length ; i++ ) {
      if ( i < this.situation.length - 1) {
        if (this.situation[i].periode !== this.situation[i + 1].periode) {
          objet = [];
          objet.push(this.situation[i]);
          this.situation2dim[this.situation[i].periode] = [];
          this.situation2dim[this.situation[i].periode].push(objet);
        } else{
            objet = [];
            while (this.situation[i].periode === this.situation[i + 1].periode) {
              objet.push(this.situation[i]);
              if( i < this.situation.length - 2){
                i++;
              } else {
                if(this.situation[i].periode === this.situation[i + 1].periode){
                  objet.push(this.situation[i+1]);
                  fin = true;
                }
                break;
              }
            }
            objet.push(this.situation[i]);
            this.situation2dim[this.situation[i].periode] = [];
            this.situation2dim[this.situation[i].periode].push(objet);
        }
      }
    }
    if(!fin){
      objet = [];
      objet.push(this.situation[this.situation.length - 1]);
      if( this.situation2dim[this.situation[this.situation.length - 1].periode] === undefined){
          this.situation2dim[this.situation[this.situation.length - 1].periode] = [];
      }
      this.situation2dim[this.situation[this.situation.length - 1].periode].push(objet);
    }
    //console.log("this.situation2dim = > "+JSON.stringify(this.situation2dim[201703][0]) + "Taille => "+this.situation2dim.length);
  }

  calculeSolde(){
    this.listeSolde = [];
    let tempSolde = 0;
    let cotPayeDn = 0;
    let fin = false;
    let objet = {
      cotisationDu: 0,
      cotisationPaye: 0
    };
    for(let i =0; i< this.situation.length; i++){
      //console.log("Periode =>"+ this.situation[i].periode);
      if ( i < this.situation.length - 1) {
        if(this.situation[i].periode !== this.situation[i + 1].periode){
          tempSolde = 0;
          cotPayeDn = 0;
          objet = {
            cotisationDu: 0,
            cotisationPaye: 0
          };
          tempSolde = tempSolde + this.situation[i].avisDn;
          cotPayeDn = cotPayeDn + this.situation[i].cotPayeDn;
          //console.log("1 tempSolde =>" + tempSolde + "cotPayeDn => "+cotPayeDn);
          objet.cotisationDu = tempSolde;
          objet.cotisationPaye = cotPayeDn;
          this.listeSolde[this.situation[i].periode] = [];
          this.listeSolde[this.situation[i].periode].push(objet);
        }
        else{
          tempSolde = 0;
          cotPayeDn = 0;
          objet = {
            cotisationDu: 0,
            cotisationPaye: 0
          };
          while(this.situation[i].periode === this.situation[i + 1].periode){
            tempSolde = tempSolde + this.situation[i].avisDn;
            cotPayeDn = cotPayeDn + this.situation[i].cotPayeDn;
            if( i < this.situation.length - 2){
              i++;
            }
            else{
              if(this.situation[i].periode === this.situation[i + 1].periode){
                tempSolde = tempSolde + this.situation[i+1].avisDn;
                cotPayeDn = cotPayeDn + this.situation[i+1].cotPayeDn;
              }
              else{
                fin = true;
              }
              break;
            }
          }
          tempSolde = tempSolde + this.situation[i].avisDn;
          cotPayeDn = cotPayeDn + this.situation[i].cotPayeDn;
          //console.log("2 tempSolde =>" + tempSolde + "cotPayeDn => "+cotPayeDn);
          objet.cotisationDu = tempSolde;
          objet.cotisationPaye = cotPayeDn;
          this.listeSolde[this.situation[i].periode] = [];
          this.listeSolde[this.situation[i].periode].push(objet);
        }
      }
      if(!fin){
        objet = {
          cotisationDu: 0,
          cotisationPaye: 0
        };
        tempSolde = 0;
        cotPayeDn = 0;
        tempSolde = tempSolde + this.situation[i].avisDn;
        cotPayeDn = cotPayeDn + this.situation[i].cotPayeDn;
        console.log("3 tempSolde =>" + tempSolde + "cotPayeDn => "+cotPayeDn);
        objet.cotisationDu = tempSolde;
        objet.cotisationPaye = cotPayeDn;
        if( this.listeSolde[this.situation[(this.situation.length - 1)].periode] === undefined){
          this.listeSolde[this.situation[(this.situation.length - 1)].periode] = [];
        }
        this.listeSolde[this.situation[(this.situation.length - 1)].periode].push(objet);
      }
      console.log(this.situation[i].periode+" <= Test 138 => " + JSON.stringify(this.listeSolde[this.situation[i].periode][0]));
    }
  }

  recupAnneeSituation(){
    let taille_liste = this.situation.length;
    this.listeAnnee = [];
    this.listeAnnee.push('Selectionner une année');
    for(let i = 0; i < taille_liste; i++){
      if ( i < taille_liste - 1 ) {
        if ( this.situation[i].periode.substring(0, 4) != this.situation[i + 1].periode.substring(0, 4) ){
          this.listeAnnee.push(this.situation[i].periode.substring(0, 4));
        }
      } else {
        this.listeAnnee.push(this.situation[i].periode.substring(0, 4));
      }
    }
  }

  selectionAnne(periode){
    this.situation = [];
    let indiceMr = 0;
    let indiceSolde = 0;
    this.fitreSelect = periode;
    if(this.fitreSelect !== 'Selectionner une année'){
      this.situation = [];
      const userEmployeur = JSON.parse(localStorage.getItem('user'));
      const zero = 0;
      this.cieService.listeCieByEmplByAnnee(userEmployeur.id_acces,periode).subscribe(
        (data) => {
          this.cie = data.msg;
          if( this.cie.length <= 0){
            this.showMessage = false;
          }
          console.log('nombre cie' + this.cie.length);
          this.mrService.listeMrByEmpl(userEmployeur.id_acces).subscribe(
            (data) => {
            this.mr = data.msg;
            console.log('nombre mr' + this.mr.length);
            this.crgService.listeCrgByEmpl(userEmployeur.id_acces).subscribe(
            (data) => {
              this.crg = data.msg;
              console.log('nombre crg' + this.crg.length);
              this.soldeService.listeSoldeByEmpl(userEmployeur.id_acces).subscribe(
              (data) => {
                this.solde = data.msg;
                console.log("nombre solde tous "+this.solde.length);
                
                let tempSolde = 0;
                let debit = 0;
                let credit = 0;
                
                for (let i = 0, j = 0, k = 0; i < this.cie.length; i++) {
                  this.situation.push(this.cie[i]);
                  //console.log("While CIE =>" + JSON.stringify(this.cie[3]));
                  this.situation[i].cotPayeMr = this.situation[i].cotPayeMr;
                  this.situation[i].cotPayeDn = this.situation[i].cotPayeDn;
                  if(this.situation[i].cotPayeMr === 0){
                    this.situation[i].cotPayeMr = null;
                  }
                  if(this.situation[i].cotPayeDn === 0){
                    this.situation[i].cotPayeDn = null;
                  }
                  if(this.situation[i].avisDn === 0){
                    this.situation[i].avisDn = null;
                  }
                  else{
                    this.situation[i].avisDn = this.situation[i].avisDn;
                  }
                  
                  //this.situation[i].solde = 0;
                  for(let contSolde = 0; contSolde < this.solde.length;contSolde++){
                    //console.log("this.solde[contSolde].motantSolde => "+this.solde[contSolde].montantSolde);
                    if( this.situation[i].periode === this.solde[contSolde].periode){

                      this.situation[i].solde = this.solde[contSolde].montantSolde;
                      this.situation[i].soldeCum = this.solde[contSolde].montantSoldeCum;
                      indiceSolde++;
                      break;
                    }
                  }
                  if(indiceSolde == 0){
                    this.situation[i].solde = null;
                    this.situation[i].soldeCum = null;
                  }
                  else{
                    indiceSolde = 0;
                  }
                  
                  if (typeof(this.cie[i].avisDnCompl) === 'undefined') {
                    this.situation[i].avisDnCompl = null;
                  }
                  if (typeof(this.cie[i].cotPayeCompl) === 'undefined') {
                    this.situation[i].cotPayeCompl = null;
                  }
                  //console.log(j +"<"+ this.mr.length +"&&"+ this.cie[i].periode +"==="+ this.mr[j].periode);
                  for(let contMr = 0;contMr < this.mr.length;contMr ++){
                      if ( this.cie[i].periode === this.mr[contMr].periode) {
                        this.situation[i].avisMr = this.mr[contMr].avisMr;
                        this.situation[i].dateAvisMr = this.mr[contMr].dateAvisMr;
                        this.situation[i].avisComplMr = null;
                        if (typeof(this.mr[contMr].avisComplMr) !== 'undefined') {
                          this.situation[i].avisComplMr = this.mr[contMr].avisComplMr;
                        }
                        this.situation[i].dateAvisComplMr = this.mr[contMr].dateAvisComplMr;
                        this.situation[i].cotPayeComplMr = null;
                        if (typeof(this.mr[contMr].cotPayeComplMr) !== 'undefined') {
                          this.situation[i].cotPayeComplMr = this.mr[contMr].cotPayeComplMr;
                        }
                        this.situation[i].dateCotPayeComplMr = this.mr[contMr].dateCotPayeComplMr;
                        indiceMr++;
                        break;
                      }
                  }
                  if(indiceMr === 0){
                    this.situation[i].avisMr = null;
                    this.situation[i].dateAvisMr = null;
                    this.situation[i].avisComplMr = null;
                    this.situation[i].dateAvisComplMr = null;
                    this.situation[i].cotPayeComplMr = null;
                    this.situation[i].dateCotPayeComplMr = null;
                  }
                  else{
                    indiceMr = 0;
                  }
                  
                  if (k < this.crg.length && this.crg.length > 0 && this.cie[i].periode === this.crg[k].periode) {
                    this.situation[i].mrCrg = this.crg[k].mrCrg.to;
                    this.situation[i].crg = this.crg[k].mrCrg * (this.crg[k].tauxCrg) / 100;
                    this.situation[i].nouvMr = this.crg[k].nouvMrCrg;
                    this.situation[i].dateCrg = this.crg[k].dateCrg;
                    k++;
                  } else {
                    this.situation[i].mrCrg = null;
                    this.situation[i].crg = null;
                    this.situation[i].nouvMr = null;
                    this.situation[i].dateCrg = null;
                  }

                }
                this.twoDimSituation();
                this.calculeSolde()
              }
            );
            }
            );
          }
          );
        }
        );
    }
    else{
      this.initSituation();
    }
    
  }

  initSituation() {
    let indiceMr = 0;
    let indiceSolde = 0;
    this.fitreSelect = 'Selectionner une année';
    this.situation = [];
	  const userEmployeur = JSON.parse(localStorage.getItem('user'));
	  const zero = 0;
	  this.cieService.listeCieByEmpl(userEmployeur.id_acces).subscribe(
      (data) => {
        this.cie = data.msg;
        if( this.cie.length <= 0){
          this.showMessage = false;
        }
        console.log('nombre cie tous ' + this.cie.length);
		    this.mrService.listeMrByEmpl(userEmployeur.id_acces).subscribe(
		      (data) => {
          this.mr = data.msg;
          console.log('nombre mr tous ' + this.mr.length);
          this.crgService.listeCrgByEmpl(userEmployeur.id_acces).subscribe(
          (data) => {
            this.crg = data.msg;
            console.log('nombre crg tous ' + this.crg.length);
            this.soldeService.listeSoldeByEmpl(userEmployeur.id_acces).subscribe(
              (data) => {
                this.solde = data.msg;
                console.log("nombre solde tous "+this.solde.length);
                
                let tempSolde = 0;
                let debit = 0;
                let credit = 0;
                
                for (let i = 0, j = 0, k = 0; i < this.cie.length; i++) {
                  this.situation.push(this.cie[i]);
                  //console.log("While CIE =>" + JSON.stringify(this.cie[3]));
                  this.situation[i].cotPayeMr = this.situation[i].cotPayeMr;
                  this.situation[i].cotPayeDn = this.situation[i].cotPayeDn;
                  if(this.situation[i].cotPayeMr === 0){
                    this.situation[i].cotPayeMr = null;
                  }
                  if(this.situation[i].cotPayeDn === 0){
                    this.situation[i].cotPayeDn = null;
                  }
                  if(this.situation[i].avisDn === 0){
                    this.situation[i].avisDn = null;
                  }
                  else{
                    this.situation[i].avisDn = this.situation[i].avisDn;
                  }
                  
                  //this.situation[i].solde = 0;
                  for(let contSolde = 0; contSolde < this.solde.length;contSolde++){
                    //console.log("this.solde[contSolde].motantSolde => "+this.solde[contSolde].montantSolde);
                    if( this.situation[i].periode === this.solde[contSolde].periode){

                      this.situation[i].solde = this.solde[contSolde].montantSolde;
                      this.situation[i].soldeCum = this.solde[contSolde].montantSoldeCum;
                      indiceSolde++;
                      break;
                    }
                  }
                  if(indiceSolde == 0){
                    this.situation[i].solde = null;
                    this.situation[i].soldeCum = null;
                  }
                  else{
                    indiceSolde = 0;
                  }
                  
                  if (typeof(this.cie[i].avisDnCompl) === 'undefined') {
                    this.situation[i].avisDnCompl = null;
                  }
                  if (typeof(this.cie[i].cotPayeCompl) === 'undefined') {
                    this.situation[i].cotPayeCompl = null;
                  }
                  //console.log(j +"<"+ this.mr.length +"&&"+ this.cie[i].periode +"==="+ this.mr[j].periode);
                  for(let contMr = 0;contMr < this.mr.length;contMr ++){
                      if ( this.cie[i].periode === this.mr[contMr].periode) {
                        this.situation[i].avisMr = this.mr[contMr].avisMr;
                        this.situation[i].dateAvisMr = this.mr[contMr].dateAvisMr;
                        this.situation[i].avisComplMr = null;
                        if (typeof(this.mr[contMr].avisComplMr) !== 'undefined') {
                          this.situation[i].avisComplMr = this.mr[contMr].avisComplMr;
                        }
                        this.situation[i].dateAvisComplMr = this.mr[contMr].dateAvisComplMr;
                        this.situation[i].cotPayeComplMr = null;
                        if (typeof(this.mr[contMr].cotPayeComplMr) !== 'undefined') {
                          this.situation[i].cotPayeComplMr = this.mr[contMr].cotPayeComplMr;
                        }
                        this.situation[i].dateCotPayeComplMr = this.mr[contMr].dateCotPayeComplMr;
                        indiceMr++;
                        break;
                      }
                  }
                  if(indiceMr === 0){
                    this.situation[i].avisMr = null;
                    this.situation[i].dateAvisMr = null;
                    this.situation[i].avisComplMr = null;
                    this.situation[i].dateAvisComplMr = null;
                    this.situation[i].cotPayeComplMr = null;
                    this.situation[i].dateCotPayeComplMr = null;
                  }
                  else{
                    indiceMr = 0;
                  }
                  
                  if (k < this.crg.length && this.crg.length > 0 && this.cie[i].periode === this.crg[k].periode) {
                    this.situation[i].mrCrg = this.crg[k].mrCrg.to;
                    this.situation[i].crg = this.crg[k].mrCrg * (this.crg[k].tauxCrg) / 100;
                    this.situation[i].nouvMr = this.crg[k].nouvMrCrg;
                    this.situation[i].dateCrg = this.crg[k].dateCrg;
                    k++;
                  } else {
                    this.situation[i].mrCrg = null;
                    this.situation[i].crg = null;
                    this.situation[i].nouvMr = null;
                    this.situation[i].dateCrg = null;
                  }

                }
    			      this.twoDimSituation();
                this.recupAnneeSituation();
                this.calculeSolde()
              }
            );
          }
			    );
		    }
		    );
      }
      );
  }

  clickHistorique(){

  }

  
}
