import { Component, OnInit } from '@angular/core';
import { DemandeReversionService } from '../../../services/reversion-pension/demande-reversion.service';
import { PenService } from '../../../services/pension/pen.service';
import { InfoService} from '../../../services/info/info.service';
import { FamilleService } from '../../../services/famille/famille.service';
import { DemandeRappelService } from '../../../services/rappel-pension/demande-rappel.service';
import {FileService} from '../../../services/file/file.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-demande',
  templateUrl: './info-demande.component.html',
  styleUrls: ['./info-demande.component.css']
})
export class InfoDemandeComponent implements OnInit {
  user: any;
  listFamilleUser: any[];
  matriculeTravailleur: string;
  infoIndiv: any;
  infoIndivTravailleur: any;
  infoDemandePension: any;
  infoDemandeur: string;
  infoTravailleur: string;
  montantTotal: any;
  show = true;
  constructor(
    private toastr: ToastrService,
    private routes: Router,
    private reversionService: DemandeReversionService,
    private penService: PenService,
    private familleService: FamilleService,
    private rapelleService: DemandeRappelService,
    private infoService: InfoService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getInfoFamilleUser(this.user.id_acces);
  }
  getInfoFamilleUser(matricule: string) {
    const that = this;
    this.familleService.infoFamille(matricule).subscribe(data => {
      if (data.success) {
        this.listFamilleUser = this.getConjointForUser(data.msg);
        for (const info of this.listFamilleUser) {
          that.matriculeTravailleur = info.matricule;
        }
        this.getInfoIndividu(matricule);
        console.log('getInfoFamilleUser => ', that.matriculeTravailleur);
      } else {
        this.toastr.error('Erreur reference famille travailleur :' + data.msg);
      }
    });
  }
  getConjointForUser(listFamilleuser: any) {
    // let date = listFamille;
    const data = [];
    for (const donne of listFamilleuser) {
      if (donne.statut === 'TRAVAILLEUR' || donne.statut === 'PENSIONAIRE' || donne.statut === 'CONJOINT' || donne.statut === 'TIERS') {
        data.push(donne);
      }
    }
    return data;
  }

  getInfoIndividu(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndiv = data.msg;
        this.infoDemandeur = data.msg.nom + ' ' + data.msg.prenoms;
        this.getInfoIndividuTravailleur(this.matriculeTravailleur);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  getInfoIndividuTravailleur(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndivTravailleur = data.msg;
        this.infoTravailleur = data.msg.nom + ' ' + data.msg.prenoms;
        this.getInfoPension();
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
  getInfoPension() {
    const msg = {
      'idtrav': this.matriculeTravailleur,
      'idbenef': this.user.id_acces
    }
    this.penService.infoDemandePen(msg).subscribe(data => {
      if (data.success) {
		  console.log("Info pension => ",data.msg);
        if(data.msg !== undefined||data.msg==null ){
          this.infoDemandePension = data.msg;
          this.montantTotal = (this.infoDemandePension.tauxPercu * this.infoDemandePension.montant) / 100;
          this.show = false;
        } else{
          this.toastr.warning('Vous n\'aviez pas encore effectué une demande', 'Information');
          this.routes.navigate(['/accueil-connecte']);
        }
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
}
