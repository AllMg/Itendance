import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';

@Component({
  selector: 'app-ij2-pf',
  templateUrl: './ij2-pf.component.html',
  styleUrls: ['./ij2-pf.component.css']
})
export class Ij2PfComponent implements OnInit {
  public show: boolean;
  listDmdIj: any[];
  listEtatDmdIj: any[];
  etat: any;
  pagination: any;
  page_count: any[];
  code_prestation = 422;
  user: any;
  constructor(
    private routes: Router,
    private ijpfSerice: IjPfService,
    private toastr: ToastrService
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P') {
      this.routes.navigate(['/accueil-connecte']);
    }
    this.etat = 9;
    this.pagination = 1;

    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": this.pagination,
      "prestation": this.code_prestation.toString()
    };
    console.log("etat_dmd", etat_dmd);
    this.ijpfSerice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.listDmdIj = data.msg;
      } else {
        this.toastr.error('error: get list demande IJ :' + data.msg);
      }
    });

    this.ijpfSerice.listeEtatDemandeIj().subscribe(data => {
      if (data.success) {
        this.listEtatDmdIj = data.msg;
      } else {
        this.toastr.error('error: get list etat demande IJ PF :' + data.msg);
      }
    });

    const msg = {
      "type_etat": +this.etat,
      "pagination": null,
      "prestation": this.code_prestation.toString()
    }
    this.ijpfSerice.pageCountByEtatByPrestation(msg).subscribe(data => {
      if (data.success) {
        this.page_count = new Array(data.msg).fill('');
      }
      else {
        this.toastr.error('erreur: pageCountByEtat :' + data.msg);
      }
    });
  }

  onClickIJDetails(iddemande) {
    this.routes.navigate(['/details-ij2/' + iddemande]);
  }

  onChange() {
    this.show = true;
    this.pagination = 1;
    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": this.pagination,
      "prestation": this.code_prestation.toString()
    };
    console.log("etat_dmd", etat_dmd);
    this.ijpfSerice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.listDmdIj = data.msg;
      } else {
        this.show = false;
        this.toastr.error('error: get list demande IJ :' + data.msg);
      }
    });

    const msg = {
      "type_etat": +this.etat,
      "pagination": null,
      "prestation": this.code_prestation.toString()
    }
    this.ijpfSerice.pageCountByEtatByPrestation(msg).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.page_count = new Array(data.msg).fill('');
      }
      else {
        this.show = false;
        this.toastr.error('erreur: pageCountByEtat :' + data.msg);
      }
    });

  }

  pageClick(page) {
    this.show = true;
    this.pagination = page;
    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation.toString()
    };
    console.log("etat_dmd", etat_dmd);
    this.ijpfSerice.listDmdIj(etat_dmd).subscribe(data => {
      if (data.success) {
        this.show = false;
        this.listDmdIj = data.msg;
      } else {
        this.show = false;
        this.toastr.error('error: get list demande IJ :' + data.msg);
      }
    });
  }

}
