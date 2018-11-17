import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { FileModel } from '../../models/file-model';
import { ImmoService } from '../../services/immo/immo.service';
import { FileService } from '../../services/file/file.service';
import { InfoService } from '../../services/info/info.service';

declare var $: any;

@Component({
  selector: 'app-immo-liste',
  templateUrl: './immo-liste.component.html',
  styleUrls: ['./immo-liste.component.css']
})
export class ImmoListeComponent implements OnInit {

  @ViewChild('modalDetailMob') modalDetailMob;
  @ViewChild('modalDetailRepMob') modalDetailRepMob;
  @ViewChild('modalDetailBat') modalDetailBat;

  Menu = {
    menu: "liste",
    sousMenu: ""
  };

  listeService = [];

  ligneMax = 15;

  DmdMob = {
    estVue: false, // mba ts amerenana maka ny liste refa oatra ka f tao @onglet teo alo ilay user
    liste: [],
    articlesDmds: [],
    indice: 0,
    fonction: "listeDmdImmoInt",
    page: 1,
    filtre: {
      refService: 0,
      refIndividu: "",
      idEtatDmd: 0,
      dateDmdImmo: null
    },
    listeEtat: [],
    etatAchange: false, // refa niova ny etat ny demande dia affichena o manga ny button (azo clickena)
    nouveauEtat: 0,
    chargeStatutChange: false,
    chargeListe: false
  };

  DmdRepMob = {
    estVue: false,
    liste: [],
    pieces: [],
    indice: 0,
    fonction: "listeDmdReparationInt",
    page: 1,
    filtre: {
      refService: 0,
      refIndividu: "",
      nomArticle: "",
      idEtatDmd: 0,
      dateDmdRep: null
    },
    listeEtat: [],
    etatAchange: false,
    nouveauEtat: 0,
    chargeStatutChange: false,
    chargeListe: false
  };

  DmdBat = {
    estVue: false,
    liste: [],
    pieces: [],
    indice: 0,
    fonction: "listeDmdBatInt",
    page: 1,
    filtre: {
      refService: 0,
      refIndividu: "",
      refSite: 0,
      idEtatDmd: 0,
      idTypeEntrBat: 0,
      idCaractEntrBat: 0,
      idEnumEntrBat: 0,
      date: null    
    },
    listeSite: [],
    listeEtat: [],
    listeType: [],
    listeCaract: [],
    listeEnum: [],
    etatAchange: false,
    nouveauEtat: 0,
    chargeStatutChange: false,
    chargeListe: false
  };

