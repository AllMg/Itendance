import { Component, OnInit } from '@angular/core';
import { RfaService } from '../../../../../services/pf/rfa/rfa.service';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-demande-rfa',
  templateUrl: './liste-demande-rfa.component.html',
  styleUrls: ['./liste-demande-rfa.component.css']
})
export class ListeDemandeRfaComponent implements OnInit {

  private user: any;
  public show: boolean;
  listeDemandePF: any;
  listeDemandeRFA: any
  etat: any;
  etatPf: any;
  listeDmdRfa: any;
  estValide: boolean;
  pagination: any;
  code_prestation = "430";
  page_count: any[];
  listeEtat: any;
  constructor(
    private rfaService: RfaService,
    private router: Router,
    private toastr: ToastrService,
    private ijPf: IjPfService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite === 'S') {
      this.etat = 8;
      this.pagination = 1;
      const etat_dmd = {
        "type_etat": +this.etat,
        "pagination": +this.pagination,
        "prestation": this.code_prestation
      };
      this.ijPf.listDmdIj(etat_dmd).subscribe(
        data => {
          if (data.success) {
            this.listeDemandeRFA = data.msg;
          }
          else {
            this.toastr.error('error: get list demande RFA :' + data.msg);
          }
        }
      )
      const msg = {
        "type_etat": +this.etat,
        "pagination": null,
        "prestation": this.code_prestation
      }
      this.getPageCount(msg);
    }

