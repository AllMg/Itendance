import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import { ImmoService } from '../../services/immo/immo.service';

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

  listeService:Array<{libelle: string, id: number}> = [];

  DmdMob = {
    estVue: false,
    liste: [],
    indice: 0,
    fonction: "avoirListeDmdMob",
    filtre: {
      service: "",
      demandeur: "",
      statut: "",
      date: ""
    },
    listeEtat: [],
    etatAchange: false // refa niova ny etat ny demande dia affichena o manga ny button (azo clickena)
  };

  DmdRepMob = {
    estVue: false,
    liste: [],
    indice: 0,
    fonction: "avoirListeDmdRepMob",
    filtre: {
      service: "",
      demandeur: "",
      article: "",
      statut: "",
      date: ""
    },
    listeEtat: []
  };

  DmdBat = {
    estVue: false,
    liste: [],
    indice: 0,
    fonction: "avoirListeDmdBat",
    filtre: {
      service: "",
      demandeur: "",
      site: "",
      statut: "",
      type: "",
      caracteristique: "",
      enumeration: "",
      date: ""
    },
    listeSite: [],
    listeEtat: [],
    listeType: [],
    listeCaracteristique: [],
    listeEnumeration: []
  };

  constructor(
    private router: Router, 
    private immoService: ImmoService) {

    /*let that = this;
    this.immoService.immoTopic("avoirListeService", "").subscribe(obs=>{
      if(obs.success){
        that.listeService = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeEtatDmdMob", "").subscribe(obs=>{
      if(obs.success){
        that.ListeEtatDmdMob = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeEtatDmdBat", "").subscribe(obs=>{
      if(obs.success){
        that.ListeEtatDmdBat = obs.msg;
      }
    });*/
  }

  ngOnInit() {
    let that = this;
    this.immoService.immoTopic("avoirListeEtatDmdMobInt","",false).subscribe(obs=>{
      if(obs.success){
        that.DmdMob.listeEtat = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirListeEtatDmdRpMobInt","",false).subscribe(obs=>{
      if(obs.success){
        that.DmdRepMob.listeEtat = obs.msg;
      }
    });
    this.immoService.immoTopic("avoirUtilesDmdBatInt","",false).subscribe(obs=>{
      if(obs.success){
        that.DmdBat.listeEtat = obs.msg;
        that.DmdBat.listeType = obs.msg;
        that.DmdBat.listeCaracteristique = obs.msg;
        that.DmdBat.listeEnumeration = obs.msg;
      }
    });
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nomSection, nomAttr){
    this.Menu.sousMenu = nomSection;
    if(this[nomAttr].estVue == false){
      let that = this;
      this[nomAttr].estVue = true;
      this.immoService.immoTopic(this[nomAttr].fonction, this[nomAttr].filtre, true).subscribe(obs=>{
        if(obs.success){
          that[nomAttr].liste = obs.msg;
        }
      });
    }
  }

  filtreChange(nomAttr){
    let that = this;
    this.immoService.immoTopic(this[nomAttr].fonction, this[nomAttr].filtre, true).subscribe(obs=>{
      if(obs.success){
        that[nomAttr].liste = obs.msg;
      }
    });
  }

  ouvreDetailMob(indice){
    $(this.modalDetailMob.nativeElement).modal('show');
    this.DmdMob.etatAchange = false;
  }

  fermeDetailMob(){
    $(this.modalDetailMob.nativeElement).modal('hide');
  }

  validerLeChangement(){
    
  }

  ouvreDetailRepMob(){
    $(this.modalDetailRepMob.nativeElement).modal('show');
  }

  fermeDetailRepMob(){
    $(this.modalDetailRepMob.nativeElement).modal('hide');
  }

  ouvreDetailBat(){
    $(this.modalDetailBat.nativeElement).modal('show');
  }

  fermeDetailBat(){
    $(this.modalDetailBat.nativeElement).modal('hide');
  }

  convertirDateDepuisBase(date){
    let mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Août","Septembre","Octobre","Novembre","Décembre"];
    let strs = date.toString().split("-");
    let resultat = "Le "+strs[2]+" "+mois[strs[1]]+" "+strs[0];
    return resultat;
  }

}
