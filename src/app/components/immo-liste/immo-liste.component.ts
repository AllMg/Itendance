import { Component, OnInit, ViewChild } from '@angular/core';
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
  ListeEtatDmdBat:Array<{libelle: string, id_etat_dmd: number}> = [];
  ListeEtatDmdMob:Array<{libelle: string, id_etat_dmd: number}> = [];

  DmdMob = {
    liste: [],
    fonction: "avoirListeDmdMob",
    filtre: {
      service: "",
      demandeur: "",
      article: "",
      statut: "",
      date: ""
    }
  };

  DmdRepMob = {
    liste: [],
    fonction: "avoirListeDmdRepMob",
    filtre: {
      service: "",
      demandeur: "",
      article: "",
      statut: "",
      date: ""
    }
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
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nomSection, nomAttr){
    this.Menu.sousMenu = nomSection;
    let that = this;
    if(this[nomAttr].liste.length == 0){
      this.immoService.immoTopic(this[nomAttr].fonction, this[nomAttr].filtre).subscribe(obs=>{
        if(obs.success){
          that[nomAttr].liste = obs.msg;
        }
      });
    }
  }

  filtreChange(nomAttr){
    let that = this;
    this.immoService.immoTopic(this[nomAttr].fonction, this[nomAttr].filtre).subscribe(obs=>{
      if(obs.success){
        that[nomAttr].liste = obs.msg;
      }
    });
  }

  ouvreDetailMob(indice){
    $(this.modalDetailMob.nativeElement).modal('show');
  }

  fermeDetailMob(){
    $(this.modalDetailMob.nativeElement).modal('hide');
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

}
