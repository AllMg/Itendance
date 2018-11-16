import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';
import { InfoService } from '../../services/info/info.service';

declare var $: any;

@Component({
  selector: 'app-immo-art',
  templateUrl: './immo-art.component.html',
  styleUrls: ['./immo-art.component.css']
})
export class ImmoArtComponent implements OnInit {

  @ViewChild('modalChargement') modalChargement;
  @ViewChild('modalAjoutDom') modalAjoutDom;
  @ViewChild('modalAjoutSpe') modalAjoutSpe;
  @ViewChild('modalModifArt') modalModifArt;

  Menu = {
    menu: "article",
    sousMenu: ""
  };

  ligneMax = 15;

  listeDomaine = [];
  listeType = [];
  listeClasse = [];
  listeNature = [];
  listeSpecificite = [];

  Stock = {
    liste: [],
    indice: -1,
    page: 1,
    chargeListe: false,
    chargeModif: false,
    filtre: {
      libelle: "",
      idDomaineArt: 0,
      idTypeArt: 0,
      idClasseArt: 0,
      idNatureArt: 0,
      idSpeArt: 0
    },
    edition: {
      idArticle: -1,
      libelle: "",
      idDomaineArt: 0,
      idTypeArt: 0,
      idClasseArt: 0,
      idNatureArt: 0,
      idSpeArt: 0,
      stock: 0
    }
  };

  Dom = {
    select: "domaine",
    valeur: "",
    attr: "listeDomaine",
    btnTexte: "Ajouter une domaine",
    titreModal: "Ajout d'une Domaine"
  };

  Spe = {
    select: "classe",
    valeurCode: "",
    valeurLibelle: "",
    topicAjout: "ajoutClasseArticleInt",
    attr: "listeClasse",
    btnTexte: "Ajouter une Classe",
    titre: "Classe",
    tailleTexte: 2
  };

  Hist = {
    codeArticle: {
      idCodeArt: "",
      refArticle: "",
      marque: "",
      reference: ""
    },
    article: {
      libelle: ""
    },
    reference: "",
    marque: "",
    listeDetention: []
  };

  Maj = {
    codeArticle: {
      idCodeArt: "",
      refArticle: "",
      prix: 0,
      reference: "",
      imputation: ""
    },
    article: {
      libelle: ""
    },
    refService: 0,
    refIndividu: "",
    typeMaj: "transfert",
    typeDet: "DOTATION"
  };

  constructor(
    private router: Router, 
    private toast: ToastrService,
    private immoService: ImmoService,
    private infoService: InfoService) {
  }

  ngOnInit() {
    console.log("INIT IMMO ARTICLE");
    let that = this;
    this.immoService.immoTopic("listeUtilesArtInt", "", false).subscribe(obs=>{
      if(obs.success){
        that.listeDomaine = obs.msg.domaineArt;
        that.listeType = obs.msg.typeArt
        that.listeClasse = obs.msg.classeArt;
        that.listeNature = obs.msg.natureArt;
        that.listeSpecificite = obs.msg.specArt;
      }
    });
  }

  ngOnDestroy(){
    console.log("DESTROYED IMMO ARTICLE");
    this.Stock = null;
    this.Dom = null;
    this.Spe = null;
    this.Hist = null;
    this.Maj = null;
    this.listeDomaine = null;
    this.listeClasse = null;
    this.listeType = null;
    this.listeNature = null;
    this.listeSpecificite = null;
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nom){
    this.Menu.sousMenu = nom;
    if(nom == "art_stock"){
      if(this.Stock.liste.length == 0){
        this.listeStock();
      }
    }
    /*if(nom == "art_hist"){
      if(this.Hist.listeService.length == 0){
        
      }
    }*/
  }

  listeStock(){
    this.Stock.chargeListe = true;
    let that = this;
    let argument = {
      filtre: this.Stock.filtre,
      pagination: this.Stock.page
    };
    //let observ = this.immoService.immoTopic("listeArticleInt", argument, true).subscribe(obs=>{
    let observ = this.immoService.listeArticleInt(argument).subscribe(obs=>{
      if(obs.success){
        that.Stock.liste = obs.msg;
      }
      else{
        that.toast.error(obs.msg);
      }
      that.Stock.chargeListe = false;
      console.log("listeArticleInt",obs);
      observ.unsubscribe();
    });
  }

