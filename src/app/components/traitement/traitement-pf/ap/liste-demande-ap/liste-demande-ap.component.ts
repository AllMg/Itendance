import { Component, OnInit } from '@angular/core';
import { ApService } from '../../../../../services/pf/ap/ap.service';
import { Route, ActivatedRoute, Router } from '../../../../../../../node_modules/@angular/router';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-liste-demande-ap',
  templateUrl: './liste-demande-ap.component.html',
  styleUrls: ['./liste-demande-ap.component.css']
})
export class ListeDemandeApComponent implements OnInit {

  public show: boolean;
  listDemAp: any;
  listeEtat: any;
  etat: any;
  pagination: any;
  code_prestation = "411";
  page_count: any[];
  user: any;
  constructor(
    private apService: IjPfService,
    private router: Router,
    private toaster: ToastrService,
    private ijpfSerice: IjPfService,
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P') {
      this.router.navigate(['/accueil-connecte']);
    }
    this.etat = 1;
    this.pagination = 1;
    const etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation
    };
    this.listeDemandeAp(etat_dmd);
    this.getEtatDemande();

    const msg = {
      "type_etat": +this.etat,
      "pagination": null,
      "prestation": this.code_prestation
    }
    this.getPageCount(msg);
  }

  listeDemandeAp(etat_dmd) {
    this.apService.listDmdIj(etat_dmd).subscribe(
      data => {
        if (data.success) {
          this.listDemAp = data.msg;
          console.log(this.listDemAp);
        }
        else {
          this.toaster.error('error: get list demande AP :' + data.msg);
        }
      }
    )
  }

  detailsAp(reference) {
   
      this.router.navigate(['/details-ap/' + reference]);

    //1console.log('test');
  }

  getPageCount(data) {
    this.ijpfSerice.pageCountByEtatByPrestation(data).subscribe(data => {
      if (data.success) {
        this.page_count = new Array(data.msg).fill('');
      }
      else {
        this.toaster.error('erreur: pageCountByEtat :' + data.msg);
      }
    });
  }
  getEtatDemande() {
    this.apService.listeEtatDemandeIj().subscribe(data => {
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
    this.ijpfSerice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.listDemAp = data.msg;
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
    this.ijpfSerice.pageCountByEtatByPrestation(msg).subscribe(data => {
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
    this.ijpfSerice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.listDemAp = data.msg;
      } else {
        this.show = false;
        this.toaster.error('error: get list demande AP :' + data.msg);
      }
    });
  }

}
