import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';

declare var $: any;

@Component({
  selector: 'app-immo-inventaire',
  templateUrl: './immo-inventaire.component.html',
  styleUrls: ['./immo-inventaire.component.css']
})
export class ImmoInventaireComponent implements OnInit {

	@ViewChild('modalChargement') modalChargement;
	@ViewChild('modalModifCond') modalModifCond;

	Menu = {
	    menu: "inventaire",
	    sousMenu: ""
	};

	listeService = [];

	Pv = {
		refService: "",
		listeASauver: []
	};

	Liste = {
		estVue: false,
		liste: [],
		charge: false,
		page: 1,
		ligneMax: 25,
		filtre: {
			refService: "",
			date: null
		}
	};

	Detail = {
		charge: false,
		service: "",
		dateInventaire: "",
		listePresent: [],
		listeNonPresent: []
	};

	Etat = {
		annee: null,
		liste: [],
		ligneMax: 25,
		page: 1,
		finAtteint: false
	};

	Cond = {
		estVue: false,
		charge: false,
		liste: [],
		page: 1,
		ligneMax: 25,
		indice: 1,
		filtre: {
			refService: "",
			detenteur: "",
			idCodeArt: "",
			dateCond: null,
			aVendre: "",
			estVendu: ""
		},
		modif: null,
		chargeModif: false
	};

	constructor(
		private router: Router, 
		private toast: ToastrService,
		private immoService: ImmoService) { }

	ngOnInit() {
		let that = this;
		let observ = this.immoService.getAllRefDrhService().subscribe(obs=>{
			if(obs.success){
				that.listeService = obs.msg;
			}
			observ.unsubscribe();
		});
	}

	clickInMenu1(lien:string){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
		if(nom == "liste_pv"){
			if(!this.Liste.estVue){
				this.Liste.estVue = true;
				this.listePV();
			}
		}
		else if(nom == "cond"){
			if(!this.Cond.estVue){
				this.Cond.estVue = true;
				this.listeCond();
			}
		}
	}

	chargerListeImmoService(){
		if(this.Pv.refService != ""){
			this.afficheChargement();
			let that = this;
			let observ = this.immoService.immoTopic("listeImmoServiceInt", this.Pv.refService, false).subscribe(obs=>{
				if(obs.success){
					let liste = obs.msg;
					for(let i=0; i<that.Pv.listeASauver.length; i++){
						liste[i].presence = true;
						let indice = i;
						let observ2 = that.immoService.immoTopic("detailsArticleInt", liste[i].codeArticle.refArticle, false).subscribe(obs2=>{
							if(obs2.success){
								liste[indice].libelleArt = obs2.msg.libelle;
							}
							observ2.unsubscribe();
						});
					}
					that.fermeChargement();
					that.Pv.listeASauver = liste;
				}
				else{
					this.fermeChargement();
					that.toast.error(obs.msg);
				}
			});
		}
		else{
			this.toast.error("Veuillez choisir un service");
		}
	}

	avoirPresence(presence){
		if(presence == true){
			return 1;
		}
		return 0;
	}

	enregistrerPV(){
		if(this.Pv.listeASauver.length > 0){
			this.afficheChargement();
			let that = this;
			let argument = {
				refService: this.Pv.refService,
				liste: []
			};
			for(let i=0; i<this.Pv.listeASauver.length; i++){
				argument.liste.push({
					idCodeArt: this.Pv.listeASauver[i].idCodeArt,
					etat: this.Pv.listeASauver[i].codeArticle.etat,
					detenteur: this.Pv.listeASauver[i].refIndividu,
					prix: this.Pv.listeASauver[i].codeArticle.prix,
					present: this.avoirPresence(this.Pv.listeASauver[i].presence)
				});
			}
			let observ = this.immoService.immoTopic("", argument, true).subscribe(obs=>{
				that.fermeChargement();
				if(obs.success){
					that.toast.success("Le PV d'inventaire est enrégistré");
					that.Pv.refService = "";
					that.Pv.listeASauver = [];
				}
				else{
					that.toast.error(obs.msg);
				}
			});
		}
	}

	listePV(){
		this.Liste.charge = true;
		let that = this;
		let observ = this.immoService.immoTopic("listePVInventaire", this.Liste.filtre, true).subscribe(obs=>{
			if(obs.success){
				let liste = obs.msg;
				for(let i=0; i<liste.length; i++){
					let indice = i;
					let observ1 = that.immoService.getByIdRefDrhService(liste[i].refService).subscribe(obs1=>{
						if(obs1.success){
							liste[indice].libelleService = obs1.msg.libelle;
						}
						observ1.unsubscribe();
					});
				}
				that.Liste.liste = liste;
			}
			that.Liste.charge = false;
			observ.unsubscribe();
		});
	}

	filtrePVChange(){
		this.Liste.page = 1;
		this.listePV();
	}

  pagePrecedent(){
    if(!this.Liste.charge){
      if(this.Liste.page > 1){
        this.Liste.page--;
        this.listePV();
      }
    }
  }

  pageSuivant(){
    if(!this.Liste.charge){
      if(this.Liste.liste.length == this.Liste.ligneMax){
        this.Liste.page++;
        this.listePV();
      }
    }
  }