  filtreChange(){
    this.Stock.page = 1;
    this.Stock.filtre.libelle = this.Stock.filtre.libelle.toUpperCase();
    this.listeStock();
  }

  pagePrecedent(){
    if(!this.Stock.chargeListe){
      if(this.Stock.page > 1){
        this.Stock.page--;
        this.listeStock();
      }
    }
  }

  pageSuivant(){
    if(!this.Stock.chargeListe){
      if(this.Stock.liste.length == this.ligneMax){
        this.Stock.page++;
        this.listeStock();
      }
    }
  }

  avoirLibelleParId(nomAttr, nomId, id){
    for(let i=0; i<this[nomAttr].length; i++){
      if(this[nomAttr][i][nomId] == id){
        return this[nomAttr][i].libelle;
      }
    }
    return '-';
  }

  avoirCaractParId(nomAttr, nomId, id){
    for(let i=0; i<this[nomAttr].length; i++){
      if(this[nomAttr][i][nomId] == id){
        return this[nomAttr][i];
      }
    }
    return '-';
  }

  avoirCode(article){
    if(article.id_classe_art > 1){
      let classe = this.avoirCaractParId("listeClasse", "idClasseArt", article.idClasseArt).codeClasse;
      let nature = this.avoirCaractParId("listeNature", "idNatureArt", article.idNatureArt).codeNature;
      let spe = this.avoirCaractParId("listeSpecificite", "idSpeArt", article.idSpeArt).codeSpe;
      return classe+nature+spe;
    }
    else{
      return "-";
    }
  }

  domValeurChange(){
    if(this.Dom.select == "domaine"){
      this.Dom.btnTexte = "Ajouter une domaine";
      this.Dom.titreModal = "Ajout d'une Domaine";
      this.Dom.attr = "listeDomaine";
    }
    else{
      this.Dom.btnTexte = "Ajouter un type"
      this.Dom.titreModal = "Ajout d'un Type";
      this.Dom.attr = "listeType";
    }
  }

  speValeurChange(){
    this.Spe.tailleTexte = 2;
    if(this.Spe.select == "classe"){
      this.Spe.btnTexte = "Ajouter une Classe";
      this.Spe.titre = "Classe";
      this.Spe.attr = "listeClasse";
      this.Spe.topicAjout = "ajoutClasseArticleInt";
    }
    else if(this.Spe.select == "nature"){
      this.Spe.btnTexte = "Ajouter une Nature";
      this.Spe.titre = "Nature";
      this.Spe.attr = "listeNature";
      this.Spe.topicAjout = "ajoutNatureArticleInt";
    }
    else{
      this.Spe.btnTexte = "Ajouter une Spécificité";
      this.Spe.titre = "Spécificité";
      this.Spe.attr = "listeSpecificite";
      this.Spe.topicAjout = "ajoutSpecificiteArticleInt";
      this.Spe.tailleTexte = 3;
    }
  }

  ouvreAjoutDom(){
    this.Dom.valeur = "";
    $(this.modalAjoutDom.nativeElement).modal('show');
  }

  ajouterDom(){
    this.fermeAjoutDom();
    let argument = this.Dom.valeur.trim().toUpperCase();
    let that = this;
    let fonction = "ajoutDomaineArticleInt";
    if(this.Dom.select == "type"){
      fonction = "ajoutTypeArticleInt";
    }
    let existe = false;
    for(let i=0; i<this[this.Dom.attr].length; i++){
      if(this[this.Dom.attr].libelle == argument){
        existe = true;
        break;
      }
    }
    if(!existe){
      this.immoService.immoTopic(fonction, argument, false).subscribe(obs=>{
        if(obs.success){
          console.log(obs.msg);
          that[that.Dom.attr].push(obs.msg);
        }
        else{
          that.toast.error(obs.msg);
        }
      });
    }
    else{
      this.toast.error("Cette valeur existe déjà");
    }
  }

