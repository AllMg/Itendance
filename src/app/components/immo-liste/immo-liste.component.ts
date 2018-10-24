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

  constructor(private router: Router, private immoService: ImmoService) { }

  ngOnInit() {
  }

  clickInMenu1(lien:string){
    this.router.navigate(['/'+lien]);
  }

  clickSousMenu(nom){
    this.Menu.sousMenu = nom;
  }

  ouvreDetailMob(){
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

  test(){
  	this.immoService.immoTopic("test", "Fuck").subscribe(obs=>{
  		console.log("Kafka response: "+JSON.stringify(obs));
  	}).unsubscribe();
  }

}
