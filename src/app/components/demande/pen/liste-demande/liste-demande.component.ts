import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {DemandePensionService} from '../../../../services/pension/demande-pension.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css']
})

export class ListeDemandeComponent implements OnInit {
  demandes: any[];
  prestation: any[];
  p = 1;
  etat = 1;
  etats: any[];

  constructor(
    private demandeService: DemandePensionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private routes: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.prestation = [params['prestation']];
      this.demandeService.listEtat().subscribe(res => {
        if (res.success) {
          this.etats = res.msg;
          this.initData(this.prestation, this.etat, 1);
        } else {
          setTimeout(() => this.toastr.error(res.msg));
        }
      });
    });
  }

  initData(prest, etat, page) {
    this.demandeService.list(prest, etat, page).subscribe( data => {
      if (data.success) {
        this.demandes = data.msg;
        console.log(this.demandes);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  onDetail(reference: string) {
    this.routes.navigate(['/detail-demande/' + reference]);
    location.reload();
  }

  onChangeEtat(etat) {
    console.log('ETAT:' + etat);
    this.etat = etat;
    this.demandeService.list(this.prestation, this.etat, this.p).subscribe( data => {
      if (data.success) {
        this.demandes = [];
        this.demandes = data.msg;
        console.log(this.demandes);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    console.log(this.demandes);
  }

}


