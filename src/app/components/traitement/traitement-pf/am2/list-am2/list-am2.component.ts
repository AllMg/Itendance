import { Component, OnInit } from '@angular/core';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';
import { ActivatedRoute, Router } from '../../../../../../../node_modules/@angular/router';


@Component({
  selector: 'app-list-am2',
  templateUrl: './list-am2.component.html',
  styleUrls: ['./list-am2.component.css']
})
export class ListAm2Component implements OnInit {

  listeDmdAm2: any[] = [];
  etat: any;
  listeEtat: any;
  refAm1: any;
  public show: boolean;
  pagination: any;
  code_prestation = "413";
  page_count: any[];

  listDmdAm: any[];
  listEtatDmdAm: any[];
  prestation: any;
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
    this.listeDemandeAm2(etat_dmd);
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

  listeDemandeAm2(etat) {
    this.amservice.listDmdIj(etat).subscribe(
      data => {
        if (data.success) {
          this.listeDmdAm2 = data.msg;
          console.log(this.listeDmdAm2);
        }
        else {
          this.toaster.error('error: get list demande AP :' + data.msg);
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

  onChangeEtat() {
    this.show = true;
    this.pagination = 1;
    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation
    };
    console.log("etat_dmd", etat_dmd);
    this.amservice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.listeDmdAm2 = data.msg;
      } else {
        this.show = false;
        this.toaster.error('error: get list demande IJ :' + data.msg);
      }
    });

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
        this.listeDmdAm2 = data.msg;
      } else {
        this.show = false;
        this.toaster.error('error: get list demande AM2 :' + data.msg);
      }
    });
  }

  detailsAm2(ref) {
    this.routes.navigate(['/fiche-am2/' + ref]);
    //console.log('test');
  }
  onChangeEtatDmd(idetat) {
    this.show = true;
    this.pagination = 1;
    let etat_dmd = {
      "type_etat": this.etat,
      "pagination": this.pagination,
      "prestation": this.prestation
    };
    console.log("etat_dmd", etat_dmd);
    this.getListDmd(etat_dmd);
  }
  getListDmd(etat_dmd) {
    this.amservice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.listDmdAm = data.msg;
      } else {
        this.toaster.error('error: get list demande AM :' + data.msg);
      }
    });
  }
}
