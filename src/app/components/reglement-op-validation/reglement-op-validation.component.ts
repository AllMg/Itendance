import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OpService } from '../../services/op/op.service';
import { ToastrService } from 'ngx-toastr';
import { InfoService } from '../../services/info/info.service';
import { TravailleurService } from '../../services/travailleur/travailleur.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-reglement-op-validation',
  templateUrl: './reglement-op-validation.component.html',
  styleUrls: ['./reglement-op-validation.component.css']
})
export class ReglementOpValidationComponent implements OnInit {
  id_op: string;
  dataOp: any;
  num_cheque: string;
  mode_paiement_libelle: string;
  lettre: string;
  dataUser: any;
  dataBenef: any;
  dataEmployeur: any;
  dataAdresse: any;
  dataNow = 'dd/MM/yyyy';
  montant: number;
  type: string;
  private user: any;
  entity: string;
  constructor(
    private route: ActivatedRoute,
    private opservice: OpService,
    private toatr: ToastrService,
    private infoService: InfoService,
    private travailleurService: TravailleurService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;
    this.dataNow = this.convertDate(this.dataNow);
    this.route.params.subscribe((params: Params) => {
      this.id_op = params['idOp'];
      this.opservice.findById(this.id_op).subscribe(data => {
        if (data.success) {
          this.dataOp = data.msg;
          console.log(this.dataOp);
          if (this.dataOp.tecbenef.length > 0) {
            this.mode_paiement_libelle = this.dataOp.tecbenef[0].id_mode_paiement.libelle;
            this.montant = this.dataOp.montant;
            this.infoService.infoIndiv(this.dataOp.tecbenef[0].id_individu).subscribe(dataInfoE => {
              if (dataInfoE.success) {
                this.dataUser = dataInfoE.msg;
              } else {
                setTimeout(() => this.toatr.warning('Travailleur : ' + dataInfoE.msg, 'chargement des données'));
              }
            });
            this.infoService.infoIndiv(this.dataOp.tecbenef[0].id_benef).subscribe(dataInfoE => {

              if (dataInfoE.success) {
                this.dataBenef = dataInfoE.msg;
              } else {
                setTimeout(() => this.toatr.warning('Bénificiaire : ' + dataInfoE.msg, 'Chargement des données'));
              }
            });
            this.infoService.infoCIT(this.dataOp.tecbenef[0].id_individu).subscribe(dataCI => {
              if (dataCI.success) {
                if (data.msg.length > 0) {
                  this.travailleurService.infoTravailleur(dataCI.msg[0].id_empl).subscribe(dataTravailleur => {
                    if (dataTravailleur.success) {
                      this.dataEmployeur = dataTravailleur.msg;
                    } else {
                      setTimeout(() => this.toatr.error(dataTravailleur.msg));

                    }
                  });
                } else {
                  setTimeout(() => this.toatr.warning('l\'individu ne possède pas d\'employeur', 'chargement des données'));
                }
              } else {
                setTimeout(() => this.toatr.error(dataCI.msg));
              }
            });
            this.infoService.infoAdresse(this.dataOp.tecbenef[0].id_benef).subscribe(dataAdr => {
              if (dataAdr.success) {
                this.dataAdresse = dataAdr.msg;
                this.dataAdresse = this.dataAdresse[0];
              } else {
                setTimeout(() => this.toatr.error(dataAdr.msg));
              }
            });
          } else {
            setTimeout(() => this.toatr.warning('Cet op ne possède pas de bénéficiaire', 'chargement des données'));
          }
          this.opservice.toLettre(Math.round(+this.dataOp.montant)).subscribe(dataR => {
            if (dataR.success) {
              this.lettre = dataR.msg.toUpperCase();
            } else {
              setTimeout(() => this.toatr.error(dataR.msg));
            }
          });
        } else {
          setTimeout(() => this.toatr.error(data.msg));
        }
      });
    });
  }

  saveSubmit() {
    if (this.dataOp.flag_valide === 'T') {
      this.toatr.error('Cet OP a déjà été validé');
    } else {
      if (this.dataOp !== undefined) {
        const dateNow = new Date();
        let idModePaiement = '';
        let idBenef = '';
        if (this.dataOp.tecbenef.length > 0) {
          idModePaiement = this.dataOp.tecbenef[0].id_mode_paiement;
          idBenef = this.dataOp.tecbenef[0].id_benef;
        }
        const reglementOP = {
          id_op: {
            id_op: this.dataOp.id_op
          },
          date_titre_paie: dateNow,
          montant_rgl: this.dataOp.montant,
          date_exec: dateNow,
          id_mode_paiement: idModePaiement
        };
        const reglementDetail = {
          id_benef: idBenef,
          flag_retour: 'N',
          num_cheque: this.num_cheque
        };
        this.opservice.insertReglement(reglementOP).subscribe(data => {
          if (data.success) {
            this.opservice.insertReglementDetail(reglementDetail).subscribe(dataResponse => {
              if (dataResponse.success) {
                this.dataOp.flag_valide = 'T';
                this.opservice.updateOp(this.dataOp).subscribe(dataResponseUpdate => {
                  if (dataResponseUpdate.success) {
                    this.toatr.success('OP ' + this.id_op + ' a été validé');
                    // ici
                    if (this.dataOp.tecbenef.length > 0 ) {
                      const msg = 'Votre demande de OP n° ' + this.dataOp.id_op + ' daté du ' + this.dataOp.date_op + ' a été validé';
                      const content = {
                        expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
                        destinataire: this.dataOp.tecbenef[0].id_individu,
                        titre: 'Validation OP',
                        message: msg,
                        typeNotif: 'Validation',
                        dateEnvoi: new Date()
                      };
                      this.notificationService.sendNotif(this.dataOp.tecbenef[0].id_individu, content).then(
                        () => {
                          this.toatr.success('Notification envoyé');
                        },
                        (err) => {
                          this.toatr.error('Notification non envoyé');
                        }
                      );
                    } else {
                      this.toatr.warning('Auncune notification envoyé cause : l\'OP ne possède pas de bénificiaire ');
                    }
                  } else {
                    this.toatr.error(dataResponseUpdate.msg);
                  }
                });
              } else {
                this.toatr.error(dataResponse.msg);
              }
            });
          } else {
            this.toatr.error(data.msg);
          }
        });
      } else {

        this.toatr.error('Les données des OP ne sont pas remplis coorectement');
      }
    }
  }
  onKey(event: any) {
    this.num_cheque = event.target.value;
  }
  convertDate(inputFormat) {
    const d = new Date();
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return `${day}/${month}/${year}`;
  }

}
