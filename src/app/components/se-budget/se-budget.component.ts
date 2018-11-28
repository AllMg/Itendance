import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';

declare var $: any;

@Component({
  selector: 'app-se-budget',
  templateUrl: './se-budget.component.html',
  styleUrls: ['./se-budget.component.css']
})
export class SeBudgetComponent implements OnInit {

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  Axes = {
    quinquennat: []
  };

  constructor(
		private router: Router, 
    private toast: ToastrService,
    private budgetService: BudgetService) { }

  ngOnInit() {
    let refDebut = 2018;
    let refFin = 2022;
    let anneeCourant = new Date(Date.now()).getFullYear();
    let liste = [];
    for(let arriere=refDebut; arriere>1930; arriere=arriere-5){
      liste.push({id: (arriere-5)+"-"+(arriere-1), text: (arriere-5)+" au "+(arriere-1)});
    }
    liste.unshift({id: "2018-2022", text: "2018 au 2022"});
    for(let avant=refFin; avant<anneeCourant+5; avant=avant+5){
      liste.unshift({id: (avant+1)+"-"+(avant+5), text: (avant+1)+" au "+(avant+5)});
    }
    this.Axes.quinquennat = liste;
  }

	clickInMenu1(lien:string){
		this.router.navigate(['/'+lien]);
	}

	clickSousMenu(nom){
		this.Menu.sousMenu = nom;
	}

}