  constructor(
    private router: Router, 
    private toast: ToastrService,
    private fileService: FileService,
    private infoService: InfoService,
    private immoService: ImmoService) {

    let that = this;
    let observ = this.immoService.getAllRefDrhService().subscribe(obs=>{
      if(obs.success){
        obs.msg.sort((a, b)=>{
          if(a.libelle_service > b.libelle_service){
            return 1;
          }
          else if(a.libelle_service < b.libelle_service){
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
    console.log("INIT IMMO LISTE");
    let that = this;
    //let observ = this.immoService.immoTopic("listeEtatDmdMobInt", 1, false).subscribe(obs=>{
    let observ = this.immoService.listeEtatDmdMobInt().subscribe(obs=>{
      if(obs.success){
        that.DmdMob.listeEtat = obs.msg.listeEtatMob;
        that.DmdRepMob.listeEtat = obs.msg.listeEtatRepMob;
      }
      console.log("listeEtatDmdMobInt",obs);
      observ.unsubscribe();
    });

    //let observ1 = this.immoService.immoTopic("listeUtilesDmdBatInt","",false).subscribe(obs=>{
    let observ1 = this.immoService.listeUtilesDmdBatInt().subscribe(obs=>{
      if(obs.success){
        that.DmdBat.listeEtat = obs.msg.etatBat;
        that.DmdBat.listeType = obs.msg.typeBat;
        that.DmdBat.listeCaract = obs.msg.caractBat;
        that.DmdBat.listeEnum = obs.msg.enumBat;
      }
      console.log("listeUtilesDmdBatInt",obs);
      observ1.unsubscribe();
    });
  }

  ngOnDestroy(){
    console.log("DESTROYED IMMO LISTE");
    this.DmdMob = null;
    this.DmdRepMob = null;
    this.DmdBat = null;
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nomSection, nomAttr){
    this.Menu.sousMenu = nomSection;
    if(this[nomAttr].estVue == false){
      this[nomAttr].estVue = true;
      this.liste(nomAttr);
    }
  }

  filtreChange(nomAttr){
    this[nomAttr].page = 1;
    this.liste(nomAttr);
  }

  liste(nomAttr){
    this[nomAttr].chargeListe = true;
    let that = this;
    let argument = {
      pagination: this[nomAttr].page,
      filtre: this[nomAttr].filtre
    };
    let observ = this.immoService.immoTopic(this[nomAttr].fonction, argument, true).subscribe(obs=>{
      if(obs.success){
        that[nomAttr].liste = obs.msg;
      }
      that[nomAttr].chargeListe = false;
      observ.unsubscribe();
    });
  }

  pageSuivant(nomAttr){
    if(!this[nomAttr].chargeListe){
      if(this[nomAttr].liste.length == this.ligneMax){
        this[nomAttr].page++;
        this.liste(nomAttr);
      }
    }
  }

  pagePrecedent(nomAttr){
    if(!this[nomAttr].chargeListe){
      if(this[nomAttr].page > 1){
        this[nomAttr].page--;
        this.liste(nomAttr);
      }
    }
  }

  avoirEtatDmd(idEtatDmd, nomAttr){
    for(let i=0; i<this[nomAttr].listeEtat.length; i++){
      if(this[nomAttr].listeEtat[i].idEtatDmd == idEtatDmd){
        return this[nomAttr].listeEtat[i].libelle;
      }
    }
    return "-";
  }

  ouvreDetailMob(indice){
    $(this.modalDetailMob.nativeElement).modal('show');  
    this.DmdMob.indice = indice;
    this.DmdMob.etatAchange = false;
    this.DmdMob.nouveauEtat = this.DmdMob.liste[indice].idEtatDmd;
    let that = this;
    let observ = this.immoService.immoTopic("detailDmdImmoInt", this.DmdMob.liste[indice].idDmdImmo, false).subscribe(obs=>{
      if(obs.success){
        that.DmdMob.articlesDmds = obs.msg;
        let listeID = [];
        for(let i=0; i<obs.msg.length; i++){
          listeID.push(obs.msg[i].refArticle);
        }
        that.immoService.immoTopic("listeArticleParIdInt", listeID, true).subscribe(obs=>{
          if(obs.success){
            for(let i=0; i<obs.msg.length; i++){
              that.DmdMob.articlesDmds[i].refArticle = obs.msg[i];
            }
          }
        });
      }
      observ.unsubscribe();
    });
  }

  fermeDetailMob(){
    $(this.modalDetailMob.nativeElement).modal('hide');
    this.DmdMob.articlesDmds = [];
  }

  etatDmdChange(nomAttr){
    if (this[nomAttr].nouveauEtat != this[nomAttr].liste[this[nomAttr].indice].idEtatDmd){
      this[nomAttr].etatAchange = true;
    }
    else{
      this[nomAttr].etatAchange = false;
    }
  }

  validerEtatDmdMob(){
    if(this.DmdMob.etatAchange){
      this.DmdMob.chargeStatutChange = true;
      let that = this;
      let argument = {
        idEtatDmd: this.DmdMob.nouveauEtat,
        idDmdImmo: this.DmdMob.liste[this.DmdMob.indice].idDmdImmo
      };
      let observ = this.immoService.immoTopic("modifierEtatDmdMobInt", argument, true).subscribe(obs=>{
        if(obs.success){
          that.DmdMob.chargeStatutChange = false;
          that.DmdMob.etatAchange = false;
          that.DmdMob.liste[that.DmdMob.indice].idEtatDmd = that.DmdMob.nouveauEtat;
          that.toast.success("L'etat de la demande est parfaitement mis à jour");
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }

  ouvreDetailRepMob(indice){
    $(this.modalDetailRepMob.nativeElement).modal('show');
    this.DmdRepMob.indice = indice;
    this.DmdRepMob.etatAchange = false;
    this.DmdRepMob.nouveauEtat = this.DmdRepMob.liste[indice].idEtatDmd;
    let that = this;
    let fileQuery = new FileModel();
    fileQuery.id_files = this.DmdRepMob.liste[this.DmdRepMob.indice].reference;
    let observ = this.fileService.readQuery(fileQuery).subscribe(data => {
      if (data.success) {
        that.DmdRepMob.pieces = data.msg;
      }
      else{
        that.toast.error(data.msg);
      }
      observ.unsubscribe();
    });
  }

  validerEtatDmdRepMob(){
    if(this.DmdRepMob.etatAchange){
      this.DmdRepMob.chargeStatutChange = true;
      let that = this;
      let argument = {
        idEtatDmd: this.DmdRepMob.nouveauEtat,
        idDmdRep: this.DmdRepMob.liste[this.DmdRepMob.indice].idDmdRep
      };
      let observ = this.immoService.immoTopic("modifierEtatDmdRepMobInt", argument, true).subscribe(obs=>{
        if(obs.success){
          that.DmdRepMob.chargeStatutChange = false;
          that.DmdRepMob.etatAchange = false;
          that.DmdRepMob.liste[that.DmdRepMob.indice].idEtatDmd = that.DmdRepMob.nouveauEtat;
          that.toast.success("L'etat de la demande est parfaitement mis à jour");
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }

  fermeDetailRepMob(){
    $(this.modalDetailRepMob.nativeElement).modal('hide');
    this.DmdRepMob.pieces = [];
  }

  avoirSpeBat(nomListe, idNom, idValeur){
    for(let i=0; i<this.DmdBat[nomListe].length; i++){
      if(this.DmdBat[nomListe][i][idNom] == idValeur){
        return this.DmdBat[nomListe][i].libelle;
      }
    }
    return "-";
  }

  ouvreDetailBat(indice){
    $(this.modalDetailBat.nativeElement).modal('show');
    this.DmdBat.indice = indice;
    this.DmdBat.etatAchange = false;
    this.DmdBat.nouveauEtat = this.DmdBat.liste[indice].idEtatDmd;
    let that = this;
    let fileQuery = new FileModel();
    fileQuery.id_files = this.DmdBat.liste[this.DmdBat.indice].reference;
    let observ = this.fileService.readQuery(fileQuery).subscribe(data => {
      if (data.success) {
        that.DmdBat.pieces = data.msg;
      }
      else{
        that.toast.error(data.msg);
      }
      observ.unsubscribe();
    });
  }

  validerEtatDmdBat(){
    if(this.DmdBat.etatAchange){
      this.DmdBat.chargeStatutChange = true;
      let that = this;
      let argument = {
        idEtatDmd: this.DmdBat.nouveauEtat,
        idDmdEntrBat: this.DmdBat.liste[this.DmdBat.indice].idDmdEntrBat
      };
      let observ = this.immoService.immoTopic("modifierEtatDmdBatInt", argument, true).subscribe(obs=>{
        if(obs.success){
          that.DmdBat.chargeStatutChange = false;
          that.DmdBat.etatAchange = false;
          that.DmdBat.liste[that.DmdBat.indice].idEtatDmd = that.DmdBat.nouveauEtat;
          that.toast.success("L'etat de la demande est parfaitement mis à jour");
        }
        else{
          that.toast.error(obs.msg);
        }
        observ.unsubscribe();
      });
    }
  }

  fermeDetailBat(){
    $(this.modalDetailBat.nativeElement).modal('hide');
    this.DmdBat.pieces = [];
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
