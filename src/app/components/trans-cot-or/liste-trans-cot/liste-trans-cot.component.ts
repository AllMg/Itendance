import { Component, OnInit } from '@angular/core';
import { TransfertCotisationService } from '../../../services/transfert-cotisation/transfert-cotisation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-trans-cot',
  templateUrl: './liste-trans-cot.component.html',
  styleUrls: ['./liste-trans-cot.component.css']
})
export class ListeTransCotComponent implements OnInit {

  dataTransfert: any[];
  dataEtat: any[];
  show: boolean;
  etat: any;

  constructor(
    private transfertCotisationService: TransfertCotisationService,
    private toastr: ToastrService,
    private routes: Router
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.show = true;
    const msg_liste = {
      "type_etat": 1,
      "pagination": 1
    };
    //Liste des demandes de transfert de cotisation
    this.transfertCotisationService.listeTransfertCotisation(msg_liste).subscribe(data => {
      if (data.success) {
        this.dataTransfert = data.msg;
        this.show = false;
        this.toastr.success("Données liste transfert affichées avec succès.")
      }
    });
    this.transfertCotisationService.listeEtat().subscribe(data => {
      this.dataEtat = data.msg;
    });
  }

  onClickTransfert(etat, idacc, matricule) {
    this.routes.navigate(['/detail-transfert-cotisation/' + etat + '/' + idacc + '/' + matricule]);
  }

  onChangeEtat(event: any) {
    this.show = true;
    this.etat = event.target.value;
    const msg = {
      "type_etat": this.etat,
      "pagination": 1
    };
    this.transfertCotisationService.listeTransfertCotisation(msg).subscribe(data => {
      if (data.success) {
        this.dataTransfert = data.msg;
        this.show = false;
      }
    });
  }
}
