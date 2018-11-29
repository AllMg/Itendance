import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';
import { InfoService } from '../../services/info/info.service';

declare var $: any;

@Component({
  selector: 'app-securite',
  templateUrl: './sec-visiteur.component.html',
  styleUrls: ['./sec-visiteur.component.css']
})
export class SecVisiteurComponent implements OnInit {

	@ViewChild('modalConfirmeSortie') modalConfirmeSortie;
	@ViewChild('modalInfoVisiteur') modalInfoVisiteur;

	Menu = {
	    menu: "visiteur",
	    sousMenu: ""
	};

	listeService = [];
	ngxServices = [];
	listeMotif = [];

	Entree = {
		estAgent: false,
		champ: {
			nom: "",
			prenom: "",
			cin: "",
			numeroVehicule: "",
			refService: "",
			refIndividuRecherche: "",
			refIndividuCnaps: "",
			idMotif: 1
		},
		charge: false
	};

	Sortie = {
		liste: [],
		indice: -1,
		charge: false
	};

	Liste = {
		estVue: false,
		liste: [],
		indice: -1,
		page: 1,
		ligneMax: 15,
		filtre: {
			refService: 0,
			nomPrenom: "",
			date: null
		},
		charge: false
	};

	constructor(
		private router: Router, 
		private toast: ToastrService,
		private immoService: ImmoService,
		private infoService: InfoService) { 
		let that = this;
		let observ = this.immoService.getAllRefDrhService().subscribe(obs=>{
			console.log("getAllRefDrhService",obs);
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
		let that = this;
		let observ = this.immoService.immoTopic("listeMotifVisitInt", "", false).subscribe(obs=>{
			console.log("listeMotifVisitInt",obs);
			if(obs.success){
				that.listeMotif = obs.msg;
			}
			observ.unsubscribe();
		});
	}

	clickInMenu1(lien){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
		if(nom == "sortie"){
			this.Sortie.charge = true;
			let that = this;
			let observ = this.immoService.immoTopic("listeVisiteurAujourdhuiInt", "", false).subscribe(obs=>{
				console.log("listeVisiteurAujourdhuiInt", obs);
				if(obs.success){
					let liste = [];
					for(let i=0; i<obs.msg.mvt.length; i++){
						liste.push({
							charge: false,
							mvt: obs.msg.mvt[i],
							visiteur: obs.msg.visiteur[i],
							vehicule: obs.msg.vehicule[i]
						});
					}
					that.Sortie.liste = liste;
				}
				else{
					that.toast.error(obs.msg);
				}
				that.Sortie.charge = false;
				observ.unsubscribe();
			});
		}
		else if(nom == "liste"){
			if(this.Liste.estVue == false){
				this.Liste.estVue = true;
				this.listeVisiteur();
			}
		}
	}

	champEntreeBon(){
		this.Entree.champ.nom = this.Entree.champ.nom.trim();
		this.Entree.champ.prenom = this.Entree.champ.prenom.trim();
		this.Entree.champ.cin = this.Entree.champ.cin.trim();
		if(this.Entree.champ.nom == "" || this.Entree.champ.prenom == ""){
			return {bon: false, msg: "Nom ou prénom invalide"};
		}
		if(this.Entree.champ.cin.length != 12){
			return {bon: false, msg: "Numéro CIN invalide"};
		}
		for(let i=0; i<12; i++){
			if(parseInt(this.Entree.champ.cin.charAt(i)) == NaN){
				return {bon: false, msg: "Numéro CIN invalide"};
			}
		}
		if(this.Entree.estAgent){
			this.Entree.champ.refIndividuCnaps = this.Entree.champ.refIndividuCnaps.trim();
			if(this.Entree.champ.refIndividuCnaps == ""){
				return {bon: false, msg: "Numéro matricule invalide"};
			}
		}
		return {bon: true, msg: ""};
	}

	enregistrerEntree(){
		if(this.Entree.estAgent){
			this.enregistrerEntreeAgent();
		}
		else{
			this.enregistrerEntreeVisiteur();
		}
	}

	enregistrerEntreeVisiteur(){
		let champBon = this.champEntreeBon();
		if(champBon.bon){
			this.Entree.charge = true;
			this.Entree.champ.refIndividuRecherche = this.Entree.champ.refIndividuRecherche.trim();
			if(this.Entree.champ.refIndividuRecherche == ""){
				this.Entree.champ.refIndividuRecherche = null;
			}
			let argument = {
				visiteur: {
					nom: this.Entree.champ.nom,
					prenom: this.Entree.champ.prenom,
					cin: this.Entree.champ.cin,
					idMotif: this.Entree.champ.idMotif,
					refIndividuCnaps: null,
					refIndividuRechercher: this.Entree.champ.refIndividuRecherche,
					refService: this.Entree.champ.refService
				},
				vehicule: {
					numeroVehicule: this.Entree.champ.numeroVehicule
				}
			};
			let that = this;
			let observ = this.immoService.immoTopic("ajoutVisiteurInt", argument, true).subscribe(obs=>{
				console.log("ajoutVisiteurInt",obs);
				if(obs.success){
					that.toast.success("Enregistrement terminé");
					that.Entree.champ.nom = "";
					that.Entree.champ.prenom = "";
					that.Entree.champ.cin = "";
					that.Entree.champ.numeroVehicule = "";
					that.Entree.champ.refService = "";
					that.Entree.champ.refIndividuRecherche = "";
					that.Entree.champ.refIndividuCnaps = "";
					that.Entree.champ.idMotif = -1;
				}
				else{
					that.toast.error(obs.msg);
				}
				that.Entree.charge = false;
				observ.unsubscribe();
			});
		}
		else{
			this.toast.error(champBon.msg);
		}
	}

	enregistrerEntreeAgent(){
		let champBon = this.champEntreeBon();
		if(champBon.bon){
			this.Entree.charge = true;
			let argument = {
				visiteur: {
					nom: this.Entree.champ.nom,
					prenom: this.Entree.champ.prenom,
					cin: this.Entree.champ.cin,
					idMotif: this.Entree.champ.idMotif,
					refIndividuCnaps: this.Entree.champ.refIndividuCnaps,
					refIndividuRechercher: null,
					refService: 0
				},
				vehicule: {
					numeroVehicule: this.Entree.champ.numeroVehicule,
				}
			};
			let that = this;
			let observ0 = this.infoService.infoIndiv(argument.visiteur.refIndividuCnaps).subscribe(obs0=>{
				if(obs0.success){
					let observ = that.immoService.immoTopic("ajoutVisiteurInt", argument, true).subscribe(obs=>{
						if(obs.success){
							that.toast.success("Enregistrement terminé");
							that.Entree.champ.nom = "";
							that.Entree.champ.prenom = "";
							that.Entree.champ.cin = "";
							that.Entree.champ.numeroVehicule = "";
							that.Entree.champ.refService = "";
							that.Entree.champ.refIndividuRecherche = "";
							that.Entree.champ.refIndividuCnaps = "";
							that.Entree.champ.idMotif = -1;
						}
						else{
							that.toast.error(obs.msg);
						}
						that.Entree.charge = false;
						observ.unsubscribe();
					});
				}
				else{
					that.toast.error(obs0.msg);
					that.Entree.charge = false;
				}
				observ0.unsubscribe();
			});
		}
		else{
			this.toast.error(champBon.msg);
		}
	}

  ouvreConfirmeSortie(index){
    $(this.modalConfirmeSortie.nativeElement).modal('show');
    this.Sortie.indice = index;
  }

  confirmerSortie(){
  	this.fermeConfirmeSortie();
  	this.Sortie.liste[this.Sortie.indice].charge = true;
  	let that = this;
  	let observ = this.immoService.immoTopic("marquerSortieVisiteurInt", this.Sortie.liste[this.Sortie.indice].visiteur.idVis, false).subscribe(obs=>{
			console.log("marquerSortieVisiteurInt",obs);
			if(obs.success){
  			that.toast.success("Heure de sortie du visiteur enregistré");
  			that.Sortie.liste[that.Sortie.indice].mvt.heureSortie = obs.msg;
  		}
  		else{
  			that.toast.error(obs.msg);
  		}
  		that.Sortie.liste[that.Sortie.indice].charge = false;
  		observ.unsubscribe();
  	});
  }

  fermeConfirmeSortie(){
    $(this.modalConfirmeSortie.nativeElement).modal('hide');
  }

  listeVisiteur(){
  	this.Liste.charge = true;
  	let that = this;
		let argument = {
			filtre: {
				refService: this.Liste.filtre.refService,
				nom: this.Liste.filtre.nomPrenom.trim(),
				prenom: this.Liste.filtre.nomPrenom.trim(),
				dateMvt: this.Liste.filtre.date
			},
			pagination: this.Liste.page
		};
		let observ = this.immoService.immoTopic("listeVisiteurInt", argument, true).subscribe(obs=>{
			console.log("listeVisiteurInt",obs);
			if(obs.success){
				that.Liste.liste = obs.msg;
			}
			that.Liste.charge = false;
			observ.unsubscribe();
		});
  }

  filtreChange(){
  	this.Liste.page = 1;
  	this.listeVisiteur();
  }

  pageSuivant(){
    if(!this.Liste.charge){
      if(this.Liste.liste.length == this.Liste.ligneMax){
        this.Liste.page++;
        this.listeVisiteur();
      }
    }
  }

  pagePrecedent(){
    if(!this.Liste.charge){
      if(this.Liste.page > 1){
        this.Liste.page--;
        this.listeVisiteur();
      }
    }
  }

  afficheInfoVisiteur(index){
  	$(this.modalInfoVisiteur.nativeElement).modal('show');
  	this.Liste.indice = index;
  }

  fermeInfoVisiteur(){
    $(this.modalInfoVisiteur.nativeElement).modal('hide');
	}
	
	prendLibelleMotif(idMotif){
		for(let i=0; i<this.listeMotif.length; i++){
			if(this.listeMotif[i].idMotif == idMotif){
				return this.listeMotif[i].libelle;
			}
		}
		return "";
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
