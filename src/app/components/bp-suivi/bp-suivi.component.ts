import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { ImmoService } from '../../services/immo/immo.service';

@Component({
  selector: 'app-bp-suivi',
  templateUrl: './bp-suivi.component.html',
  styleUrls: ['./bp-suivi.component.css']
})
export class BpSuiviComponent implements OnInit {

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService,
    private immoService: ImmoService) { }

  ngOnInit() {
    
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom: string) {
    this.Menu.sousMenu = nom;
  }

}
