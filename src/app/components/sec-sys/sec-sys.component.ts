import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { FileModel } from '../../models/file-model';
import { ImmoService } from '../../services/immo/immo.service';
import { FileService } from '../../services/file/file.service';

declare var $: any;

@Component({
  selector: 'app-sec-sys',
  templateUrl: './sec-sys.component.html',
  styleUrls: ['./sec-sys.component.css']
})
export class SecSysComponent implements OnInit {

	@ViewChild('modalDetailRep') modalDetailRep;
	@ViewChild('modalDetailRap') modalDetailRap;

	Menu = {
	    menu: "systeme",
	    sousMenu: ""
	};

  listeService = [];
  ngxServices = [];
	listeEtatDmd = [];

	Saisie = {
		champ:{
			reference: "",
			refService: "",
			motif: ""
		},
		charge: false,
    pieceNom: "Parcourir mon ordinateur",
    pieceFichier: []
	};

	Liste = {
		estVue: false,
		liste: [],
    pieces: [],
		indice: -1,
		ligneMax: 15,
		page: 1,
		charge: false,
		filtre: {
			dateDmd: null,
			refService: ""
		},
    etatAchange: false,
    nouveauEtat: 0,
    chargeStatutChange: false
	};

	Sronde = {
		champ:{
			rapport: ""
		},
		charge: false,
    pieceNom: "Parcourir mon ordinateur",
    pieceFichier: []
	};

	Lronde = {
		estVue: false,
		liste: [],
    pieces: [],
		indice: -1,
		ligneMax: 15,
		page: 1,
		charge: false,
		filtre: {
			dateRonde: null,
			idAgentSec: ""
		}
	};
	
	constructor(
		private router: Router,
		private toast: ToastrService,
    private fileService: FileService,
		private immoService: ImmoService) { 
	}

	ngOnInit() {
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
		let observ1 = this.immoService.immoTopic("listeEtatDmdAccesSecInt", "", false).subscribe(obs=>{
      console.log("listeEtatDmdAccesSecInt",obs);
      if(obs.success){
				that.listeEtatDmd = obs.msg;
			}
			observ1.unsubscribe();
		});
	}

	clickInMenu1(lien){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
		if(nom == "liste"){
			if(this.Liste.estVue == false){
	      this.Liste.estVue = true;
	      this.liste();
	    }
	  }
		else if(nom == "lronde"){
			if(this.Lronde.estVue == false){
	      this.Lronde.estVue = true;
	      this.listeRonde();
	    }
	  }
		else if(nom == "saisie"){
			if(this.Saisie.champ.reference == ""){
				let that = this;
	      let argument = {
	        prestation: "4050",
	        dr: "42"
	      };
				let observ = this.immoService.immoTopic("referenceDmdArticleInt", argument, true).subscribe(obs=>{
          console.log("referenceDmdArticleInt",obs);
          if(obs.success){
						that.Saisie.champ.reference = obs.msg;
					}
					else{
						that.toast.error(obs.msg);
					}
					observ.unsubscribe();
				});
			}
		}
	}

  pieceChange(event, nomAttr){
    let file = event.target.files;
    this[nomAttr].pieceFichier = [];
    this[nomAttr].pieceNom = "";
    for(let i=0; i<file.length; i++){
      if(file[i].size < 5000000){
        if(file[i].type.search("image") != -1){
          this[nomAttr].pieceFichier.push(file[i]);
          this[nomAttr].pieceNom += "/ " + file[i].name + " ";
        }
        else{
          this.toast.error("Le fichier doit être une image");
        }
      }
      else{
        this.toast.error("Le fichier est trop volumineux");
      }
    }
  }

  enregistreFichiers(fichiers, reference){
    let that = this;
    for(let i=0; i<fichiers.length; i++){
      let index = i;
      let filereader = new FileReader();
      filereader.onload = function(){
        let fichier = {
          id_files: reference,
          file: filereader.result,
          serviceName: "Intendance",
          name: "piece justificative"
        };
        let observ = that.fileService.save(fichier).subscribe(obs=>{
          if(!obs.success){
            that.toast.error("L'enregistrement du fichier "+fichiers[index].name+" a échoué");
          }
          console.log(obs);
          observ.unsubscribe();
        });
      };
      filereader.readAsDataURL(fichiers[index]);
    }
  }

  clickEnregDmdRep(){
    if(this.Saisie.champ.reference){
      this.Saisie.charge = true;
      if(this.Saisie.champ.refService != ""){
        let that = this;
        let reference = that.Saisie.champ.reference;
        let observ = this.immoService.immoTopic("ajoutDmdReparationSecInt", this.Saisie.champ, true).subscribe(obs=>{
          console.log("ajoutDmdReparationSecInt",obs);
          if(obs.success){
            that.toast.success("L'enregistrement de la demande est terminé");
            that.Saisie.champ.reference = "";
            that.Saisie.champ.refService = "";
            that.Saisie.champ.motif = "";
            that.Saisie.pieceNom = "Parcourir mon ordinateur";
            that.enregistreFichiers(that.Saisie.pieceFichier, reference);
            that.Saisie.pieceFichier = [];
          }
          else{
            that.toast.error(obs.msg);
          }
          that.Saisie.charge = false;
          observ.unsubscribe();
        });
      }
      else{
        this.toast.error("La localisation n'est pas précisée");
      }
    }
    else{
      this.toast.error("La demande n'a pas de référence");
    }
  }

  filtreChange(){
    this.Liste.page = 1;
    this.liste();
  }

