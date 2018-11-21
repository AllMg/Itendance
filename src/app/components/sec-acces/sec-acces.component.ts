import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';

declare var $: any;

@Component({
  selector: 'app-sec-acces',
  templateUrl: './sec-acces.component.html',
  styleUrls: ['./sec-acces.component.css']
})
export class SecAccesComponent implements OnInit {

	@ViewChild('modalDetailDmd') modalDetailDmd;

	Menu = {
	    menu: "acces",
	    sousMenu: ""
	};

	listeEtatDmd = [];

	Fdmd = {
		champ: {
			reference: "",
			refIndividu: "",
			refService: "",
			dateAccesEntree: null,
			refMotif: ""
		},
		charge: false
	};

	Ldmd = {
		estVue: true,
		liste: [],
		indice: -1,
		page: 1,
		charge: false,
		filtre: {
			dateAccesEntree: null,
			dateDmdAcces: null,
			refIndividu: "",
			idEtat: ""
		},
		ligneMax: 25,
		nouveauEtat: "",
		motifRejet: "",
		chargeStatutChange: false,
		etatAchange: false
	};

	Lacces = {
		estVue: true,
		liste: [],
		page: 1,
		charge: false,
		ligneMax: 15,
		filtre: {
			dateMvt: null,
			refIndividuCnaps: ""
		}
	};

	constructor(
		private router: Router, 
		private toast: ToastrService,
		private immoService: ImmoService) { 
		let that = this;
		let observ = this.immoService.immoTopic("listeEtatDmdAcces", "", false).subscribe(obs=>{
			if(obs.success){
				that.listeEtatDmd = obs.msg;
			}
			observ.unsubscribe();
		});
	}

	ngOnInit() {
	}

	clickInMenu1(lien){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
		if(nom == "form_dmd"){
			if(this.Fdmd.champ.reference == ""){
				let that = this;
	      let argument = {
	        prestation: "302",
	        dr: "42"
	      };
				let observ = this.immoService.immoTopic("", argument, true).subscribe(obs=>{
					if(obs.success){
						that.Fdmd.champ.reference = obs.msg;
					}
					else{
						that.toast.error(obs.msg);
					}
					observ.unsubscribe();
				});
			}
		}
		else if(nom == "liste_dmd"){
			if(!this.Ldmd.estVue){
				this.Ldmd.estVue = true;
				this.listeDmdAcces();
			}
		}
	}

	validerDmdAcces(){
		if(this.Fdmd.champ.dateAccesEntree == null || this.Fdmd.champ.refMotif == ""){
			this.toast.error("Veuillez compléter les champs");
		}
		else{
			this.Fdmd.charge = true;
			let that = this;
			let observ = this.immoService.immoTopic("", this.Fdmd.champ, true).subscribe(obs=>{
				if(obs.success){
					that.toast.success("Demande enregistré");
				}
				else{
					that.toast.error(obs.msg);
				}
				that.Fdmd.champ.dateAccesEntree = null;
				that.Fdmd.champ.refMotif = "";
				that.Fdmd.charge = false;
				observ.unsubscribe();
			});
		}
	}

	listeDmdAcces(){
		this.Ldmd.charge = true;
		let argument = {
			page: this.Ldmd.page,
			filtre: this.Ldmd.filtre
		};
		let that = this;
		let observ = this.immoService.immoTopic("", argument, true).subscribe(obs=>{
			if(obs.success){
				that.Ldmd.liste = obs.msg;
			}
			else{
				that.toast.error(obs.msg);
			}
			that.Ldmd.charge = false;
			observ.unsubscribe()
		});
	}

	filtreDmdAccesChange(){
		this.Ldmd.page = 1;
		this.listeDmdAcces();
	}

  pageSuivantDmd(){
    if(!this.Ldmd.charge){
      if(this.Ldmd.liste.length == this.Ldmd.ligneMax){
        this.Ldmd.page++;
        this.listeDmdAcces();
      }
    }
  }

  pagePrecedentDmd(){
    if(!this.Ldmd.charge){
      if(this.Ldmd.page > 1){
        this.Ldmd.page--;
        this.listeDmdAcces();
      }
    }
  }

  ouvreDetailDmd(index){
  	$(this.modalDetailDmd.nativeElement).modal("show");
  	this.Ldmd.indice = index;
  }

  etatDmdChange(){
  	if (this.Ldmd.nouveauEtat != this.Ldmd.liste[this.Ldmd.indice].idEtat){
      this.Ldmd.etatAchange = true;
    }
    else{
      this.Ldmd.etatAchange = false;
    }
  }

  validerEtatDmd(){
  	if(this.Ldmd.etatAchange){
  		this.Ldmd.chargeStatutChange = true;
      let that = this;
      let argument = {
        idDmdAcc: this.Ldmd.liste[this.Ldmd.indice].idDmdAcc,
        idEtat: this.Ldmd.nouveauEtat,
        motifRejet: this.Ldmd.motifRejet
      };
      let observ = this.immoService.immoTopic("modifierEtatDmdAccesInt", argument, true).subscribe(obs=>{
        if(obs.success){
          that.Ldmd.chargeStatutChange = false;
          that.Ldmd.etatAchange = false;
          that.Ldmd.liste[that.Ldmd.indice].idEtat = that.Ldmd.nouveauEtat;
          that.Ldmd.liste[that.Ldmd.indice].motifRejet = that.Ldmd.motifRejet;
          that.toast.success("L'etat de la demande est parfaitement mis à jour");
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
  	}
  }

  fermeDetailDmd(){
  	$(this.modalDetailDmd.nativeElement).modal("hide");
  }

  avoirEtat(id){
  	for(let i=0; i<this.listeEtatDmd.length; i++){
  		if(id == this.listeEtatDmd[i].idEtat){
  			return this.listeEtatDmd[i].libelle;
  		}
  	}
  	return "";
  }

  listeAcces(){
  	this.Lacces.charge = true;
  	let that = this;
		let argument = {
			filtre: this.Lacces.filtre,
			page: this.Lacces.page
		};
		let observ = this.immoService.immoTopic("listeAccesInt", argument, true).subscribe(obs=>{
			if(obs.success){
				that.Lacces.liste = obs.msg;
			}
			that.Lacces.charge = false;
			observ.unsubscribe();
		});
  }

  filtreChange(){
  	this.Lacces.page = 1;
  	this.listeAcces();
  }

  pageSuivant(){
    if(!this.Lacces.charge){
      if(this.Lacces.liste.length == this.Lacces.ligneMax){
        this.Lacces.page++;
        this.listeAcces();
      }
    }
  }

  pagePrecedent(){
    if(!this.Lacces.charge){
      if(this.Lacces.page > 1){
        this.Lacces.page--;
        this.listeAcces();
      }
    }
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
