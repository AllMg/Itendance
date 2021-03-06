import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';
import { FileService } from '../../services/file/file.service';
import { BudgetService } from '../../services/budget/budget.service';

declare var $: any;

@Component({
  selector: 'app-immo-dmd',
  templateUrl: './immo-dmd.component.html',
  styleUrls: ['./immo-dmd.component.css']
})
export class ImmoDmdComponent implements OnInit {

  @ViewChild('art_table') art_table:ElementRef;
  @ViewChild('modalAjoutSpe') modalAjoutSpe:ElementRef;
	@ViewChild('modalAjoutSite') modalAjoutSite;

  Utilisateur:any;

  Menu = {
    menu: "demande",
    sousMenu: ""
  };

  Individu = {
    idIndividu: null,
    codeService: null
  };

  DmdMob = {
    reference: "",
    articles: [{refArticle: "", quantite: 1, typeDmd: null, dateDeBesoin: null, dateFinBesoin: null}],
    observation: "",
    loader: false,
    articleOptions: [],
    articleControls: [new FormControl()],
    /* ilaina ity mba anasorana ny class par défaut */
    utiliseClass: false
  };

  DmdRepMob = {
    reference: "",
    article: "",
    motif: "",
    pieceNom: "Parcourir mon ordinateur",
    pieceFichier: [],
    loader: false,
    articleOptions: [],
    articleControl: new FormControl(),
    utiliseClass: false
  };

  DmdEntrBat = {
    reference: "",
    site: "",
    type: "",
    caracteristique: "",
    enumeration: "",
    observation: "",
    pieceNom: "Parcourir mon ordinateur",
    pieceFichier: [],
    loader: false,
    ngxSite: [],
    listeType: [],
    listeCaract: [],
    listeEnum: []
  };

  Ajout = {
    titre: "",
    libelle: "",
    nomAttrA: "", // manondro ny attribut ny liste ny type na caract na enum ny DmdEntrBat (array)
    nomAttrS: "", // manondro ny attibut ny ngModel ny select ny DmdEntrBat (id)
    nomId: "",
    topic: "",
    valeur: ""
  };

	Site = {
		chargeModal: false,
		provinces: [],
		regions: [],
		champ: {
			idProv: "",
			idReg: "",
			libelleCommune: "",
			libelleLoc: ""
		},
		fComControl: new FormControl(),
		comOptions: []
	};

  constructor(
    private router: Router, 
    private toastr: ToastrService, 
    private fileService: FileService,
    private budgetService: BudgetService,
    private immoService: ImmoService) {

    let that = this;
    let observ = this.immoService.immoTopic("listeTypeEntrBatInt", "", false).subscribe(obs1=>{
      if(obs1.success){
        that.trieParLibelle(obs1.msg);
        that.DmdEntrBat.listeType = obs1.msg;
      }
      console.log("listeTypeEntrBatInt", obs1);
      observ.unsubscribe();
      observ = this.immoService.immoTopic("listeCaractEntrBatInt", "", false).subscribe(obs2=>{
        if(obs2.success){
          that.trieParLibelle(obs2.msg);
          that.DmdEntrBat.listeCaract = obs2.msg;
        }
        console.log("listeCaractEntrBatInt", obs2);
        observ.unsubscribe();
        observ = this.immoService.immoTopic("listeEnumEntrBatInt", "", false).subscribe(obs3=>{
          if(obs3.success){
            that.trieParLibelle(obs3.msg);
            that.DmdEntrBat.listeEnum = obs3.msg;
          }
          console.log("listeEnumEntrBatInt", obs3);
          observ.unsubscribe();
        });
      });
    });

    this.Site.fComControl.valueChanges.subscribe(term => {
			term = term.toString().trim();
			if (term.length >= 3) {
				let observ = that.immoService.immoTopic("rechercheCommuneInt", term, false).subscribe(obs => {
					console.log("rechercheCommuneInt", obs);
					if (obs.success) {
						let liste = [];
						for (let i = 0; i < obs.msg.length; i++) {
							liste.push(obs.msg[i].libelle);
						}
						that.Site.comOptions = liste;
					}
					observ.unsubscribe();
				});
			}
			else {
				that.Site.comOptions = [];
			}
		});
  }

