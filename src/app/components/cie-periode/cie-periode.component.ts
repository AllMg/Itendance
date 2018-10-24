import { Component, OnInit } from '@angular/core';
import {CiePeriodeService} from '../../services/cie-periode/cie-periode.service';
import {SoldeService} from '../../services/solde/solde.service';
import {CrgService} from '../../services/crg/crg.service';
import {MrService} from '../../services/mr/mr.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cie-periode',
  templateUrl: './cie-periode.component.html',
  styleUrls: ['./cie-periode.component.css']
})
export class CiePeriodeComponent implements OnInit {
	situation:any[] = [];
	cie:any[] = [];
	fitreSelect:string = "";
	showMessage = false;
	mr:any;
	crg:any;
	solde:any;
	periodeServe:any;
  afficheSituationTotal = {
    cotisationDu:0,
    cotisationPaye:0
  }
  constructor(private cieService: CiePeriodeService, private soldeService: SoldeService,
                private crgService: CrgService, private mrService: MrService,private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
    //console.log("TESTTTTTT OK");
  	this.selectionAnne();
  }
  tousSituation(){
    this.router.navigate(['/situation-compte/']);
  }

  twoDimResult(){
    console.log("twoDimResult");
    let cotisationDu:number = 0;
    let cotisationPaye:number = 0;

    console.log("this.situation.length +> "+this.situation.length);
    for(let i = 0;i<this.situation.length;i++){
      if(this.situation[i].avisDn !== null){
        cotisationDu = cotisationDu + this.situation[i].avisDn;
      }

      if(this.situation[i].cotPayeDn !== null){
        cotisationPaye = cotisationPaye + this.situation[i].cotPayeDn;
      }

    }

    this.afficheSituationTotal.cotisationDu = cotisationDu;
    this.afficheSituationTotal.cotisationPaye = cotisationPaye;
    if(cotisationDu == 0){
      this.afficheSituationTotal.cotisationDu = null;
    }
    if(cotisationPaye == 0){
      this.afficheSituationTotal.cotisationPaye = null;
    }
  }

  selectionAnne(){
    //console.log("TESTTTTTT" + this.route.snapshot.params['periode']);
    this.situation = [];
    let indiceMr = 0;
    let indiceSolde = 0;
    this.fitreSelect = this.route.snapshot.params['periode'];
      const userEmployeur = JSON.parse(localStorage.getItem('user'));
      const zero = 0;
      this.cieService.listeCieByEmplByAnnee(userEmployeur.id_acces,this.fitreSelect).subscribe(
        (data) => {
          console.log("CIE "+data.msg);
          this.cie = data.msg;
          if( this.cie.length <= 0){
            this.showMessage = false;
          }
          //console.log('nombre cie' + this.cie.length);
          this.mrService.listeMrByEmpl(userEmployeur.id_acces).subscribe(
            (data) => {
            this.mr = data.msg;
            //console.log('nombre mr' + this.mr);
            this.crgService.listeCrgByEmpl(userEmployeur.id_acces).subscribe(
            (data) => {
              this.crg = data.msg;
              //console.log('nombre crg' + this.crg);
              this.soldeService.listeSoldeByEmpl(userEmployeur.id_acces).subscribe(
              (data) => {
                this.solde = data.msg;
                console.log("nombre solde tous "+this.solde);
                
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
                this.twoDimResult();
              }
            );
            }
            );
          }
          );
        }
        );
  }


}