  liste(){
    this.Liste.charge = true;
    let that = this;
    let argument = {
      pagination: this.Liste.page,
      filtre: this.Liste.filtre
    };
    let observ = this.immoService.immoTopic("listeDmdReparationSecInt", argument, true).subscribe(obs=>{
      console.log("listeDmdReparationSecInt",obs);
      if(obs.success){
        that.Liste.liste = obs.msg;
      }
      that.Liste.charge = false;
      observ.unsubscribe();
    });
  }

  pageSuivant(){
    if(!this.Liste.charge){
      if(this.Liste.liste.length == this.Liste.ligneMax){
        this.Liste.page++;
        this.liste();
      }
    }
  }

  pagePrecedent(){
    if(!this.Liste.charge){
      if(this.Liste.page > 1){
        this.Liste.page--;
        this.liste();
      }
    }
  }

  ouvreDetailRep(indice){
    $(this.modalDetailRep.nativeElement).modal('show');
    this.Liste.indice = indice;
    this.Liste.etatAchange = false;
    this.Liste.nouveauEtat = this.Liste.liste[indice].idEtat;
    let that = this;
    let fileQuery = new FileModel();
    fileQuery.id_files = this.Liste.liste[this.Liste.indice].reference;
    let observ = this.fileService.readQuery(fileQuery).subscribe(data => {
      if (data.success) {
        that.Liste.pieces = data.msg;
      }
      else{
        that.toast.error(data.msg);
      }
      observ.unsubscribe();
    });
  }

  etatDmdChange(){
    if (this.Liste.nouveauEtat != this.Liste.liste[this.Liste.indice].idEtat){
      this.Liste.etatAchange = true;
    }
    else{
      this.Liste.etatAchange = false;
    }
  }

  validerEtatDmdRep(){
  	 if(this.Liste.etatAchange){
      this.Liste.chargeStatutChange = true;
      let that = this;
      let argument = {
        idEtat: this.Liste.nouveauEtat,
        idDmdRep: this.Liste.liste[this.Liste.indice].idDmdRep
      };
      let observ = this.immoService.immoTopic("modifierEtatDmdReparationSecInt", argument, true).subscribe(obs=>{
        console.log("modifierEtatDmdReparationSecInt", obs);
        that.Liste.chargeStatutChange = false;
        if(obs.success){
          that.Liste.etatAchange = false;
          that.Liste.liste[that.Liste.indice].idEtat = that.Liste.nouveauEtat;
          that.toast.success("L'etat de la demande est parfaitement mis à jour");
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }

  fermeDetailRep(){
  	$(this.modalDetailRep.nativeElement).modal('hide');
    this.Liste.pieces = [];
  }

  clickEnregRapport(){
  	this.Sronde.champ.rapport = this.Sronde.champ.rapport.trim();
    if(this.Sronde.champ.rapport != ""){
      this.Sronde.charge = true;
      let that = this;
      let argument = {
      	idAgentSec: 1,
      	rapport: this.Sronde.champ.rapport
      };
      let observ = this.immoService.immoTopic("ajoutRondeAgentSecInt", argument, true).subscribe(obs=>{
        console.log("ajoutRondeAgentSecInt",obs);
        if(obs.success){
          that.toast.success("L'enregistrement du rapport est terminé");
          that.Sronde.champ.rapport = "";
          that.Sronde.pieceNom = "Parcourir mon ordinateur";
          let reference = "sec-ronde-"+obs.msg.idRonde;
          that.enregistreFichiers(that.Sronde.pieceFichier, reference);
          that.Sronde.pieceFichier = [];
        }
        else{
          that.toast.error(obs.msg);
        }
        that.Sronde.charge = false;
        observ.unsubscribe();
      });
    }
    else{
      this.toast.error("Le rapport est vide");
    }
  }

  filtreRapChange(){
    this.Lronde.page = 1;
    this.listeRonde();
  }

  listeRonde(){
    this.Lronde.charge = true;
    let that = this;
    let argument = {
      pagination: this.Lronde.page,
      filtre: this.Lronde.filtre
    };
    let observ = this.immoService.immoTopic("listeRondeAgentSecInt", argument, true).subscribe(obs=>{
      console.log("listeRondeAgentSecInt",obs);
      if(obs.success){
        that.Lronde.liste = obs.msg;
      }
      that.Lronde.charge = false;
      observ.unsubscribe();
    });
  }

  pageRapSuivant(){
    if(!this.Lronde.charge){
      if(this.Lronde.liste.length == this.Lronde.ligneMax){
        this.Lronde.page++;
        this.listeRonde();
      }
    }
  }

  pageRapPrecedent(){
    if(!this.Lronde.charge){
      if(this.Lronde.page > 1){
        this.Lronde.page--;
        this.listeRonde();
      }
    }
  }

  ouvreDetailRap(indice){
    $(this.modalDetailRap.nativeElement).modal('show');
    this.Lronde.indice = indice;
    let that = this;
    let fileQuery = new FileModel();
    fileQuery.id_files = "sec-ronde-"+this.Lronde.liste[indice].idRonde;
    let observ = this.fileService.readQuery(fileQuery).subscribe(data => {
      if (data.success) {
        that.Lronde.pieces = data.msg;
      }
      else{
        that.toast.error(data.msg);
      }
      observ.unsubscribe();
    });
  }

  fermeDetailRap(){
  	$(this.modalDetailRap.nativeElement).modal('hide');
  	this.Lronde.pieces = [];
  }

  avoirEtatDmd(idEtat){
    for(let i=0; i<this.listeEtatDmd.length; i++){
      if(idEtat == this.listeEtatDmd[i].idEtat){
        return this.listeEtatDmd[i].libelle;
      }
    }
    return "";
  }

  /* date: aaaa-mm-jj */
  avoirDate(date){
    let mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    let strs = date.toString().split("-");
    let resultat = "Le "+strs[2]+" "+mois[parseInt(strs[1])-1]+" "+strs[0];
    return resultat;
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