  ngOnInit() {
    let that = this;
    this.DmdMob.articleControls[0].valueChanges.subscribe(term => {
      term = term.toString().trim();
      if (term.length >= 3) {
        let observ = that.immoService.immoTopic("rechercheArticleInt", term, false).subscribe(obs=>{
          if(obs.success){
            that.DmdMob.articleOptions = obs.msg;
          }
          observ.unsubscribe();
        });
      }
      else{
        that.DmdMob.articleOptions = [];
      }
    });
    this.DmdRepMob.articleControl.valueChanges.subscribe(term=>{
      term = term.toString().trim();
      if (term.length >= 3) {
        let observ = that.immoService.immoTopic("rechercheArticleInt", term, false).subscribe(obs=>{
          if(obs.success){
            that.DmdRepMob.articleOptions = obs.msg;
          }
          observ.unsubscribe();
        });
      }
      else{
        that.DmdRepMob.articleOptions = [];
      }
    });
  }

  initIndividu(){
    let utilisateur = JSON.parse(localStorage.getItem('user'));
    let that = this;
    let observ = this.budgetService.getServiceDirection(utilisateur.id_acces).subscribe(obs=>{
      console.log("Utilisateur", obs);
      if(obs.success && obs.msg.length > 0){
        that.Individu.idIndividu = utilisateur.id_acces;
        that.Individu.codeService = obs.msg[0].code_service.code_service;
      }
      observ.unsubscribe();
    });
  }

  ngOnDestroy(){
    console.log("DESTROYED IMMO DMD");
    this.DmdRepMob = null;
    this.DmdEntrBat = null;
    this.DmdMob = null;
    this.Ajout = null;
  }

  trieParLibelle(array){
    array.sort((a, b)=>{
      if(a.libelle > b.libelle){
        return 1;
      }
      else if(a.libelle < b.libelle){
        return -1
      }
      return 0;
    });
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nomSection, nomAttr){
    this.Menu.sousMenu = nomSection;
    if(this[nomAttr].reference == ""){
      let that = this;
      let argument = {
        prestation: this.Individu.codeService,
        dr: "42"
      };
      let observ = this.immoService.immoTopic("referenceDmdArticleInt", argument, true).subscribe(obs=>{
        if(obs.success){
          that[nomAttr].reference = obs.msg;
        }
        else{
          that.toastr.error(obs.msg);
        }
        console.log("referenceDmdArticleInt", obs);
        observ.unsubscribe();
      });
    }
  }

  clickPlusArticle(){
    this.DmdMob.articles.push({refArticle: "", quantite: 1, typeDmd: null, dateDeBesoin: null, dateFinBesoin: null});
    let that = this;
    let formControl = new FormControl();
    formControl.valueChanges.subscribe(term => {
      term = term.toString().trim();
      if (term.length >= 3) {
        let observ = that.immoService.immoTopic("rechercheArticleInt", term, false).subscribe(obs=>{
          if(obs.success){
            that.DmdMob.articleOptions = obs.msg;
          }
          observ.unsubscribe();
        });
      }
      else{
        that.DmdMob.articleOptions = [];
      }
    });
    this.DmdMob.articleControls.push(formControl);
  }

  effaceChampArticle(index){
    this.DmdMob.articles.splice(index, 1);
    this.DmdMob.articleControls.splice(index, 1);
  }

  articlesSontBon(articles){
    for(let i=0; i<articles.length; i++){
      articles[i].refArticle = articles[i].refArticle.trim();
      if(articles[i].refArticle == ""){
        this.toastr.error("Une désignation est nécessaire");
        return false;
      }
      if(articles[i].quantite <= 0){
        this.toastr.error("La quantité est invalide");
        return false;
      }
      if(articles[i].typeDmd == "PRET"){
        if(articles[i].dateDeBesoin == null || articles[i].dateFinBesoin == null){
          this.toastr.error("Il faut préciser les dates");
          return false;
        }
        let dateDeBesoin = new Date(articles[i].dateDeBesoin);
        let dateFinBesoin = new Date(articles[i].dateFinBesoin);
        if(dateDeBesoin > dateFinBesoin){
          this.toastr.error("La date de début est supérieur à la date de fin");
          return false;
        }
      }
      else if(articles[i].typeDmd == null){
        this.toastr.error("Il faut préciser le type de détention");
        return false;
      }
    }
    return true;
  }

  avoirTableauArticle(articles){
    let tableau = [];
    for(let i in articles){
      tableau.push(articles[i].refArticle.toUpperCase());
    }
    return tableau;
  }

