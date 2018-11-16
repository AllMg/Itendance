import {Component, OnInit} from '@angular/core';
import {InfoService} from '../../services/info/info.service';
import {DnService} from '../../services/dn/dn.service';
import {Router} from '@angular/router';
import {EmployeurService} from '../../services/employeur/employeur.service';
import {Location} from '@angular/common';
import {IndividuService} from '../../services/individu/individu.service';
import {CieService} from '../../services/cie/cie.service';
import {ToastrService} from 'ngx-toastr';
import {NotificationService} from '../../services/notification/notification.service';
import {PenService} from '../../services/pension/pen.service';
import {SoldeService} from '../../services/solde/solde.service';
import {TransfertCotisationService} from '../../services/transfert-cotisation/transfert-cotisation.service';
import {FamilleService} from '../../services/famille/famille.service';

@Component({
  selector: 'app-historique-indiv',
  templateUrl: './historique-indiv.component.html',
  styleUrls: ['./historique-indiv.component.css']
})
export class HistoriqueIndivComponent implements OnInit {
  public showDroit: boolean;
  public showSalaire: boolean;
  public showNotif: boolean;
  showTransfertLink: boolean;
  private user: any;
  entity: string;
  dataCIT: any;
  histoNofit: any;
  estLu = false;
  dataCIE: any;
  histo: any[] = [];
  id_acces: any;
  dataTransfert: any;

  dataOrdLiquide: any;
  findIsDLPR: boolean;
  findPenExist: boolean;
  matriculeTravailleur: string;
  listFamilleUser: any[];

  constructor(
    private infoService: InfoService,
    private indiService: IndividuService,
    private cieService: CieService,
    //private ciePeriodeService: CiePeriodeService,
    private dnService: DnService,
    private employeurService: EmployeurService,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private soldeService: SoldeService,
    private notifService: NotificationService,
    private penService: PenService,
    private transfertCotisationService: TransfertCotisationService,
    private familleService: FamilleService
  ) {
    this.showDroit = false;
    this.showSalaire = false;
    this.showNotif = false;
  }

