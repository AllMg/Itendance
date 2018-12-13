import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';
import { InfoService } from '../../services/info/info.service';

declare var $: any;

@Component({
	selector: 'app-immo-mvt',
	templateUrl: './immo-mvt.component.html',
	styleUrls: ['./immo-mvt.component.css']
})
export class ImmoMvtComponent implements OnInit {

	@ViewChild('modalChargement') modalChargement;

	Menu = {
		menu: "article",
		sousMenu: ""
	};

	listeService = [];
	ngxServices = [];

	Entree = {
		numTef: null,
		numBE: null,
		magasin: null,
		imputation: null,
		dateEntree: null,
		listeArticle: []
	};

	Det = {
		refService: 0,
		refIndividu: "",
		idCodeArt: "",
		listeCodeArt: []
	};

	Cess = {
		refService: "",
		listeDetService: []
	};

	constructor(
		private router: Router,
		private toast: ToastrService,
		private immoService: ImmoService,
		private infoService: InfoService) {
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
				that.listeService = obs.msg;
				let liste = [];
				for (let i = 0; i < that.listeService.length; i++) {
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
		console.log("ngOnInit ImmoMvtComponent");
	}

	clickInMenu1(lien: string) {
		this.router.navigate(['/' + lien]);
	}

	clickSousMenu(nom) {
		this.Menu.sousMenu = nom;
	}

	ajouterCodeArt() {
		this.Det.idCodeArt = this.Det.idCodeArt.trim().toUpperCase();
		if (this.Det.idCodeArt != "") {
			for (let i = 0; i < this.Det.listeCodeArt.length; i++) {
				if (this.Det.idCodeArt == this.Det.listeCodeArt[i].idCodeArt) {
					this.toast.error("Cette code article est déjà dans la liste");
					return;
				}
			}
			this.afficheChargement();
			let codeArt = {};
			let that = this;
			let observ = this.immoService.immoTopic("detailsCodeArticleInt", this.Det.idCodeArt, false).subscribe(obs => {
				console.log("detailsCodeArticleInt", obs);
				if (obs.success) {
					codeArt["idCodeArt"] = obs.msg.idCodeArt;
					codeArt["reference"] = obs.msg.reference;
					codeArt["etat"] = obs.msg.etat;
					codeArt["tef"] = obs.msg.tef;
					codeArt["fournisseur"] = obs.msg.fournisseur;
					codeArt["typeDet"] = "DOTATION";
					let observ1 = that.immoService.immoTopic("detailsArticleInt", obs.msg.refArticle, false).subscribe(obs1 => {
						console.log("detailsArticleInt", obs1);
						that.fermeChargement();
						if (obs1.success) {
							codeArt["libelle"] = obs1.msg.libelle;
							that.Det.listeCodeArt.push(codeArt);
						}
						else {
							that.toast.error(obs1.msg);
						}
						observ1.unsubscribe();
					});
				}
				else {
					that.fermeChargement();
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
	}

	enleverCodeArt(index) {
		this.Det.listeCodeArt.splice(index, 1);
	}

	validerDetention() {
		if (this.Det.listeCodeArt.length > 0 && this.Det.refService > 0 && this.Det.refIndividu.length > 7) {
			this.afficheChargement();
			let that = this;
			let observ0 = this.infoService.infoIndiv(this.Det.refIndividu).subscribe(obs0 => {
				if (obs0.success) {
					let argument = {
						refService: that.Det.refService,
						refIndividu: that.Det.refIndividu,
						listeCodeArt: []
					};
					for (let i = 0; i < that.Det.listeCodeArt.length; i++) {
						argument.listeCodeArt.push({
							idCodeArt: that.Det.listeCodeArt[i].idCodeArt,
							typeDet: that.Det.listeCodeArt[i].typeDet
						});
					}
					let observ = that.immoService.immoTopic("ajoutDetentionArticleInt", argument, true).subscribe(obs => {
						that.fermeChargement();
						if (obs.success) {
							that.toast.success("Enregistrement terminé");
							that.Det.idCodeArt = "";
							that.Det.listeCodeArt = [];
							that.Det.refIndividu = "";
							that.Det.refService = -1;
						}
						else {
							that.toast.error(obs.msg);
						}
						observ.unsubscribe();
					});
				}
				else {
					that.fermeChargement();
					that.toast.error(obs0.msg);
				}
				observ0.unsubscribe();
			});
		}
	}

	chargerServiceImmo() {
		if (this.Cess.refService != "") {
			this.afficheChargement();
			this.Cess.listeDetService = [];
			let that = this;
			let observ = this.immoService.immoTopic("listeDetentionArticleServiceInt", this.Cess.refService, false).subscribe(obs => {
				console.log("listeDetentionArticleServiceInt", obs);
				if (obs.success) {
					let listeDetService = obs.msg;
					let idCodeArt = [];
					for (let i = 0; i < listeDetService.length; i++) {
						idCodeArt.push(listeDetService[i].idCodeArt);
					}
					let observ1 = that.immoService.immoTopic("listeCodeArtParCodeInt", idCodeArt, true).subscribe(obs1 => {
						console.log("listeCodeArtParCodeInt", obs1);
						that.fermeChargement();
						if (obs1.success) {
							let listeCodeArt = obs1.msg;
							let listeIdArt = [];
							for (let i = 0; i < listeCodeArt.length; i++) {
								listeDetService[i].codeArticle = listeCodeArt[i];
								listeDetService[i].libelleArticle = "";
								listeDetService[i].horsService = false;
								listeIdArt.push(listeCodeArt[i].refArticle);
							}
							that.Cess.listeDetService = listeDetService;
							let observ2 = that.immoService.immoTopic("listeArticleParIdInt", listeIdArt, true).subscribe(obs2 => {
								console.log("listeArticleParIdInt", obs2);
								if (obs2.success) {
									let libArt = obs2.msg;
									for (let i = 0; i < libArt.length; i++) {
										that.Cess.listeDetService[i].libelleArticle = libArt[i];
									}
								}
								observ2.unsubscribe();
							});
						}
						else {
							that.toast.error(obs1.msg);
						}
						observ1.unsubscribe();
					});
				}
				else {
					that.fermeChargement();
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
	}

	peutFaireCession() {
		for (let i = 0; i < this.Cess.listeDetService.length; i++) {
			if (this.Cess.listeDetService[i].horsService == true) {
				return true;
			}
		}
		return false;
	}

	validerCession() {
		if (this.peutFaireCession()) {
			this.afficheChargement();
			let argument = [];
			for (let i = 0; i < this.Cess.listeDetService.length; i++) {
				if (this.Cess.listeDetService[i].horsService) {
					let arg = {
						idDetArt: this.Cess.listeDetService[i].idDetArt,
						refService: this.Cess.refService,
						detenteur: this.Cess.listeDetService[i].refIndividu,
						anneeAcquisition: this.prendAnneeDepuisDate(this.Cess.listeDetService[i].codeArticle.datePremierAcqui),
						etatArt: this.Cess.listeDetService[i].codeArticle.etat,
						valeur: this.Cess.listeDetService[i].codeArticle.prix
					}
					argument.push(arg);
				}
			}
			let that = this;
			let observ = this.immoService.immoTopic("ajoutCondamnationInt", argument, true).subscribe(obs => {
				console.log("ajoutCondamnationInt", obs);
				that.fermeChargement();
				if (obs.success) {
					that.Cess.listeDetService = [];
					that.Cess.refService = "0";
					that.toast.success("Opération terminé");
				}
				else {
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
		else {
			this.toast.error("Il n'y a rien à condamner");
		}
	}

	chargerDepuisTEF(){
		this.afficheChargement();
		this.Entree.listeArticle = [];
		this.Entree.numTef = this.Entree.numTef.trim();
		let that = this;
		let observ = this.immoService.findByNumTefEntreeDetailsAprro(this.Entree.numTef).subscribe(obs=>{
			console.log("findByNumTefEntreeDetailsAprro",obs);
			if(obs.success && obs.msg != null){
				that.Entree.numBE = obs.msg[0].numBe;
				that.Entree.magasin = obs.msg[0].libelleMagasin;
				that.Entree.dateEntree = that.avoirDateSlash(obs.msg[0].dateInsert);
				for(let art of obs.msg){
					that.Entree.listeArticle.push({
						libelle: art.designation,
						prixUnitaire: art.prixUnitaire,
						colisage: art.descriptionUnite,
						quantite: art.qte,
						amortissable: false,
						coutUnitaire: art.prixUnitaire
					});
				}
				observ.unsubscribe();
				observ = that.immoService.findByNumTefTefAprro(that.Entree.numTef).subscribe(obs2=>{
					console.log("findByNumTefTefAprro",obs2);
					if(obs2.success && obs2.msg != null){
						that.Entree.imputation = obs2.msg.idRubrique;
					}
					observ.unsubscribe();
					that.fermeChargement();
				});
			}
			else{
				that.fermeChargement();
			}
		});
	}

	clickAmortissable(index){
		this.Entree.listeArticle[index] = !this.Entree.listeArticle[index];
	}

	validerEntree(){

	}

	afficheChargement() {
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement() {
		$(this.modalChargement.nativeElement).modal('hide');
	}

	prendAnneeDepuisDate(date) {
		let str = date.toString().split("-")[0];
		return parseInt(str);
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
