import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { FileModel } from '../../models/file-model';
import { ImmoService } from '../../services/immo/immo.service';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-sec-agent',
  templateUrl: './sec-agent.component.html',
  styleUrls: ['./sec-agent.component.css']
})
export class SecAgentComponent implements OnInit {

	Menu = {
	    menu: "visiteur",
	    sousMenu: ""
	};

	Liste = {
		estVue: false,
		liste: [],
		indice: -1,
		page: 1,
		ligneMax: 15,
		charge: false,
		filtre: {
			nomPrenom: "",
			matricule: "",
			nomSociete: "",
			statut: ""
		}
	};

	Saisie = {
		titre: "Enregistrement d'un nouveau agent de sécurité",
		type: "Ajout",
		idAgentSec: null,
		champ: {
			nom: "",
			prenom: "",
			matricule: "",
			cin: "",
			nomSociete: "",
			telephone: "",
			adresse: "",
			statut: ""
		},
		photo: null,
		charge: false
	};
	
	constructor(
		private router: Router,
		private toast: ToastrService,
    private fileService: FileService,
		private immoService: ImmoService) { }

	ngOnInit() {
	}

	clickInMenu1(lien){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
		if(nom == "liste"){
			if(!this.Liste.estVue){
				this.Liste.estVue = true;
				this.listeAgent();
			}
		}
	}

	listeAgent(){
		this.Liste.charge = true;
		let that = this;
		let argument = {
			filtre: this.Liste.filtre,
			page: this.Liste.page
		};
		let observ = this.immoService.immoTopic("listeAgentSecInt", argument, true).subscribe(obs=>{
			if(obs.success){
				that.Liste.liste = obs.msg;
			}
			else{
				that.toast.error(obs.msg);
			}
			that.Liste.charge = false;
			observ.unsubscribe();
		});
	}

	filtreChange(){
		this.Liste.page = 1;
		this.listeAgent();
	}

  pageSuivant(){
    if(!this.Liste.charge){
      if(this.Liste.liste.length == this.Liste.ligneMax){
        this.Liste.page++;
        this.listeAgent();
      }
    }
  }

  pagePrecedent(){
    if(!this.Liste.charge){
      if(this.Liste.page > 1){
        this.Liste.page--;
        this.listeAgent();
      }
    }
  }

  saisieNouvAgent(){
  	this.Menu.sousMenu = "saisie";
  	this.Saisie.titre = "Enregistrement d'un nouveau agent de sécurité";
  	this.Saisie.type = "Ajout";
  	for(let attr in this.Saisie.champ){
  		this.Saisie.champ[attr] = "";
  	}
  	this.Saisie.photo = null;
  	this.Saisie.champ.statut = "1";
  }

	clickInfoAgent(index){
		this.Menu.sousMenu = "saisie";
		this.Saisie.titre = "Modification d'information d'agent de sécurité";
  	this.Saisie.type = "Modif";
  	this.Saisie.idAgentSec = this.Liste.liste[index].idAgentSec;
  	this.Saisie.champ.nom = this.Liste.liste[index].nom;
  	this.Saisie.champ.prenom = this.Liste.liste[index].prenom;
  	this.Saisie.champ.cin = this.Liste.liste[index].cin;
  	this.Saisie.champ.adresse = this.Liste.liste[index].adresse;
  	this.Saisie.champ.telephone = this.Liste.liste[index].telephone;
  	this.Saisie.champ.matricule = this.Liste.liste[index].matricule;
  	this.Saisie.champ.nomSociete = this.Liste.liste[index].nomSociete;
  	this.Saisie.champ.statut = this.Liste.liste[index].statut;

  	let that = this;
    let fileQuery = new FileModel();
    fileQuery.id_files = "sec-pdp-"+this.Saisie.idAgentSec;
    let observ = this.fileService.readQuery(fileQuery).subscribe(data => {
      if (data.success) {
        that.Saisie.photo = data.msg.file;
      }
      else{
        that.toast.error(data.msg);
      }
      observ.unsubscribe();
    });
	}

  pieceChange(event){
    let file = event.target.files[0];
    if(file.size < 5000000){
      if(file.type.search("image") != -1){
      	let that = this;
      	let filereader = new FileReader();
      	filereader.onload = function(){
      		that.Saisie.photo = filereader.result;
      	};
      	filereader.readAsDataURL(file);
      }
      else{
        this.toast.error("Le fichier doit être une image");
      }
    }
    else{
      this.toast.error("Le fichier est trop volumineux");
    }
  }

