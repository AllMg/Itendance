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
      specificite: 0
    }
  };

  Dom = {
    valeur: "domaine",
    btnTexte: "Ajouter une domaine",
    titreModal: "Ajout d'une Domaine"
  };

  Spe = {
    valeur: "classe",
    btnTexte: "Ajouter une Classe",
    titre: "Classe"
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
    /*if(nom == "art_stock"){
      if(this.Stock.liste.length == 0){
        let that = this;
        this.immoService.immoTopic("avoirListeStock", "").subscribe(obs=>{
          if(obs.success){
            that.Stock.liste = obs.msg;
          }
          else{
            that.toast.error(obs.msg);
          }
        });
      }
    }*/
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
    if(this.Dom.valeur == "domaine"){
      this.Dom.btnTexte = "Ajouter une domaine";
      this.Dom.titreModal = "Ajout d'une Domaine";
    }
    else{
      this.Dom.btnTexte = "Ajouter un type"
      this.Dom.titreModal = "Ajout d'un Type";
    }
  }

  speValeurChange(){
    if(this.Spe.valeur == "classe"){
      this.Spe.btnTexte = "Ajouter une Classe";
      this.Spe.titre = "Classe";
    }
    else if(this.Spe.valeur == "nature"){
      this.Spe.btnTexte = "Ajouter une Nature";
      this.Spe.titre = "Nature";
    }
    else{
      this.Spe.btnTexte = "Ajouter une Spécificité";
      this.Spe.titre = "Spécificité";
    }
  }

  ouvreAjoutDom(){
    $(this.modalAjoutDom.nativeElement).modal('show');
  }

  fermeAjoutDom(){
    $(this.modalAjoutDom.nativeElement).modal('hide');
  }

  ouvreAjoutSpe(){
    $(this.modalAjoutSpe.nativeElement).modal('show');
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

  test(){
  	this.immoService.immoTopic("test", "Fuck").subscribe(obs=>{
  		console.log("Kafka response: "+JSON.stringify(obs));
  	}).unsubscribe();
  }

}
