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

	Det = {
		refService: 0,
		refIndividu: "",
		idCodeArt: "",
		listeCodeArt: []
	};

	Cess = {
		refService: "",
		listeCodeArt: []
	};

	constructor(
    private router: Router, 
    private toast: ToastrService,
    private immoService: ImmoService,
    private infoService: InfoService) {

	}

	ngOnInit() {

	}

	clickInMenu1(lien:string){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
	}

	ajouterCodeArt(){
		for(let i=0; i<this.Det.listeCodeArt.length; i++){
			if(this.Det.idCodeArt == this.Det.listeCodeArt[i].idCodeArt){
				this.toast.error("Cette code article est déjà dans la liste");
				return;
			}
		}
		this.afficheChargement();
		let codeArt = {};
		let that = this;
		let observ = this.immoService.immoTopic("prendCodeArtInt", this.Det.idCodeArt, false).subscribe(obs=>{
			if(obs.success){
				codeArt["idCodeArt"] = obs.msg.idCodeArt;
				codeArt["reference"] = obs.msg.reference;
				codeArt["etat"] = obs.msg.etat;
				codeArt["tef"] = obs.msg.tef;
				codeArt["fournisseur"] = obs.msg.fournisseur;
				let observ1 = that.immoService.immoTopic("prendLibEtTefInt", obs.msg.refArticle, false).subscribe(obs1=>{
					if(obs1.success){
						codeArt["libelle"] = obs.msg.libelle;
						codeArt["tef"] = obs.msg.tef;
						that.Det.listeCodeArt.push(codeArt);
					}
					else{
						that.fermeChargement();
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

	enleverCodeArt(index){
		this.Det.listeCodeArt.splice(index, 1);
	}

	validerDetention(){
		if(this.Det.listeCodeArt.length > 0 && this.Det.refService > 0 && this.Det.refIndividu.length > 7){
			this.afficheChargement();
			let argument = {
				refService: this.Det.refService,
				refIndividu: this.Det.refIndividu,
				listeCodeArt: []
			};
			for(let i=0; i<this.Det.listeCodeArt.length; i++) {
				argument.listeCodeArt.push(this.Det.listeCodeArt[i].idCodeArt);
			}
			let that = this;
			let observ = this.immoService.immoTopic("detentionArtInt", argument, true).subscribe(obs=>{
				that.fermeChargement();
				if(obs.success){
					that.toast.success("Enregistrement terminé");
				}
				else{
					that.toast.error(obs.msg);
				}
				observ.unsubscribe();
			});
		}
	}

	chargerServiceImmo(){
		if(this.Cess.refService != ""){
			this.afficheChargement();
			let that = this;
			let observ = this.immoService.immoTopic("listeCodeArtServiceInt", this.Cess.refService, false).subscribe(obs=>{
				if(obs.success){
					that.Cess.listeCodeArt = obs.msg;
					let idArticles = [];
					for(let i=0; i<that.Cess.listeCodeArt.length; i++){
						that.Cess.listeCodeArt[i].libelle = "";
						that.Cess.listeCodeArt[i].horsService = false;
						that.Cess.listeCodeArt[i].nouvEtat = that.Cess.listeCodeArt[i].etat;
						idArticles.push(that.Cess.listeCodeArt[i].refArticle);
					}
					let observ1 = that.immoService.immoTopic("listeArticleParIdInt", idArticles, true).subscribe(obs1=>{
						if(obs1.success){
							for(let i=0; i<obs.msg.length; i++){
								that.Cess.listeCodeArt[i].libelle = obs.msg[i];
							}
						}
						that.fermeChargement();
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

	afficheChargement(){
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement(){
		$(this.modalChargement.nativeElement).modal('hide');
	}

}
