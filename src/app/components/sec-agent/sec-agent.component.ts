import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sec-agent',
  templateUrl: './sec-agent.component.html',
  styleUrls: ['./sec-agent.component.css']
})
export class SecAgentComponent implements OnInit {

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
