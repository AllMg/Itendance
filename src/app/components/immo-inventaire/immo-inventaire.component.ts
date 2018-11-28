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
	ngxServices = [];
	ngxAnnees = [];

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
			annee: null
		}
	};

	Detail = {
		charge: false,
		libelleService: "",
		codeService: "",
		dateInventaire: "",
		listePresent: [],
		listeNonPresent: []
	};

	Etat = {
		annee: null,
		liste: [],
		ligneMax: 25,
		page: 0,
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
			dateCondamnation: null,
			aVendre: "",
			estVendu: ""
		},
		modif: null,
		chargeModif: false
	};

	constructor(
		private router: Router, 
		private toast: ToastrService,
		private immoService: ImmoService) {
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
				that.listeService = obs.msg;
				let liste = [];
				for(let i=0; i<that.listeService.length; i++){
					liste.push({
						id: that.listeService[i].code_service, 
						text: that.listeService[i].libelle + " " + that.listeService[i].code_service
					});
				}
				that.ngxServices = liste;
			}
			observ.unsubscribe();
		});
	}

	ngOnInit() {
		let debut = 1940;
		let date = new Date(Date.now());
		let fin = date.getFullYear();
		let liste = [];
		for(let annee = fin; annee>=debut; annee--){
			liste.push({id: annee, text: annee});
		}
		this.ngxAnnees = liste;
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
			let observ = this.immoService.immoTopic("listeDetAvecCodeArtServiceInt", this.Pv.refService, false).subscribe(obs=>{
				console.log("listeDetAvecCodeArtServiceInt",obs);
				if(obs.success && obs.msg != null){
					let liste = obs.msg;
					for(let i=0; i<liste.length; i++){
						liste[i].presence = true;
						let indice = i;
						let observ2 = that.immoService.immoTopic("detailsArticleInt", liste[i].codeArticle.refArticle, false).subscribe(obs2=>{
							console.log("detailsArticleInt",obs2);
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
					if(obs.msg != null) {
						that.toast.error(obs.msg);
					}
					else{
						that.toast.error("Erreur depuis le serveur");
					}
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
					idCodeArt: this.Pv.listeASauver[i].codeArticle.idCodeArt,
					etat: this.Pv.listeASauver[i].codeArticle.etat,
					detenteur: this.Pv.listeASauver[i].detention.refIndividu,
					prix: this.Pv.listeASauver[i].codeArticle.prix,
					present: this.avoirPresence(this.Pv.listeASauver[i].presence)
				});
			}
			let observ = this.immoService.immoTopic("ajoutPvInventaireInt", argument, true).subscribe(obs=>{
				console.log("ajoutPvInventaireInt", obs);
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
		let argument = {
			pagination: this.Liste.page,
			refService: this.Liste.filtre.refService,
			annee: this.Liste.filtre.annee
		};
		console.log("argument: ", argument);
		let observ = this.immoService.immoTopic("listePvInventaireInt", argument, true).subscribe(obs=>{
			console.log("listePvInventaireInt", obs);
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
  	this.Detail.dateInventaire = this.avoirDateSlash(this.Liste.liste[index].dateInv);
  	let that = this;
  	for(let i=0; i<this.listeService.length; i++){
  		if(this.listeService[i].code_service == this.Liste.liste[index].refService){
  			this.Detail.libelleService = this.Liste.liste[index].libelleService;
  			this.Detail.codeService = this.Liste.liste[index].refService;
  			break;
  		}
  	}
  	let observ1 = this.immoService.immoTopic("detailsPvInventaireArticleInt", this.Liste.liste[index].idPvInventaire, false).subscribe(obs=>{
  		console.log("detailPvInventaireInt",obs);
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
  				if(liste[i].pvInventaire.present == 1){
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
		this.Etat.finAtteint = false;
		this.Etat.page = 0;
		this.Etat.liste = [];
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
  	let observ = this.immoService.immoTopic("etatPvInventaireInt", argument, true).subscribe(obs=>{
		console.log("etatPvInventaireInt",obs);  
		if(obs.success){
			if(obs.msg != null && obs.msg.pvInventaireArticle != null){
				let objet = obs.msg;
				let liste = [];
				let idArticles = [];
				for(let i=0; i<objet.pvInventaireArticle.length; i++){
					liste.push({
						idCodeArt: objet.pvInventaireArticle[i].idCodeArt,
						libelleArt: "",
						service: objet.pvInventaire.refService,
						detenteur: objet.pvInventaireArticle[i].detenteur,
						prix: objet.pvInventaireArticle[i].prix,
						imputation: objet.codeArticle[i].imputation
					});
					idArticles.push(objet.codeArticle[i].refArticle);
				}
				let observ2 = this.immoService.immoTopic("listeArticleParIdInt", idArticles, true).subscribe(obs2=>{
					if(obs2.success){
						for(let i=0; i<liste.length; i++){
							liste[i].libelleArt = obs2.msg[i];
						}
					}
					else{
						that.toast.error("Un problème de réseau empêche la récupération des articles");
					}
					that.Etat.liste = that.Etat.liste.concat(liste);
					that.fermeChargement();
					observ2.unsubscribe();
				});
			}
			else{
				that.Etat.finAtteint = true;
				that.fermeChargement();
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
	let argument = {
		pagination: this.Cond.page,
		filtre: this.Cond.filtre
	};
  	let observ = this.immoService.immoTopic("filtreCondamnationInt", argument, true).subscribe(obs=>{
		console.log("filtreCondamnationInt", obs);  
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
			idCond: this.Cond.liste[index].condamnation.idCond,
			etatArt: this.Cond.liste[index].condamnation.etatArt,
			aVendre: this.Cond.liste[index].condamnation.aVendre,
			estVendu: this.Cond.liste[index].condamnation.estVendu,
			venduLe: this.Cond.liste[index].condamnation.venduLe
		};
	}

	modifierCond(){
		this.Cond.chargeModif = true;
		let that = this;
		let observ = this.immoService.immoTopic("modifierCondamnationInt", this.Cond.modif, true).subscribe(obs=>{
			console.log("modifierCondamnationInt",obs);
			if(obs.success){
				that.toast.success("Modification terminé");
				let modif = obs.msg;
				that.Cond.liste[that.Cond.indice].condamnation.etatArt = modif.etatArt;
				that.Cond.liste[that.Cond.indice].condamnation.aVendre = modif.aVendre;
				that.Cond.liste[that.Cond.indice].condamnation.estVendu = modif.estVendu;
				that.Cond.liste[that.Cond.indice].condamnation.venduLe = modif.venduLe;
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

	avoirLibelleService(refService){
		for(let i=0; i<this.listeService.length; i++){
			if(this.listeService[i].code_service == refService){
				return this.listeService[i].libelle;
			}
		}
		return "";
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
