import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-securite',
  templateUrl: './sec-visiteur.component.html',
  styleUrls: ['./sec-visiteur.component.css']
})
export class SecVisiteurComponent implements OnInit {

	Menu = {
	    menu: "visiteur",
	    sousMenu: ""
	};

	constructor(private router: Router) { }

	ngOnInit() {
		
	}

	clickInMenu1(lien){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(lien){
		this.Menu.sousMenu = lien;
	}

}
