import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';

@Component({
  selector: 'app-list-am',
  templateUrl: './list-am.component.html',
  styleUrls: ['./list-am.component.css']
})
export class ListAmComponent implements OnInit {
  public show: boolean;
  listDmdAm: any[];
  listEtatDmdAm: any[];
  etat: any;
  pagination: any;
  page_count: any[];
  prestation: any;
  listeEtat: any;
  code_prestation = "412";
  user: any;
  constructor(
    private routes: Router,
    private amservice: IjPfService,
    private toaster: ToastrService
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P') {
      this.routes.navigate(['/accueil-connecte']);
    }
    this.etat = 1;
    this.pagination = 1;
    const etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation
    };
    this.listeDemandeAm1(etat_dmd);
    this.getEtatDemande();

    const msg = {
      "type_etat": +this.etat,
      "pagination": null,
      "prestation": this.code_prestation
    }
    this.getPageCount(msg);
  }

  getPageCount(data) {
    this.amservice.pageCountByEtatByPrestation(data).subscribe(data => {
      if (data.success) {
        this.page_count = new Array(data.msg).fill('');
      }
      else {
        this.toaster.error('erreur: pageCountByEtat :' + data.msg);
      }
    });
  }
  getEtatDemande() {
    this.amservice.listeEtatDemandeIj().subscribe(data => {
      if (data.success) {
        this.listeEtat = data.msg;
      }
      else {
        this.toaster.error('error: get list Etat :' + data.msg);
      }
    })
  }

  onClickDmd(iddem) {
    
    this.routes.navigate(['/fiche-am1/' + iddem]);
  }

  onChangeEtat() {
    this.show = true;
    this.pagination = 1;
    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation
    };
    console.log("etat_dmd", etat_dmd);
    this.listeDemandeAm1(etat_dmd);

    const msg = {
      "type_etat": +this.etat,
      "pagination": null,
      "prestation": this.code_prestation
    }
    this.amservice.pageCountByEtatByPrestation(msg).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.page_count = new Array(data.msg).fill('');
      }
      else {
        this.show = false;
        this.toaster.error('erreur: pageCountByEtat :' + data.msg);
      }
    });

  }
  
  pageClick(page) {
    this.show = true;
    this.pagination = page;
    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation
    };
    console.log("etat_dmd", etat_dmd);
    this.amservice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.listDmdAm = data.msg;
      } else {
        this.show = false;
        this.toaster.error('error: get list demande AP :' + data.msg);
      }
    });
  }
  listeDemandeAm1(etat_dmd) {
    this.amservice.listDmdIj(etat_dmd).subscribe(
      data => {
        if (data.success) {
          this.listDmdAm = data.msg;
        }
        else {
          this.toaster.error('error: get list demande AP :' + data.msg);
        }
      }
    )
  }
}
