import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(private router: Router, private immoService: ImmoService) { }

  ngOnInit() {
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nom){
    this.Menu.sousMenu = nom;
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