  fermeAjoutDom(){
    $(this.modalAjoutDom.nativeElement).modal('hide');
  }

  ouvreAjoutSpe(){
    this.Spe.valeurCode = "";
    this.Spe.valeurLibelle = "";
    $(this.modalAjoutSpe.nativeElement).modal('show');
  }

  ajouterSpe(){
    this.fermeAjoutSpe();
    let code = this.Spe.valeurCode.trim().toUpperCase();
    let libelle = this.Spe.valeurLibelle.trim().toUpperCase();
    let existe = false;
    let that = this;
    for(let i=0; i<this[this.Spe.attr].length; i++){
      if(this[this.Spe.attr].code == code && this[this.Spe.attr].libelle == libelle){
        existe = true;
      }
    }
    if(!existe){
      if(code != "" && libelle != ""){
        let argument = {libelle: libelle};
        if(this.Spe.select == "classe"){
          argument["codeClasse"] = code;
        }
        else if(this.Spe.select == "nature"){
          argument["codeNature"] = code;
        }
        else{
          argument["codeSpe"] = code;
        }
        this.immoService.immoTopic(this.Spe.topicAjout, argument, true).subscribe(obs=>{
          if(obs.success){
            that[that.Spe.attr].push(obs.msg);
          }
          else{
            that.toast.error(obs.msg);
          }
        });
      }
      else{
        this.toast.error("Valeur invalide");
      }
    }
    else{
      this.toast.error("Cette valeur existe déjà");
    }
  }

  fermeAjoutSpe(){
    $(this.modalAjoutSpe.nativeElement).modal('hide');
  }

  ouvreModifArt(indice){
    $(this.modalModifArt.nativeElement).modal('show');
    this.Stock.indice = indice;
    this.Stock.edition.idArticle = this.Stock.liste[indice].idArticle;
    this.Stock.edition.libelle = this.Stock.liste[indice].libelle;
    this.Stock.edition.stock = this.Stock.liste[indice].stock;
    this.Stock.edition.idDomaineArt = this.Stock.liste[indice].idDomaineArt;
    this.Stock.edition.idTypeArt = this.Stock.liste[indice].idTypeArt;
    this.Stock.edition.idClasseArt = this.Stock.liste[indice].idClasseArt;
    this.Stock.edition.idNatureArt = this.Stock.liste[indice].idNatureArt;
    this.Stock.edition.idSpeArt = this.Stock.liste[indice].idSpeArt;
  }

  modifierArticle(){
    this.Stock.edition.libelle.trim().toUpperCase();
    this.Stock.edition.stock = parseInt(this.Stock.edition.stock.toString());
    if(this.Stock.edition.libelle == ""){
      this.toast.error("Libellé d'article invalide");
    }
    else{
      if(this.Stock.edition.stock >= 0){
        this.Stock.chargeModif = true;
        let that = this;
        let observ = this.immoService.immoTopic("modifierArticleInt", this.Stock.edition, true).subscribe(obs=>{
          if(obs.success){
            that.toast.success("Modification terminé");
            that.Stock.liste[that.Stock.indice] = that.Stock.edition;
          }
          else{
            that.toast.error(obs.msg);
          }
          that.Stock.chargeModif = false;
          observ.unsubscribe();
        });
      }
    }
  }

  fermeModifArt(){
    $(this.modalModifArt.nativeElement).modal('hide');
  }

  afficheChargement(){
    $(this.modalChargement.nativeElement).modal("show");
  }

  fermeChargement(){
    $(this.modalChargement.nativeElement).modal('hide');
  }