  enregistrePhoto(dataUrl, idAgentSec){
    let that = this;
    let fichier = {
      id_files: "sec-pdp-"+idAgentSec,
      file: dataUrl,
      serviceName: "Intendance",
      name: "photo agent sec"
    };
    let observ = that.fileService.save(fichier).subscribe(obs=>{
      if(!obs.success){
        that.toast.error("L'enregistrement du photo a échoué");
      }
      observ.unsubscribe();
    });
  }

  modifierPhoto(dataUrl, idAgentSec){
    let that = this;
  	let fichier = new FileModel();
    fichier.id_files = "sec-pdp-"+idAgentSec;
    fichier.file = dataUrl;
    fichier.serviceName = "Intendance";
    fichier.name = "photo agent sec";
    let condition = {
    	"id_files": "sec-pdp-"+idAgentSec,
    	"serviceName": "Intendance"
    };
    let observ = that.fileService.updateFile(condition, fichier).subscribe(obs=>{
      if(!obs.success){
        that.toast.error("La modification du photo a échoué");
      }
      observ.unsubscribe();
    });
  }

  retourALaListe(){
  	this.Menu.sousMenu = "liste";
  }

  champEstBon(){
  	this.Saisie.champ.nom = this.Saisie.champ.nom.trim();
  	this.Saisie.champ.prenom = this.Saisie.champ.prenom.trim();
  	this.Saisie.champ.cin = this.Saisie.champ.cin.trim();
  	this.Saisie.champ.adresse = this.Saisie.champ.adresse.trim();
  	this.Saisie.champ.telephone = this.Saisie.champ.telephone.trim();
  	this.Saisie.champ.matricule = this.Saisie.champ.matricule.trim();
  	this.Saisie.champ.nomSociete = this.Saisie.champ.nomSociete.trim();
  	let champ = this.Saisie.champ;
  	if(champ.nom == "" || champ.prenom == ""){
  		return {estBon: false, msg: "Nom ou prénom invalide"};
  	}
  	if(champ.cin == ""){
  		return {estBon: false, msg: "Numéro de CIN invalide"};
  	}
  	else{
  		for(let i=0; i<12; i++){
				if(parseInt(champ.cin.charAt(i)) == NaN){
					return {estBon: false, msg: "Numéro de CIN invalide"};
				}
			}
  	}
  	if(champ.matricule == ""){
  		return {estBon: false, msg: "Numéro matricule invalide"};
  	}
  	if(champ.telephone == "" || champ.adresse == ""){
  		return {estBon: false, msg: "Téléphone ou adresse invalide"};
  	}
  	if(champ.nomSociete == ""){
  		return {estBon: false, msg: "Nom de société d'origine invalide"};
  	}
  	return {estBon: true, msg: null};
  }

  validerSaisie(){
  	let verif = this.champEstBon();
  	if(verif.estBon){
  		if(this.Saisie.type == "Ajout"){
  			this.validerNouvAgent();
  		}
  		else{

  		}
  	}
  	else{
  		this.toast.error(verif.msg);
  	}
  }

  validerNouvAgent(){
  	this.Saisie.charge = true;
  	let that = this;
  	let observ = this.immoService.immoTopic("ajoutAgentSecInt", this.Saisie.champ, true).subscribe(obs=>{
  		if(obs.success){
  			for(let attr in that.Saisie.champ){
  				that.Saisie.champ[attr] = "";
  			}
  			let dataUrl = that.Saisie.photo;
  			that.enregistrePhoto(dataUrl, obs.msg.idAgentSec);
  			that.Saisie.photo = null;
  			that.toast.success("Enregistrement terminé");
  		}
  		else{
  			that.toast.error(obs.msg);
  		}
  		that.Saisie.charge = false;
  		observ.unsubscribe();
  	});
  }

  validerModifAgent(){
  	this.Saisie.charge = true;
  	let that = this;
  	let champ = this.Saisie.champ;
  	champ["idAgentSec"] = this.Saisie.idAgentSec;
  	let observ = this.immoService.immoTopic("modifAgentSecInt", champ, true).subscribe(obs=>{
  		if(obs.success){
  			let dataUrl = that.Saisie.photo;
  			that.modifierPhoto(dataUrl, that.Saisie.idAgentSec);
  		}
  		else{
  			that.toast.error(obs.msg);
  		}
  		that.Saisie.charge = false;
  		observ.unsubscribe();
  	});
  }

}
