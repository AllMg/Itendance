import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';

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

  listeDomaine = [];
  listeType = [];
  listeClasse = [];
  listeNature = [];
  listeSpecificite = [];

  Stock = {
    liste: [{libelle: "ARTICLE", id_article: 1, stock: 2, id_domaine_art: 0, id_type_art: 0, id_classe_art: 0, id_nature_art: 0, id_spe_art: 0}],
    filtre: {
      article: "",
      domaine: 0,
      type: 0,
      classe: 0,
      nature: 0,
      spe: 0
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
    topicAjout: "ajouterClasseArtInt",
    attr: "listeClasse",
    btnTexte: "Ajouter une Classe",
    titre: "Classe",
    tailleTexte: 2
  };

  Hist = {
    codeArtcile: "",
    designation: "",
    classe: "",
    reference: "",
    marque: "",
    listeHist: [],
    listeService: []
  };

  constructor(
    private router: Router, 
    private toast: ToastrService,
    private immoService: ImmoService) {
    /*let that = this;
    this.immoService.immoTopic("avoirListeDomaine", "").subscribe(obs=>{
      if(obs.success){
        that.listeDomaine = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeType", "").subscribe(obs=>{
      if(obs.success){
        that.listeType = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeClasse", "").subscribe(obs=>{
      if(obs.success){
        that.listeClasse = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeNature", "").subscribe(obs=>{
      if(obs.success){
        that.listeNature = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeSpecificite", "").subscribe(obs=>{
      if(obs.success){
        that.listeSpecificite = obs.msg;
      }
    });*/
  }

  ngOnInit() {
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nom){
    this.Menu.sousMenu = nom;
    let that = this;
    /*if(nom == "art_stock"){
      if(this.Stock.liste.length == 0){
        this.immoService.immoTopic("avoirListeStock", "").subscribe(obs=>{
          if(obs.success){
            that.Stock.liste = obs.msg;
          }
          else{
            that.toast.error(obs.msg);
          }
        });
      }
    }
    if(nom == "art_hist"){
      if(this.Hist.listeService.length == 0){
        
      }
    }*/
  }

  filtreChange(){
    let that = this;
    this.immoService.immoTopic("", "", true).subscribe(obs=>{
      if(obs.success){
        that.Stock.liste = obs.msg;
      }
    });
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
      let classe = this.avoirCaractParId("listeClasse", "id_classe_art", article.id_classe_art).code_classe;
      let nature = this.avoirCaractParId("listeNature", "id_nature_art", article.id_nature_art).code_nature;
      let spe = this.avoirCaractParId("listeSpecificite", "id_spe_art", article.id_spe_art).code_spe;
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
      this.Spe.topicAjout = "ajouterClasseArtInt";
    }
    else if(this.Spe.select == "nature"){
      this.Spe.btnTexte = "Ajouter une Nature";
      this.Spe.titre = "Nature";
      this.Spe.attr = "listeNature";
      this.Spe.topicAjout = "ajouterNatureArtInt";
    }
    else{
      this.Spe.btnTexte = "Ajouter une Spécificité";
      this.Spe.titre = "Spécificité";
      this.Spe.attr = "listeSpecificite";
      this.Spe.topicAjout = "ajouterSpeArtInt";
      this.Spe.tailleTexte = 3;
    }
  }

  ouvreAjoutDom(){
    this.Dom.valeur = "";
    $(this.modalAjoutDom.nativeElement).modal('show');
  }

  ajouterDom(){
    this.fermeAjoutDom();
    let argument = this.Dom.valeur.trim();
    let that = this;
    let fonction = "ajouterDomaineArtInt";
    if(this.Dom.select == "type"){
      fonction = "ajouterTypeArtInt";
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
    let code = this.Spe.valeurCode.trim();
    let libelle = this.Spe.valeurLibelle.trim();
    let existe = false;
    let that = this;
    for(let i=0; i<this[this.Spe.attr].length; i++){
      if(this[this.Spe.attr].code == code && this[this.Spe.attr].libelle == libelle){
        existe = true;
      }
    }
    if(!existe){
      this.immoService.immoTopic(this.Spe.topicAjout, {code: code, libelle: libelle}, true).subscribe(obs=>{
        if(obs.success){
          that[that.Spe.attr].push(obs.msg);
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

  fermeAjoutSpe(){
    $(this.modalAjoutSpe.nativeElement).modal('hide');
  }

  ouvreModifArt(){
    $(this.modalModifArt.nativeElement).modal('show');
  }

  fermeModifArt(){
    $(this.modalModifArt.nativeElement).modal('hide');
  }

  afficheChargement(){
    $(this.modalChargement.nativeElement).modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  fermeChargement(){
    $(this.modalChargement.nativeElement).modal('hide');
  }

  chargerHistArt(){

  }

}