  clickEnregDmdMob(){
    if(this.DmdMob.reference != ""){
      if(this.articlesSontBon(this.DmdMob.articles)){
        this.DmdMob.loader = true;  
        let articlesNoms = this.avoirTableauArticle(this.DmdMob.articles);
        let that = this;
        let observ = this.immoService.immoTopic("verificationArticleInt", articlesNoms, true).subscribe(obs=>{
          if(obs.success){
            for(let i in obs.msg){
              that.DmdMob.articles[i].refArticle = obs.msg[i];
            }
            let argument = {
              refIndividu: this.Individu.idIndividu,
              refService: this.Individu.codeService,
              reference: that.DmdMob.reference,
              article: that.DmdMob.articles,
              observation: that.DmdMob.observation
            };
            
            let observ1 = that.immoService.immoTopic("ajoutDmdImmoInt", argument, true).subscribe(obs=>{
              if(obs.success){
                that.toastr.success("L'enregistrement est réussi");
                that.DmdMob.reference = "";
                that.DmdMob.articles = [{refArticle: "", quantite: 1, typeDmd: null, dateDeBesoin: null, dateFinBesoin: null}];
                that.DmdMob.articleControls = [new FormControl()];
                that.DmdMob.observation = "";
              }
              else{
                that.toastr.error(obs.msg);
              }
              that.DmdMob.loader = false;
              observ1.unsubscribe();
            });
          }
          else{
            that.toastr.error(obs.msg);
            that.DmdMob.loader = false;  
          }
          observ.unsubscribe();
        });
      }
    }
    else{
      this.toastr.error("La demande n'a pas de référence");
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
          this.toastr.error("Le fichier doit être une image");
        }
      }
      else{
        this.toastr.error("Le fichier est trop volumineux");
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
          name: "piece justificative"//fichiers[index].name
        };
        let observ = that.fileService.save(fichier).subscribe(obs=>{
          if(!obs.success){
            that.toastr.error("L'enregistrement du fichier "+fichier.name+" a échoué");
          }
          observ.unsubscribe();
        });
      };
      filereader.readAsDataURL(fichiers[index]);
    }
  }

  clickEnregDmdRepMob(){
    if(this.DmdRepMob.reference){
      this.DmdRepMob.loader = true;
      let argument = {
        refIndividu: this.Individu.idIndividu,
        refService: this.Individu.codeService,
        reference: this.DmdRepMob.reference,
        nomArticle: this.DmdRepMob.article.toUpperCase().trim(),
        motif: this.DmdRepMob.motif.trim()
      };
      if(argument.nomArticle != ""){
        let that = this;
        let observ = this.immoService.immoTopic("ajoutDmdReparationInt", argument, true).subscribe(obs=>{
          if(obs.success){
            that.toastr.success("L'enregistrement de la demande est réussie");
            that.DmdRepMob.reference = "";
            that.DmdRepMob.article = "";
            that.DmdRepMob.motif = "";
            that.DmdRepMob.pieceNom = "Parcourir mon ordinateur";
            that.enregistreFichiers(that.DmdRepMob.pieceFichier, argument.reference);
            that.DmdRepMob.pieceFichier = [];
          }
          else{
            that.toastr.error(obs.msg);
          }
          that.DmdRepMob.loader = false;
          observ.unsubscribe();
        });
      }
      else{
        this.toastr.error("L'article n'est pas précisée");
      }
    }
    else{
      this.toastr.error("La demande n'a pas de référence");
    }
  }

  clickAjoutSpe(titre, libelle, nomAttrA, nomAttrS, nomID, topic){
    this.Ajout.titre = titre;
    this.Ajout.libelle = libelle;
    this.Ajout.nomAttrA = nomAttrA;
    this.Ajout.nomAttrS = nomAttrS;
    this.Ajout.nomId = nomID;
    this.Ajout.valeur = "";
    this.Ajout.topic = topic;
    $(this.modalAjoutSpe.nativeElement).modal('show');
  }

  ajouterSpe(){
    $(this.modalAjoutSpe.nativeElement).modal('hide');
    this.Ajout.valeur = this.Ajout.valeur.trim();
    if(this.Ajout.valeur != ""){
      let existe = false;
      let that = this;
      for(let i=0; i<this.DmdEntrBat[this.Ajout.nomAttrA].length; i++){
        if(this.DmdEntrBat[this.Ajout.nomAttrA][i].libelle == this.Ajout.valeur){
          existe = true;
          break;
        }
      }
      if(existe){
        this.toastr.error("Cette valeur existe déjà");
      }
      else{
        let argument = {
          libelle: this.Ajout.valeur.toUpperCase()
        };
        let observ = this.immoService.immoTopic(this.Ajout.topic, argument, true).subscribe(obs=>{
          if(obs.success){
            that.Ajout.valeur = "";
            that.DmdEntrBat[that.Ajout.nomAttrA].push(obs.msg);
            that.DmdEntrBat[that.Ajout.nomAttrS] = obs.msg[that.Ajout.nomId];
          }
          else{
            that.toastr.error(obs.msg);
          }
          observ.unsubscribe();
        });
      }
    }
  }

  fermeAjoutSpe(){
    $(this.modalAjoutSpe.nativeElement).modal('hide');
  }

  clickEnregDmdEntrBat(){
    if(this.DmdEntrBat.reference != ""){
      this.DmdEntrBat.loader = true;
      let argument = {
        refIndividu: this.Individu.idIndividu,
        refService: this.Individu.codeService,
        reference: this.DmdEntrBat.reference,
        refSite: 22, //refSite: this.DmdEntrBat.site,
        idTypeEntrBat: this.DmdEntrBat.type,
        idCaractEntrBat: this.DmdEntrBat.caracteristique,
        idEnumEntrBat: this.DmdEntrBat.enumeration,
        motif: this.DmdEntrBat.observation.trim()
      };
      let that = this;
      let observ = this.immoService.immoTopic("ajoutDmdEntrBatInt", argument, true).subscribe(obs=>{
        if(obs.success){
          this.toastr.success("La demande est enregistrée");
          that.DmdEntrBat.reference = "";
          that.DmdEntrBat.site = "";
          that.DmdEntrBat.type = "";
          that.DmdEntrBat.caracteristique = "";
          that.DmdEntrBat.enumeration = "";
          that.DmdEntrBat.observation = "";
          that.DmdEntrBat.pieceNom = "Parcourir mon ordinateur";
          that.enregistreFichiers(that.DmdEntrBat.pieceFichier, argument.reference);
          that.DmdEntrBat.pieceFichier = [];
        }
        else{
          this.toastr.error(obs.msg);
        }
        this.DmdEntrBat.loader = false;
        observ.unsubscribe();
      });
    }
    else{
      this.toastr.error("La demande n'a pas de référence");
    }
  }

	ouvreModalSite() {
		$(this.modalAjoutSite.nativeElement).modal("show");
		if (this.Site.provinces.length == 0) {
			let that = this;
			let observ = this.immoService.immoTopic("listeProvinceInt", "", false).subscribe(obs => {
				if (obs.success) {
					that.Site.provinces = obs.msg;
				}
				observ.unsubscribe();
			});
		}
	}

	ngxTexteSiteChange(texte: string) {
		texte = texte.trim();
		this.DmdEntrBat.ngxSite = [];
		if (texte.length > 2) {
			let that = this;
			let observ = this.immoService.immoTopic("rechercheLocalisationInt", texte, false).subscribe(obs => {
				console.log("rechercheLocalisationInt", obs);
				if (obs.success) {
					let liste = [];
					for (let i = 0; i < obs.msg.length; i++) {
						liste.push({ id: obs.msg[i].idLoc, text: obs.msg[i].libelle });
					}
					that.DmdEntrBat.ngxSite = liste;
				}
				observ.unsubscribe();
			});
		}
	}

	champSiteBon() {
		this.Site.champ.libelleCommune = this.Site.champ.libelleCommune.trim();
		this.Site.champ.libelleLoc = this.Site.champ.libelleLoc.trim();
		if (this.Site.champ.idProv == "") {
			return { estBon: false, msg: "Veuillez choisir une province" };
		}
		if (this.Site.champ.idReg == "") {
			return { estBon: false, msg: "Veuillez choisir une région" };
		}
		if (this.Site.champ.libelleCommune == "") {
			return { estBon: false, msg: "Commune invalide" };
		}
		if (this.Site.champ.libelleLoc == "") {
			return { estBon: false, msg: "L'indication de la localisation est invalide" };
		}
		return { estBon: true, msg: null };
	}

	enregistreSite() {
		let verif = this.champSiteBon();
		if (!verif.estBon) {
			this.toastr.error(verif.msg);
		}
		else {
			this.Site.chargeModal = true;
			let that = this;
			let observ = this.immoService.immoTopic("ajoutLocalisationInt", this.Site.champ, true).subscribe(obs => {
				console.log("ajoutLocalisationInt",obs);
				if (obs.success) {
					if (obs.msg != null) {
						let nouvSite = obs.msg;
						that.DmdEntrBat.ngxSite = [{ id: nouvSite.idLoc, text: nouvSite.libelle }];
						that.DmdEntrBat.site = nouvSite.idLoc;
						that.fermeModalSite();
						that.Site.champ.libelleCommune = "";
						that.Site.champ.libelleLoc = "";
					}
					else {
						that.toastr.error("Erreur du serveur");
					}
				}
				else {
					that.toastr.error(obs.msg);
				}
				this.Site.chargeModal = false;
				observ.unsubscribe();
			});
		}
	}

	fermeModalSite() {
		$(this.modalAjoutSite.nativeElement).modal("hide");
	}

}
