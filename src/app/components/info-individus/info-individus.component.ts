import { Component, OnInit } from '@angular/core';
import { InfoService} from '../../services/info/info.service';
import {TravailleurService} from '../../services/travailleur/travailleur.service';
import {EmployeurService} from '../../services/employeur/employeur.service';
import {IndividuService} from '../../services/individu/individu.service';
import {AdresseService} from '../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-individus',
  templateUrl: './info-individus.component.html',
  styleUrls: ['./info-individus.component.css']
})
export class InfoIndividusComponent implements OnInit {
  private user: any;
  entity: string;
  dataUser: any;
  dataCIT: any;
  dataBanque: any;
  dataAdresse: any;
  dataFamille: any;
  dataConjoint: any;
  dataEnfant: any[] = [];
  libelleStatu: string;

  constructor(
    private infoService: InfoService,
    private travailleurService: TravailleurService,
    private employeurService: EmployeurService,
    private individuService: IndividuService,
    private adresseService: AdresseService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;
    this.infoService.getLibelleStatus(this.entity).subscribe(data => {
      if (data.success) {
        this.libelleStatu = data.msg.libelle_statut;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.adresseService.getTypeAdresse().subscribe(type => {
      if (type.success) {
        const listType = type.msg;
        for (const list of listType) {
          if (list.libelle === 'CORRESPONDANCE') {
            this.adresseService.getAdressByTravailleurAndType(this.user.id_acces, list.id_type).subscribe(adresse => {
              if (adresse.success) {
                this.dataAdresse = adresse.msg[0];
              } else {
                setTimeout(() => this.toastr.error(adresse.msg));
              }
            });
            break;
          }
        }
      } else {
        setTimeout(() => this.toastr.error(type.msg));
      }
    });
    this.infoService.infoIndiv(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataUser = data.msg;
        this.infoService.infoFiraisana(this.dataUser.id_firaisana_rel_fkt_naiss).subscribe(dataFir => {
          if (dataFir.success) {
            this.dataUser.firaisanaLibelle = dataFir.msg.libelle;
          } else {
            setTimeout(() => this.toastr.error(dataFir.msg));
          }
        });
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.infoService.infoCIT(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataCIT = data.msg;
        this.travailleurService.infoTravailleur(this.dataCIT[0].id_empl).subscribe(dataTravailleur => {
          if (dataTravailleur.success) {
            this.dataCIT.travailleur = dataTravailleur.msg;
          } else {
            setTimeout(() => this.toastr.error(dataTravailleur.msg));
          }
        });
        const yearsNow = (new Date()).getFullYear();
        const dataCITLast = this.dataCIT[0];
        if (+dataCITLast.annee !== yearsNow) {
          this.dataCIT.salaireData = dataCITLast.m12;
          this.dataCIT.avantageData = dataCITLast.avantage12;
        } else {
          const mois = +(new Date()).getMonth() + 1;
          this.dataCIT.salaireData = dataCITLast.Last.m + mois;
          this.dataCIT.avantageData = dataCITLast.avantage + mois;
          this.dataCIT.salaireData = dataCITLast['m' + mois];
          this.dataCIT.avantageData = dataCITLast['avantage' + mois];
        }
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.infoService.infoBanque(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataBanque = data.msg[0];
        if (this.dataBanque !== undefined) {
          const id_pays = this.dataBanque.id_pays;
          this.infoService.infoPays(id_pays).subscribe(dataPays => {
            if (dataPays.success) {
              this.dataBanque.libellePays = dataPays.msg.libelle;
            } else {
              setTimeout( () => this.toastr.error(dataPays.msg));
            }
          });
        }
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.infoService.infoFamille(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataFamille = data.msg;
        for (let i = 0; i < this.dataFamille.length; i++) {
          if (this.dataFamille[i].statut === 'CONJOINT') {
            this.dataConjoint = this.dataFamille[i];
          }
          if (this.dataFamille[i].statut === 'ENFANT') {
            this.dataEnfant.push(this.dataFamille[i]);
          }
        }
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.individuService.listHistoriqueTravailleur(this.user.id_access).subscribe(data => {
      if (data.success) {
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
}
