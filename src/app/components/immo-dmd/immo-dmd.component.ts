import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ImmoService } from '../../services/immo/immo.service';

@Component({
  selector: 'app-immo-dmd',
  templateUrl: './immo-dmd.component.html',
  styleUrls: ['./immo-dmd.component.css']
})
export class ImmoDmdComponent implements OnInit {

  Menu = {
    menu: "demande",
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

  test(){
  	this.immoService.immoTopic("test", "Fuck").subscribe(obs=>{
  		console.log("Kafka response: "+JSON.stringify(obs));
  	}).unsubscribe();
  }

}
