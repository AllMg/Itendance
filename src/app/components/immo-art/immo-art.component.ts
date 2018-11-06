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

  @ViewChild('modalAjout') modalAjout;

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
    liste: [],
    filtre: {
      article: "",
      domaine: 0,
      type: 0,
      classe: 0,
      nature: 0,
      specificite: 0
    }
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

  avoirCaractParId(nomAttr, nomId, id){
    for(let i=0; i<this[nomAttr].length; i++){
      if(this[nomAttr][i][nomId] == id){
        return this[nomAttr][i];
      }
    }
  }

  avoirCode(article){
    if(article.id_classe_art > 0){
      let classe = this.avoirCaractParId("listeClasse", "id_classe_art", article.id_classe_art).code_classe;
      let nature = this.avoirCaractParId("listeNature", "id_nature_art", article.id_nature_art).code_nature;
      let spe = this.avoirCaractParId("listeSpecificite", "id_spe_art", article.id_spe_art).code_spe;
      return classe+nature+spe;
    }
    else{
      return "-";
    }
  }

  ouvreAjout(){
    $(this.modalAjout.nativeElement).modal('show');
  }

  fermeAjout(){
    $(this.modalAjout.nativeElement).modal('hide');
  }

  test(){
  	this.immoService.immoTopic("test", "Fuck").subscribe(obs=>{
  		console.log("Kafka response: "+JSON.stringify(obs));
  	}).unsubscribe();
  }

}