  ouvreDetailPV(index){
  	this.Menu.sousMenu = "detail_pv";
  	this.Detail.charge = true;
  	this.Detail.service = this.Liste.liste[index].refService;
  	this.Detail.dateInventaire = this.avoirDateSlash(this.Liste.liste[index].DateInv);
  	let that = this;
  	let observ = this.immoService.getByIdRefDrhService(this.Liste.liste[index].refService).subscribe(obs=>{
  		if(obs.success){
  			that.Detail.service += obs.msg.libelle;
  		}
  		observ.unsubscribe();
  	});
  	let observ1 = this.immoService.immoTopic("listeArticleInventaireInt", this.Liste.liste[index].refService, false).subscribe(obs=>{
  		if(obs.success){
  			let liste = obs.msg;
  			let idArticles = [];
  			for(let i=0; i<liste.length; i++){
  				liste[i].libelleArt = "";
  				idArticles.push(liste[i].codeArticle.refArticle);
  			}
  			let observ2 = this.immoService.immoTopic("listeArticleParIdInt", idArticles, true).subscribe(obs2=>{
  				if(obs2.success){
  					for(let i=0; i<obs2.msg.length; i++){
  						liste[i].libelleArt = obs2.msg[i];
  					}
  				}
  				observ2.unsubscribe();
  			});
  			for(let i=0; i<liste.length; i++){
  				if(liste[i].present == 1){
  					that.Detail.listePresent.push(liste[i]);
  				}
  				else{
  					that.Detail.listeNonPresent.push(liste[i]);
  				}
  			}
  		}
  		else{
	  		that.toast.error(obs.msg);
	  	}
  		that.Detail.charge = false;
  		observ1.unsubscribe();
  	});
  }

  retourListe(){
  	this.Menu.sousMenu = "liste_pv";
  	this.Detail.listePresent = [];
  	this.Detail.listeNonPresent = [];
  }

  etablirEtatInventaire(){
  	this.Etat.annee = parseInt(this.Etat.annee);
  	if(this.Etat.annee != undefined && this.Etat.annee > 1900){
	  	this.Etat.page = 1;
	  	this.prendListeEtat();
	  }
  }

  prendListeEtat(){
  	this.afficheChargement();
  	let argument = {
  		annee: this.Etat.annee,
  		page: this.Etat.page
  	};
  	let that = this;
  	let observ = this.immoService.immoTopic("listeEtatInventaireInt", this.Etat.annee, false).subscribe(obs=>{
  		if(obs.success){
  			let liste = obs.msg;
				if(liste.length < that.Etat.ligneMax){
					that.Etat.finAtteint = true;
					that.fermeChargement();
				}
				else{
	  			let idArticles = [];
	  			for(let i=0; i<liste.length; i++){
	  				idArticles.push(liste[i].codeArticle.refArticle);
	  			}
	  			let observ2 = this.immoService.immoTopic("listeArticleParIdInt", idArticles, false).subscribe(obs2=>{
	  				if(obs2.success){
	  					for(let i=0; i<liste.length; i++){
	  						liste[i].libelleArt = obs2.msg[i];
	  					}
	  					that.Etat.liste = that.Etat.liste.concat(liste);
	  				}
	  				else{
	  					that.toast.error(obs2.msg);
	  				}
	  				that.fermeChargement();
	  				observ2.unsubscribe();
	  			});
	  		}
  		}
  		else{
  			that.fermeChargement();
  			that.toast.error(obs.msg);
  		}
  		observ.unsubscribe();
  	});
  }

  afficherPlusEtat(){
  	this.Etat.page++;
  	this.prendListeEtat();
  }

  listeCond(){
  	this.Cond.charge = true;
  	let that = this;
  	let observ = this.immoService.immoTopic("listeCondamneInt", this.Cond.filtre, true).subscribe(obs=>{
  		if(obs.success){
  			let liste = obs.msg;
  			let idArticles = [];
  			for(let i=0; i<liste.length; i++){
  				liste[i].libelleArt = "";
  				idArticles.push(liste[i].codeArticle.refArticle);
  			}
  			let observ2 = this.immoService.immoTopic("listeArticleParIdInt", idArticles, false).subscribe(obs2=>{
  				if(obs2.success){
  					for(let i=0; i<liste.length; i++){
  						liste[i].libelleArt = obs2.msg[i];
  					}
  				}
  				observ2.unsubscribe();
  			});
  			that.Cond.liste = liste;
  		}
  		else{
  			that.toast.error(obs.msg);
  		}
  		that.Cond.charge = false;
  		observ.unsubscribe();
  	});
  }

	filtreCondChange(){
		this.Cond.page = 1;
		this.listeCond();
	}

  pagePrecedentCond(){
    if(!this.Cond.charge){
      if(this.Cond.page > 1){
        this.Cond.page--;
        this.listeCond();
      }
    }
  }

  pageSuivantCond(){
    if(!this.Cond.charge){
      if(this.Cond.liste.length == this.Cond.ligneMax){
        this.Cond.page++;
        this.listeCond();
      }
    }
  }

	ouvreModifCond(index){
		$(this.modalModifCond.nativeElement).modal("show");
		this.Cond.indice = index;
		this.Cond.modif = {
			idCond: this.Cond.liste[index].idCond,
			etat: this.Cond.liste[index].etatArt,
			aVendre: this.Cond.liste[index].aVendre,
			estVendu: this.Cond.liste[index].estVendu,
			venduLe: this.Cond.liste[index].venduLe
		};
	}

	modifierCond(){
		this.Cond.chargeModif = true;
		let that = this;
		let observ = this.immoService.immoTopic("", this.Cond.modif, true).subscribe(obs=>{
			if(obs.success){
				that.toast.success("Modification terminé");
			}
			else{
				that.toast.error(obs.msg);
			}
			that.Cond.chargeModif = false;
			observ.unsubscribe();
		});
	}

	fermeModifCond(){
		$(this.modalModifCond.nativeElement).modal("hide");
		this.Cond.modif = null;
	}

	afficheChargement(){
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement(){
		$(this.modalChargement.nativeElement).modal('hide');
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
