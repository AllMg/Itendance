import { Component, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
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
    listeSite: [],
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

  constructor(
    private router: Router, 
    private renderer2: Renderer2, 
    private toastr: ToastrService, 
    private fileService: FileService,
    private immoService: ImmoService) {

    let that = this;
    /*this.immoService.immoTopic("avoirListeSite", "", false).subscribe(obs=>{
      if(obs.success){
        that.DmdEntrBat.listeSite = obs.msg;
      }
    });*/
    //let obs1 = this.immoService.immoTopic("listeTypeEntrBatInt", "", false).subscribe(obs=>{
    let obs1 = this.immoService.listeTypeEntrBatInt().subscribe(obs=>{
      if(obs.success){
        that.trieParLibelle(obs.msg);
        that.DmdEntrBat.listeType = obs.msg;
      }
      console.log("listeTypeEntrBatInt", obs);
      obs1.unsubscribe();
    });
    //let obs2 = this.immoService.immoTopic("listeCaractEntrBatInt", "", false).subscribe(obs=>{
    let obs2 = this.immoService.listeCaractEntrBatInt().subscribe(obs=>{
      if(obs.success){
        that.trieParLibelle(obs.msg);
        that.DmdEntrBat.listeCaract = obs.msg;
      }
      console.log("listeCaractEntrBatInt", obs);
      obs2.unsubscribe();
    });
    //let obs3 = this.immoService.immoTopic("listeEnumEntrBatInt", "", false).subscribe(obs=>{
    let obs3 = this.immoService.listeEnumEntrBatInt().subscribe(obs=>{
      if(obs.success){
        that.trieParLibelle(obs.msg);
        that.DmdEntrBat.listeEnum = obs.msg;
      }
      console.log("listeEnumEntrBatInt", obs);
      obs3.unsubscribe();
    });
  }

  ngOnInit() {
    console.log("INIT IMMO DMD");
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
    /*this.Utilisateur = JSON.parse(localStorage.getItem('user'));
    console.log("Utilisateur");
    console.log(this.Utilisateur);*/
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
        prestation: "302",
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
              refIndividu: "0000",
              refService: "1111",
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
        refIndividu: "0000",
        refService: "1111",
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
        refIndividu: "0000",
        refService: "1111",
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

}
