import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';
import { FileService } from '../../services/file/file.service';

declare var $: any;

@Component({
  selector: 'app-immo-dmd',
  templateUrl: './immo-dmd.component.html',
  styleUrls: ['./immo-dmd.component.css']
})
export class ImmoDmdComponent implements OnInit {

  @ViewChild('art_table') art_table:ElementRef;
  @ViewChild('modalAjoutSpe') modalAjoutSpe:ElementRef;

  Utilisateur:any;

  Menu = {
    menu: "demande",
    sousMenu: ""
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
    articleOptions: ["One","Omm","TOO","Tre","Free"],
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
    listeSite: [],
    listeType: [{libelle: "AMENAGEMENT", id: 0},{libelle: "CONSTRUCTION", id: 1},{libelle: "LOGEMENT", id: 2}],
    listeCaract: [{libelle: "TOITURE", id: 0},{libelle: "PORTE", id: 1}],
    listeEnum: [{libelle: "PEINTURE", id: 0}]
  };

  Ajout = {
    titre: "",
    libelle: "",
    nomAttrA: "",
    nomAttrS: "",
    valeur: ""
  };

  constructor(
    private router: Router, 
    private renderer2: Renderer2, 
    private toastr: ToastrService, 
    private fileService: FileService,
    private immoService: ImmoService) {

    /*let that = this;
    this.immoService.immoTopic("avoirListeSite", "").subscribe(obs=>{
      if(obs.success){
        that.DmdEntrBat.listeSite = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeType", "").subscribe(obs=>{
      if(obs.success){
        that.DmdEntrBat.listeType = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeCaract", "").subscribe(obs=>{
      if(obs.success){
        that.DmdEntrBat.listeCaract = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeEnum", "").subscribe(obs=>{
      if(obs.success){
        that.DmdEntrBat.listeEnum = obs.msg;
      }
    });*/
  }

  ngOnInit() {
    console.log("ngOnInit()");
    let that = this;
    this.DmdMob.articleControls[0].valueChanges.subscribe(term => {
      term = term.trim();
      if (term.length >= 3) {
        that.immoService.immoTopic("rechercheArticle", term).subscribe(obs=>{
          if(obs.success){
            console.log(obs.msg);
            that.DmdMob.articleOptions = obs.msg;
          }
        });
      }
    });
    /*this.Utilisateur = JSON.parse(localStorage.getItem('user'));
    console.log("Utilisateur");
    console.log(this.Utilisateur);*/
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nomSection, nomAttr){
    this.Menu.sousMenu = nomSection;
    if(this[nomAttr].reference == ""){
      let that = this;
      let argument = {
        prestation: "302",
        dr: "42"
      };
      this.immoService.immoTopic("referenceDmdArticle", argument).subscribe(obs=>{
        if(obs.success){
          that[nomAttr].reference = obs.msg;
        }
        else{
          that.toastr.error(obs.msg);
        }
      });
    }
  }

  clickPlusArticle(){
    this.DmdMob.articles.push({refArticle: "", quantite: 1, typeDmd: null, dateDeBesoin: null, dateFinBesoin: null});
    let that = this;
    let formControl = new FormControl();
    formControl.valueChanges.subscribe(term => {
      term = term.trim();
      if (term.length >= 3) {
        that.immoService.immoTopic("rechercheArticle", term).subscribe(obs=>{
          if(obs.success){
            console.log(obs.msg);
            that.DmdMob.articleOptions = obs.msg;
          }
        });
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
  }

  avoirTableauArticle(articles){
    let tableau = [];
    for(let i in articles){
      tableau.push(articles[i].refArticle);
    }
    return tableau;
  }

  clickEnregDmdMob(){
    if(this.DmdMob.reference != ""){
      if(this.articlesSontBon(this.DmdMob.articles)){
        this.DmdMob.loader = true;  
        let articlesNoms = this.avoirTableauArticle(this.DmdMob.articles);
        let that = this;
        this.immoService.immoTopic("prendArticleId", articlesNoms).subscribe(obs=>{
          if(obs.success){
            for(let i in obs.msg){
              that.DmdMob.articles[i].refArticle = obs.msg[i];
            }
            let argument = {
              refIndividu: "0000",
              refService: "1111",
              reference: that.DmdMob.reference,
              articles: that.DmdMob.articles,
              observation: that.DmdMob.observation
            };
            
            that.immoService.immoTopic("ajoutDmdImmo", argument).subscribe(obs=>{
              console.log(obs);
              if(obs.success){
                that.toastr.success(obs.msg);
                that.DmdMob.reference = "";
                that.DmdMob.articles = [{refArticle: "", quantite: 1, typeDmd: null, dateDeBesoin: null, dateFinBesoin: null}];
                that.DmdMob.articleControls = [new FormControl()];
                that.DmdMob.observation = "";
              }
              else{
                that.toastr.error(obs.msg);
              }
              that.DmdMob.loader = false;
            });
          }
          else{
            that.toastr.error(obs.msg);
            that.DmdMob.loader = false;  
          }
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
          name: fichiers[index].name
        };
        that.fileService.save(fichier).subscribe(obs=>{
          if(!obs.success){
            that.toastr.error("L'enregistrement du fichier "+fichier.name+" a échoué");
          }
        });
      };
      filereader.readAsDataURL(fichiers[index]);
    }
  }

  clickEnregDmdRepMob(){
    if(this.DmdRepMob.reference){
      this.DmdRepMob.loader = true;
      let argument = {
        matricule: "0000",
        service: "1111",
        reference: this.DmdRepMob.reference,
        article: this.DmdRepMob.article,
        motif: this.DmdRepMob.motif
      };
      let that = this;
      this.immoService.immoTopic("listeDmdImmo", argument).subscribe(obs=>{
        console.log(obs);
        if(obs.success){
          that.toastr.success(obs.msg);
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
      });
    }
    else{
      this.toastr.error("La demande n'a pas de référence");
    }
  }

  clickAjoutSpe(titre, libelle, nomAttrA, nomAttrS){
    this.Ajout.titre = titre;
    this.Ajout.libelle = libelle;
    this.Ajout.nomAttrA = nomAttrA;
    this.Ajout.nomAttrS = nomAttrS;
    this.Ajout.valeur = "";
    $(this.modalAjoutSpe.nativeElement).modal('show');
  }

  ajouterSpe(){
    $(this.modalAjoutSpe.nativeElement).modal('hide');
    this.Ajout.valeur = this.Ajout.valeur.trim().toUpperCase();
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
        this.immoService.immoTopic("", this.Ajout.valeur).subscribe(obs=>{
          if(obs.success){
            that.Ajout.valeur = "";
            that.DmdEntrBat[that.Ajout.nomAttrA].push(obs.msg);
            that.DmdEntrBat[that.Ajout.nomAttrS] = obs.msg.id;
          }
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
        matricule: "0000",
        service: "1111",
        reference: this.DmdEntrBat.reference,
        ref_site: this.DmdEntrBat.site,
        id_type_entr_bat: this.DmdEntrBat.type,
        id_caract_entr_bat: this.DmdEntrBat.caracteristique,
        id_enum_entr_bat: this.DmdEntrBat.enumeration,
        motif: this.DmdEntrBat.observation
      };
      let that = this;
      this.immoService.immoTopic("listeDmdImmo", argument).subscribe(obs=>{
        console.log(obs);
        if(obs.success){
          this.toastr.success(obs.msg);
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
      });
    }
    else{
      this.toastr.error("La demande n'a pas de référence");
    }
  }

}