    else if (this.user.type_entite === 'P') {
      this.etat = 2;
      this.pagination = 1;
      const etat_dmd = {
        "type_etat": +this.etat,
        "pagination": +this.pagination,
        "prestation": this.code_prestation
      };
      this.ijPf.listDmdIj(etat_dmd).subscribe(
        data => {
          if (data.success) {
            this.listeDemandeRFA = data.msg;
          }
          else {
            this.toastr.error('error: get list demande RFA :' + data.msg);
          }
        }
      )
      const msg = {
        "type_etat": +this.etat,
        "pagination": null,
        "prestation": this.code_prestation
      }
      this.getPageCount(msg);
    }
    else if (this.user.type_entite != 'P' || this.user.type_entite != 'S') {
      this.router.navigate(['/accueil-connecte']);
    }
    this.getEtatDemande();
  }

  getEtatDemande() {
    this.ijPf.listeEtatDemandeIj().subscribe(data => {
      if (data.success) {
        this.listeEtat = data.msg;
      }
      else {
        this.toastr.error('error: get list Etat :' + data.msg);
      }
    })
  }

  getPageCount(data) {
    this.ijPf.pageCountByEtatByPrestation(data).subscribe(data => {
      if (data.success) {
        this.page_count = new Array(data.msg).fill('');
      }
      else {
        this.toastr.error('erreur: pageCountByEtat :' + data.msg);
      }
    });
  }

  pageClick(page) {
    this.show = true;
    this.pagination = page;
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite === 'S') {
      let etat_dmd = {
        "type_etat": +this.etat,
        "pagination": +this.pagination,
        "prestation": this.code_prestation
      };
      console.log("etat_dmd", etat_dmd);
      this.ijPf.listDmdIj(etat_dmd).subscribe(data => {
        if (data.success) {
          this.show = false;
          this.listeDemandeRfa = data.msg;
        } else {
          this.show = false;
          this.toastr.error('error: get list demande AP :' + data.msg);
        }
      });
    }
    else if (this.user.type_entite === 'P') {
      let etat_dmd = {
        "type_etat": +this.etat,
        "pagination": +this.pagination,
        "prestation": this.code_prestation
      };
      console.log("etat_dmd", etat_dmd);
      this.ijPf.listDmdIj(etat_dmd).subscribe(data => {
        if (data.success) {
          this.show = false;
          this.listeDemandeRfa = data.msg;
        } else {
          this.show = false;
          this.toastr.error('error: get list demande AP :' + data.msg);
        }
      });
    }

  }

  listeDemandeRfa(etat) {
    this.ijPf.listDmdIj(etat).subscribe(
      data => {
        if (data.success) {
          this.listeDemandeRfa = data.msg;
        }
        else {
          this.toastr.error('error: get list demande RFA :' + data.msg);
        }
      }
    )
  }

  /*listeDemandeRfa(etat) {
    this.rfaService.listDmdIj(etat).subscribe(
      data => {
        if (data.success) {
          this.listeDmdRfa = data.msg;
        }
        else {
          this.toastr.error('error: get list demande RFA :' + data.msg);
        }
      }
    )
  }*/
  /*onChangeEtat(event: any) {
    this.etat = event.target.value;
    const etat_dmd = {
      "type_etat": this.etat,
      "pagination": 1,
      "prestation": 430
    };
    this.listeDemandeRfa(etat_dmd);
  }*/

  onChangeEtat() {
    this.show = true;
    this.pagination = 1;
    this.user = JSON.parse(localStorage.getItem('user'));
    // if (this.user.type_entite === 'S') {
    //   let etat_dmd = {
    //     "type_etat": +this.etat,
    //     "pagination": +this.pagination,
    //     "prestation": this.code_prestation
    //   };
    //   console.log("etat_dmd", etat_dmd);
    //   this.ijPf.listDmdIj(etat_dmd).subscribe(
    //     data => {
    //       if (data.success) {
    //         this.listeDemandeRFA = data.msg;
    //       }
    //       else {
    //         this.toastr.error('error: get list demande RFA :' + data.msg);
    //       }
    //     }
    //   )

    //   const msg = {
    //     "type_etat": +this.etat,
    //     "pagination": null,
    //     "prestation": this.code_prestation
    //   }
    //   this.ijPf.pageCountByEtatByPrestation(msg).subscribe(data => {
    //     if (data.success) {
    //       this.show = false;
    //       this.page_count = new Array(data.msg).fill('');
    //     }
    //     else {
    //       this.show = false;
    //       this.toastr.error('erreur: pageCountByEtat :' + data.msg);
    //     }
    //   });
    // }
    // else if (this.user.type_entite === 'P') {

    //   let etat_dmd = {
    //     "type_etat": +this.etatPf,
    //     "pagination": +this.pagination,
    //     "prestation": this.code_prestation
    //   };
    //   console.log("etat_dmd", etat_dmd);
    //   this.ijPf.listDmdIj(etat_dmd).subscribe(
    //     data => {
    //       if (data.success) {
    //         this.listeDemandeRFA = data.msg;
    //       }
    //       else {
    //         this.toastr.error('error: get list demande RFA :' + data.msg);
    //       }
    //     }
    //   )

    //   const msg = {
    //     "type_etat": +this.etat,
    //     "pagination": null,
    //     "prestation": this.code_prestation
    //   }
    //   this.ijPf.pageCountByEtatByPrestation(msg).subscribe(data => {
    //     if (data.success) {
    //       this.show = false;
    //       this.page_count = new Array(data.msg).fill('');
    //     }
    //     else {
    //       this.show = false;
    //       this.toastr.error('erreur: pageCountByEtat :' + data.msg);
    //     }
    //   });
    // }


    let etat_dmd = {
      "type_etat": +this.etat,
      "pagination": +this.pagination,
      "prestation": this.code_prestation
    };
    console.log("etat_dmd", etat_dmd);
    this.ijPf.listDmdIj(etat_dmd).subscribe(
      data => {
        if (data.success) {
          this.listeDemandeRFA = data.msg;
        }
        else {
          this.toastr.error('error: get list demande RFA :' + data.msg);
        }
      }
    )

    const msg = {
      "type_etat": +this.etat,
      "pagination": null,
      "prestation": this.code_prestation
    }
    this.ijPf.pageCountByEtatByPrestation(msg).subscribe(data => {
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

  detailsRfa(id) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P' || this.user.type_entite != 'S') {
      this.router.navigate(['/accueil-connecte']);
    }
    this.router.navigate(['/details-rfa/' + id]);
    //1console.log('test');
  }
}
