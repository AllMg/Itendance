import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';

@Component({
  selector: 'app-bp-elaboration',
  templateUrl: './bp-elaboration.component.html',
  styleUrls: ['./bp-elaboration.component.css']
})
export class BpElaborationComponent implements OnInit {

  Menu = {
    menu: "inventaire",
    sousMenu: ""
  };

  exerciceBudget: number;

  Service = {
    categorie: "fct",
    listeProjet: []
  };

  constructor(
    private router: Router,
    private toast: ToastrService,
    private budgetService: BudgetService) {
      this.exerciceBudget = new Date(Date.now()).getFullYear() + 1;
  }

  ngOnInit() {
  }

  clickInMenu1(lien: string) {
    this.router.navigate(['/' + lien]);
  }

  clickSousMenu(nom) {
    this.Menu.sousMenu = nom;
  }

  clickCategorie(cat){
    this.Service.categorie = cat;
  }

}