  chargerHistArt(){
    this.Hist.codeArticle.idCodeArt = this.Hist.codeArticle.idCodeArt.trim().toUpperCase();
    if(this.Hist.codeArticle.idCodeArt != "" && this.Hist.codeArticle.idCodeArt.length > 7){
      this.afficheChargement();
      let that = this;
      let observ = this.immoService.immoTopic("histDetentionArticleInt", this.Hist.codeArticle.idCodeArt, false).subscribe(obs=>{
        if(obs.success){
          if(obs.msg.codeArticle == undefined){
            that.fermeChargement();
            that.toast.error("Ce code article n'existe pas");
          }
          else{
            that.Hist.codeArticle = obs.msg.codeArticle;
            that.Hist.listeDetention = obs.msg.detention;
            for(let i=0; i<that.Hist.listeDetention.length; i++){
              let indice = i;
              that.immoService.getByIdRefDrhService(that.Hist.listeDetention[i].refService).subscribe(obss=>{
                console.log("getByIdRefDrhService", obss);
                if(obss.success){
                  that.Hist.listeDetention[indice]["libelleService"] = obss.libelle_service;
                }
              });
            }
            let observ1 = that.immoService.immoTopic("detailsArticleInt", that.Hist.codeArticle.refArticle, false).subscribe(obs1=>{
              that.fermeChargement();
              if(obs1.success){
                that.Hist.article = obs1.msg;
              }
              else{
                that.toast.error(obs1.msg);
              }
              observ1.unsubscribe();
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
    else{
      this.toast.error("Le code article est invalide");
    }
  }

  chargerCodeArt(){
    this.Maj.codeArticle.idCodeArt = this.Maj.codeArticle.idCodeArt.trim().toUpperCase();
    if(this.Maj.codeArticle.idCodeArt != "" && this.Maj.codeArticle.idCodeArt.length > 7){
      this.afficheChargement();
      let that = this;
      console.log("detailsCodeArticleInt");
      let observ = this.immoService.immoTopic("detailsCodeArticleInt", this.Maj.codeArticle.idCodeArt, false).subscribe(obs=>{
        if(obs.success){
          that.Maj.codeArticle = obs.msg;
          let observ1 = that.immoService.immoTopic("detailsArticleInt", that.Maj.codeArticle.refArticle, false).subscribe(obs1=>{
            if(obs1.success){
              that.Maj.article = obs1.msg;
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
    else{
      this.toast.error("Le code article est invalide");
    }
  }

  enregistrerMaj(){
    if(this.Maj.codeArticle.refArticle != ""){
      if(this.Maj.typeMaj == "transfert"){
        this.effectuerTransfert();
      }
      else if(this.Maj.typeMaj == "retour"){
        this.effectuerRetourEnStock();
      }
    }
  }

  effectuerTransfert(){
    if(this.Maj.refService > 0 && this.Maj.refIndividu != ""){
      this.afficheChargement();
      let argument = {
        idCodeArt: this.Maj.codeArticle.idCodeArt,
        refService: this.Maj.refService,
        refIndividu: this.Maj.refIndividu,
        typeDet: this.Maj.typeDet
      };
      let that = this;
      let observ0 = this.infoService.infoIndiv(this.Maj.refIndividu).subscribe(obs0=>{
        console.log(obs0);
        if(obs0.success){
          let observ = this.immoService.immoTopic("", argument, true).subscribe(obs=>{
            that.fermeChargement();
            if(obs.success){
              that.toast.success("Mise à jour terminé");
              this.Maj = {
                codeArticle: {
                  idCodeArt: "",
                  refArticle: "",
                  prix: 0,
                  reference: "",
                  imputation: ""
                },
                article: {
                  libelle: ""
                },
                refService: 0,
                refIndividu: "",
                typeMaj: "transfert",
                typeDet: "DOTATION"
              };
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
    else{
      this.toast.error("Veuillez spécifier le détenteur");
    }
  }

  effectuerRetourEnStock(){
    this.afficheChargement();
    let that = this;
    let observ = this.immoService.immoTopic("", this.Maj.codeArticle.idCodeArt, true).subscribe(obs=>{
      that.fermeChargement();
      if(obs.success){
        that.toast.success("Mise à jour terminé");
        that.Maj = {
          codeArticle: {
            idCodeArt: "",
            refArticle: "",
            prix: 0,
            reference: "",
            imputation: ""
          },
          article: {
            libelle: ""
          },
          refService: 0,
          refIndividu: "",
          typeMaj: "transfert",
          typeDet: "DOTATION"
        };
      }
      else{
        that.toast.error(obs.msg);
      }
      observ.unsubscribe();
    });
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
