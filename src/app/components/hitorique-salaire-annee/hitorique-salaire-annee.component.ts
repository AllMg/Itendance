import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {InfoService} from '../../services/info/info.service';
import { EmployeurService } from '../../services/employeur/employeur.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hitorique-salaire-annee',
  templateUrl: './hitorique-salaire-annee.component.html',
  styleUrls: ['./hitorique-salaire-annee.component.css']
})
export class HitoriqueSalaireAnneeComponent implements OnInit {

  anneeClick: String;
  private user: any;
  entity: string;
  dataCIT: any;
  dataCITAnnee: any;
  dataAnnee: any;

  constructor(
    private infoService: InfoService,
    private route: ActivatedRoute,
    private routes: Router,
    private employeurService: EmployeurService,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    //Donnée CIT
    this.route.params.subscribe((params: Params) => {
      this.anneeClick = params['indice'];
    });
    //Liste année CIT
    this.user = JSON.parse(localStorage.getItem('user'));
    this.infoService.infoCIT(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataCIT = data.msg;
        for (let i = 0 ; i < this.dataCIT.length; i++) {
          this.employeurService.infoEmployeur(this.dataCIT[i].id_empl).subscribe( dataTravailleur => {
            if (dataTravailleur.success) {
              this.dataCIT[i].travailleurData = dataTravailleur.msg;

              this.dataAnnee = this.dataCIT[+this.anneeClick].annee;
              this.dataCITAnnee = this.dataCIT[+this.anneeClick];
            } else {
              this.toastr.error(dataTravailleur.msg);
            }
          });
        }
      } else {
        alert(data.msg);
      }
    });
  }

  onClickAnneeSalaire(i) {
    location.reload();
    this.routes.navigate(['/historique-salaire-annee/' + i]);
  }
}