  ngOnInit() {
    this.showDroit = true;
    this.showSalaire = true;
    this.showNotif = true;
    this.findPenExist = false;
    this.showTransfertLink = false;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;
    if (this.entity === 'E') {
      console.log('histo');
      this.dnService.getHistoriqueDn(this.user.id_acces, 4, 1).subscribe(data => {
        console.log(data);
        if (data.success) {
          let statut = '';
          for (let index = 0; index < data.msg.length; index++) {
            if (data.msg[index][2] === null) { statut = 'Non déclaré'; }
            if (data.msg[index][2] !== null) { statut = 'Déclaré'; }
            if (data.msg[index][3] !== null) { statut = 'Validé'; }
            this.histo.push({
              periode: data.msg[index][0],
              cotisation: data.msg[index][1],
              dateDeclaration: data.msg[index][2],
              dateValidation: data.msg[index][3],
              statut: statut
            });
          }
        } else {
          this.histo = [];
          this.toastr.error(data.msg);
        }
      });
    }

    this.indiService.listOrdLiquide(this.user.id_acces).subscribe(
      (dataRes) => {
        this.showDroit = false;
        this.dataOrdLiquide = dataRes.msg;
      }
    );
    this.listNotif(this.user.id_acces);
    if (this.user) {
      this.entity = this.user.type_entite;
    }
    this.infoService.infoCIT(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataCIT = data.msg;
        for (let i = 0; i < this.dataCIT.length; i++) {
          this.employeurService.infoEmployeur(this.dataCIT[i].id_empl).subscribe(dataTravailleur => {
            if (dataTravailleur.success) {
              this.dataCIT[i].travailleurData = dataTravailleur.msg;
              this.showSalaire = false;
            } else {
              this.toastr.error(dataTravailleur.msg);
              this.showSalaire = false;
            }
          });
        }
      } else {
        this.toastr.error(data.msg);
        this.showSalaire = false;
      }
    });
    this.cieService.listeCieByEmpl(this.user.id_acces).subscribe((data) => {
      const donne = data.msg;
      this.soldeService.listeSoldeByEmpl(this.user.id_acces).subscribe(
        (data) => {
          const solde = data.msg;
          let object = {
            periode: '',
            solde: ''
          };
          this.dataCIE = [];
          for (let i = 0, a = 0; i < donne.length; i++) {
            object = {
              periode: '',
              solde: ''
            };
            for (let contSolde = 0; contSolde < solde.length; contSolde++) {
              if (donne[i].periode === solde[contSolde].periode) {
                object.solde = solde[contSolde].montantSolde;
                break;
              }
            }
            if (donne[i].periode !== donne[i + 1].periode) {

              if (a < 4) {
                object.periode = donne[i].periode;
                this.dataCIE.push(object);
                a++;
              } else {
                break;
              }
            }
          }

        });
    });
  }

  onClickAnnee(annee) {
    this.router.navigate(['/historique-salaire-annee/' + annee]);
    location.reload();
  }

  onView(id: number) {
    this.router.navigate(['/historique-droit/' + id]);
  }

  onViewNotif(id: number) {
    this.router.navigate(['/historique-notification/' + id]);
  }

  listNotif(destinataire) {
    this.notifService.listeNotif(destinataire).subscribe(
      (dataRes) => {
        this.showNotif = false;
        this.histoNofit = dataRes.msg;
      }
    );
  }

  onTravailleurIjClick() {
    this.indiService.infoIndiv(this.user.id_acces).subscribe(data => {

      console.log('user', this.user);
      if (data.success) {
        const user = data.msg;
        const sexe = user.id_sexe.id_sexe.replace(/\s+/g, '');
        console.log('sexe', sexe);
        if (sexe == 'F') {
          this.router.navigate(['/ij']);
        } else {
          setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
        }
      } else {
        setTimeout(() => this.toastr.error('Erreur info individu'));
      }
    });
  }

  onTravailleurIj2Click() {
    this.indiService.infoIndiv(this.user.id_acces).subscribe(data => {

      console.log('user', this.user);
      if (data.success) {
        const user = data.msg;
        const sexe = user.id_sexe.id_sexe.replace(/\s+/g, '');
        console.log('sexe', sexe);
        if (sexe == 'F') {
          this.router.navigate(['/ij2']);
        } else {
          setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
        }
      } else {
        setTimeout(() => this.toastr.error('Erreur info individu'));
      }
    });
  }

  onTravailleurAm1Click() {
    this.indiService.infoIndiv(this.user.id_acces).subscribe(data => {

      console.log('user', this.user);
      if (data.success) {
        const user = data.msg;
        const sexe = user.id_sexe.id_sexe.replace(/\s+/g, '');
        console.log('sexe', sexe);
        if (sexe == 'F') {
          this.router.navigate(['/am1']);
        } else {
          setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
        }
      } else {
        setTimeout(() => this.toastr.error('Erreur info individu'));
      }
    });
  }

  onTravailleurAm2Click() {
    this.indiService.infoIndiv(this.user.id_acces).subscribe(data => {

      console.log('user', this.user);
      if (data.success) {
        const user = data.msg;
        const sexe = user.id_sexe.id_sexe.replace(/\s+/g, '');
        console.log('sexe', sexe);
        if (sexe == 'F') {
          this.router.navigate(['/am2']);
        } else {
          setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
        }
      } else {
        setTimeout(() => this.toastr.error('Erreur info individu'));
      }
    });
  }

  onTravailleurApClick() {
    this.indiService.infoIndiv(this.user.id_acces).subscribe(data => {

      console.log('user', this.user);
      if (data.success) {
        const user = data.msg;
        const sexe = user.id_sexe.id_sexe.replace(/\s+/g, '');
        console.log('sexe', sexe);
        if (sexe == 'F') {
          this.router.navigate(['/ap']);
        } else {
          setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
        }
      } else {
        setTimeout(() => this.toastr.error('Erreur info individu'));
      }
    });
  }

  onTravailleurFmClick() {
    this.indiService.infoIndiv(this.user.id_acces).subscribe(data => {

      console.log('user', this.user);
      if (data.success) {
        const user = data.msg;
        const sexe = user.id_sexe.id_sexe.replace(/\s+/g, '');
        console.log('sexe', sexe);
        if (sexe == 'F') {
          this.router.navigate(['/fm']);
        } else {
          setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
        }
      } else {
        setTimeout(() => this.toastr.error('Erreur info individu'));
      }
    });
  }

  onCiePeriode(periode) {
    this.router.navigate(['/historique-cie-periode/' + periode]);
  }

  link(periode) {
    // location.reload();
    this.router.navigate(['/dn/' + periode]);
  }

  findIsDemandeDLPR(type_prestation) {
    let result = false;
    const listeDLPRJson = {
      '317': ['317', '318', '319', '320'],
      '319': ['319', '320', '317', '318']
    };
    for (const info of listeDLPRJson[type_prestation]) {
      const msg = {
        individu: this.user.id_acces,
        type_etat: [7, 6, 5, 4, 3, 2, 1],
        prestation: info
      };
      this.penService.findIsDemandeIndividu(msg).subscribe(data => {
        if (data.success) {
          if (data.msg !== 'vide') {
            result = true;
          }
        }
      });
    }
  }

  onClickDemande(type_prestation) {
    const that = this;
    if (type_prestation === '317' || type_prestation === '318' || type_prestation === '319' || type_prestation === '320') {
      this.familleService.infoFamille(this.user.id_acces).subscribe(data => {
        if (data.success) {
          this.listFamilleUser = this.getConjointForUser(data.msg);
          for (const info of this.listFamilleUser) {
            that.matriculeTravailleur = info.matricule;
          }
          const msgPension = {
            'idtrav': that.matriculeTravailleur,
            'idBenef': that.user.id_acces
          };
          this.penService.findSiPensionExist(msgPension).subscribe(dataR => {
            if (dataR.success) {
              if (dataR.msg > 0) {
                this.toastr.warning('Votre droit a dèja été ouvert.', 'Information');
                that.findPenExist = true;
              } else {
                that.verifiDemande(type_prestation);
              }
            }
          });
        } else {
          this.toastr.error('Erreur reference famille travailleur :' + data.msg);
        }
      });
    } else {
      this.verifiDemande(type_prestation);
    }
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

  verifiDemande(type_prestation) {
    const msg = {
      individu: this.user.id_acces,
      type_etat: [7, 6, 5, 4, 3, 2, 1],
      prestation: type_prestation
    };
    this.penService.findIsDemandeIndividu(msg).subscribe(data => {
      if (data.success) {
        console.log('Data msg => ', data.msg);
        if (data.msg === 'vide') {
          if (type_prestation === '317') {
            if (!this.findIsDemandeDLPR(type_prestation)) {
              this.router.navigate(['/ouverture-droit-asvt-pen']);
            } else {
              if (data.msg.demandeMod.etat === 6) {
                this.toastr.warning('Pièce non conforme', 'Information');
                this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
              } else if (data.msg.demandeMod.etat === 5) {
                this.toastr.warning('Votre demande a été rejeté a cause de pièce manquante', 'Information');
                this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
              }
            }
          } else if (type_prestation === '319') {
            if (!this.findIsDemandeDLPR(type_prestation)) {
              this.router.navigate(['/demande-reversion-pen']);
            } else {
              if (data.msg.demandeMod.etat === 6) {
                this.toastr.warning('Pièce non conforme', 'Information');
                this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
              } else if (data.msg.demandeMod.etat === 5) {
                this.toastr.warning('Votre demande a été rejeté a cause de pièce manquante', 'Information');
                this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
              }
            }
          } else if (type_prestation === '335') {
            this.router.navigate(['/demande-revision-pen']);
          } else if (type_prestation === '331') {
            this.router.navigate(['/demande/331']);
          } else if (type_prestation === '332') {
            this.router.navigate(['/demande/332']);
          } else if (type_prestation === '441') {
            this.router.navigate(['/demande/441']);
          } else if (type_prestation === '442') {
            this.router.navigate(['/demande/442']);
          } else if (type_prestation === '40E') {
            this.router.navigate(['/demande/40E']);
          } else if (type_prestation === '311') {
            this.router.navigate(['/dlpr']);
          }
        } else {
          if (type_prestation !== '335') {
            if (data.msg.demandeMod.etat === 1) {
              this.toastr.warning('Vous ne pouvez plus effectuer de demande', 'Information');
            } else if (data.msg.demandeMod.etat === 6) {
              this.toastr.warning('Pièce non conforme', 'Information');
              this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
            } else if (data.msg.demandeMod.etat === 5) {
              this.toastr.warning('Votre demande a été rejeté a cause de pièce manquante', 'Information');
              this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
            }
          } else {
            if (data.msg.demandeMod.etat !== 1) {
              this.router.navigate(['/detail-modif/' + data.msg.accueilMod.id_acc]);
            }
          }

          if (data.msg.demandeMod.etat === 4) {
            this.toastr.warning('Votre demande est en attente de contrôle', 'Information');
          }
        }
      }
    });
  }

  // Transfert de cotisation click
  transfertClick() {
    this.showTransfertLink = true;
    this.transfertCotisationService.controleTransfert(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataTransfert = data.msg;
        if (this.dataTransfert.length != 0) {
          if (this.dataTransfert.etat == 'Ok') {
            this.toastr.warning('Vous avez déjà une demande de transfert de cotisation en cours.');
            this.showTransfertLink = false;
          } else if (this.dataTransfert.etat == 'Pièces a réclamer') {
            this.toastr.warning('Vous avez une ou des pièces non conformes.');
            this.router.navigate(['/detail-transfert-cotisation-pieces/' + this.user.id_acces]);
            this.showTransfertLink = false;
          } else if (this.dataTransfert.etat == 'Traitée') {
            this.toastr.warning('Vous avez déjà fait une demande de tranfert de cotisation.');
            this.showTransfertLink = false;
          }
        } else {
          this.toastr.success('Lien transfert cotisation disponible.');
          this.router.navigate(['/demande-transfert-cotisation']);
          this.showTransfertLink = false;
        }
      } else {
        this.toastr.error('Lien transfert cotisation indisponible.');
        this.showTransfertLink = false;
      }
    });
  }
}
