import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
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
			}
			observ.unsubscribe();
		});
	}

	ngOnInit() {
		console.log("ngOnInit ImmoMvtComponent");
	}

	clickInMenu1(lien:string){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
	}

	ajouterCodeArt(){
		this.Det.idCodeArt = this.Det.idCodeArt.trim().toUpperCase();
		if(this.Det.idCodeArt != ""){
			for(let i=0; i<this.Det.listeCodeArt.length; i++){
				if(this.Det.idCodeArt == this.Det.listeCodeArt[i].idCodeArt){
					this.toast.error("Cette code article est déjà dans la liste");
					return;
				}
			}
			this.afficheChargement();
			let codeArt = {};
			let that = this;
			let observ = this.immoService.immoTopic("detailsCodeArticleInt", this.Det.idCodeArt, false).subscribe(obs=>{
				if(obs.success){
					codeArt["idCodeArt"] = obs.msg.idCodeArt;
					codeArt["reference"] = obs.msg.reference;
					codeArt["etat"] = obs.msg.etat;
					codeArt["tef"] = obs.msg.tef;
					codeArt["fournisseur"] = obs.msg.fournisseur;
					codeArt["typeDet"] = "DOTATION";
					let observ1 = that.immoService.immoTopic("detailsArticleInt", obs.msg.refArticle, false).subscribe(obs1=>{
						that.fermeChargement();
						if(obs1.success){
							codeArt["libelle"] = obs1.msg.libelle;
							that.Det.listeCodeArt.push(codeArt);
						}
						else{
							that.toast.error(obs1.msg);
						}
						observ1.unsubscribe();
					});
				}
				else{
					that.fermeChargement();
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
	}

	enleverCodeArt(index){
		this.Det.listeCodeArt.splice(index, 1);
	}

	validerDetention(){
		if(this.Det.listeCodeArt.length > 0 && this.Det.refService > 0 && this.Det.refIndividu.length > 7){
			this.afficheChargement();
			let that = this;
			let observ0 = this.infoService.infoIndiv(this.Det.refIndividu).subscribe(obs0=>{
				if(obs0.success){
					let argument = {
						refService: that.Det.refService,
						refIndividu: that.Det.refIndividu,
						listeCodeArt: []
					};
					for(let i=0; i<that.Det.listeCodeArt.length; i++) {
						argument.listeCodeArt.push({
							idCodeArt: that.Det.listeCodeArt[i].idCodeArt,
							typeDet: that.Det.listeCodeArt[i].typeDet
						});
					}
					let observ = that.immoService.immoTopic("ajoutDetentionArticleInt", argument, true).subscribe(obs=>{
						that.fermeChargement();
						if(obs.success){
							that.toast.success("Enregistrement terminé");
							that.Det.idCodeArt = "";
							that.Det.listeCodeArt = [];
							that.Det.refIndividu = "";
							that.Det.refService = -1;
						}
						else{
							that.toast.error(obs.msg);
						}
						observ.unsubscribe();
					});
				}
				else{
					that.fermeChargement();
					that.toast.error(obs0.msg);
				}
				observ0.unsubscribe();
			});
		}
	}

	chargerServiceImmo(){
		if(this.Cess.refService != ""){
			this.afficheChargement();
			this.Cess.listeDetService = [];
			let that = this;
			let observ = this.immoService.immoTopic("listeDetentionArticleServiceInt", this.Cess.refService, false).subscribe(obs=>{
				if(obs.success){
					let listeDetService = obs.msg;
					let idCodeArt = [];
					for(let i=0; i<listeDetService.length; i++){
						idCodeArt.push(listeDetService[i].idCodeArt);
					}
					let observ1 = that.immoService.immoTopic("listeCodeArtParCodeInt", idCodeArt, true).subscribe(obs1=>{
						that.fermeChargement();
						if(obs1.success){
							let listeCodeArt = obs1.msg;
							let listeIdArt = [];
							for(let i=0; i<listeCodeArt.length; i++){
								listeDetService[i].codeArticle = listeCodeArt[i];
								listeDetService[i].libelleArticle = "";
								listeDetService[i].horsService = false;
								listeIdArt.push(listeCodeArt[i]);
							}
							that.Cess.listeDetService = listeDetService;
							let observ2 = that.immoService.immoTopic("listeArticleParIdInt", listeIdArt, true).subscribe(obs2=>{
								if(obs2.success){
									let libArt = obs2.msg;
									for(let i=0; i<libArt.length; i++){
										that.Cess.listeDetService[i].libelleArticle = libArt[i];
									}
								}
								observ2.unsubscribe();
							});
						}
						else{
							that.toast.error(obs1.msg);
						}
						observ1.unsubscribe();
					});
				}
				else{
					that.fermeChargement();
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
	}

	peutFaireCession(){
		for(let i=0; i<this.Cess.listeDetService.length; i++){
			if(this.Cess.listeDetService[i].horsService == true){
				return true;
			}
		}
		return false;
	}

	validerCession(){
		if(this.peutFaireCession()){
			this.afficheChargement();
			let argument = [];
			for(let i=0; i<this.Cess.listeDetService.length; i++){
				if(this.Cess.listeDetService[i].horsService){
					let arg = {
						idDetArt: this.Cess.listeDetService[i].idDetArt,
						refService: this.Cess.refService,
						detenteur: this.Cess.listeDetService[i].refIndividu,
						anneeAcquisition: this.Cess.listeDetService[i].codeArticle.datePremierAcqui,
						etatArt: this.Cess.listeDetService[i].codeArticle.etat,
						valeur: this.Cess.listeDetService[i].codeArticle.prix
					}
					argument.push(arg);
				}
			}
			let that = this;
			let observ = this.immoService.immoTopic("ajoutCondamnationInt", argument, true).subscribe(obs=>{
				that.fermeChargement();
				if(obs.success){
					that.Cess.listeDetService = [];
					that.Cess.refService = "0";
					that.toast.success("Opération terminé");
				}
				else{
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
		else{
			this.toast.error("Il n'y a rien à condamner");
		}
	}

	afficheChargement(){
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement(){
		$(this.modalChargement.nativeElement).modal('hide');
	}

}
