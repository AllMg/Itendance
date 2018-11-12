import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ImmoService } from '../../services/immo/immo.service';

@Component({
  selector: 'app-immo-inventaire',
  templateUrl: './immo-inventaire.component.html',
  styleUrls: ['./immo-inventaire.component.css']
})
export class ImmoInventaireComponent implements OnInit {

	Menu = {
	    menu: "inventaire",
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
		console.log("Start...");
  		this.immoService.immoTopic("listeEnumEntrBat", 1, false).subscribe(obs=>{
  			console.log("Kafka response: "+JSON.stringify(obs));
  		});
	}

}
