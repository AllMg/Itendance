import { Component, OnInit } from '@angular/core';
import {EmployeurService} from '../../services/employeur/employeur.service';
import {BanqueService} from '../../services/banque/banque.service';
import {AdresseService} from '../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-employeurs',
  templateUrl: './info-employeurs.component.html',
  styleUrls: ['./info-employeurs.component.css']
})
export class InfoEmployeursComponent implements OnInit {
  user: any;
  dataUser: any;
  dataBanque: any;
  dataAdresse: any;
  dataResponsable: any;
  typeAdresse: any[];
  constructor(
    private employeurService: EmployeurService,
    private banqueService: BanqueService,
    private adresseService: AdresseService,
    private toatr: ToastrService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.banqueService.infoBanqueEmpl(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataBanque = data.msg[0];
      } else {
        setTimeout(() => this.toatr.error(data.msg));
      }
    });
    this.employeurService.infoEmployeur(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataUser = data.msg;
      } else {
        setTimeout(() => this.toatr.error(data.msg));
      }
    });
    this.adresseService.infoAdresseEmpl(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataAdresse = data.msg[0];
      } else {
        setTimeout(() => this.toatr.error(data.msg));
      }
    });

    this.employeurService.responsableEmployeur(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataResponsable = data.msg[0];
      } else {
        setTimeout(() => this.toatr.error(data.msg));
      }
    });
    this.adresseService.getTypeAdresse().subscribe( data => {
      if (data.success) {
        this.typeAdresse = data.msg;
      } else {
        setTimeout(() => this.toatr.error(data.msg));
      }
    });
  }
  changeType(data) {
    this.adresseService.getAdresseByEmplAndType(this.user.id_acces, data.id_type).subscribe( dataResponse => {
      if (dataResponse.success) {
        this.dataAdresse = dataResponse.msg[0];
      } else {
        this.toatr.error(dataResponse.msg);
      }
    });
  }
}
