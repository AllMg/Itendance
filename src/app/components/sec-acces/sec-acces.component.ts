import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sec-acces',
  templateUrl: './sec-acces.component.html',
  styleUrls: ['./sec-acces.component.css']
})
export class SecAccesComponent implements OnInit {

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
