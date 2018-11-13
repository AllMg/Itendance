import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { ImmoService } from '../../services/immo/immo.service';

@Component({
  selector: 'app-immo-mvt',
  templateUrl: './immo-mvt.component.html',
  styleUrls: ['./immo-mvt.component.css']
})
export class ImmoMvtComponent implements OnInit {

	@ViewChild('modalChargement') modalChargement;
	@ViewChild('modalAjoutDom') modalAjoutDom;
	@ViewChild('modalAjoutSpe') modalAjoutSpe;
	@ViewChild('modalModifArt') modalModifArt;

	Menu = {
		menu: "article",
		sousMenu: ""
	};

	constructor(
	    private router: Router, 
	    private toast: ToastrService,
	    private immoService: ImmoService) {

	}

	ngOnInit() {

	}

	clickInMenu1(lien:string){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
	}

}
