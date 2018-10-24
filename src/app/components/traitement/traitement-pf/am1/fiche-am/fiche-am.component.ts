import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Am1Service } from '../../../../../services/pf/am1/am1.service';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { EmployeurService } from '../../../../../services/employeur/employeur.service';
import { IndividuService } from '../../../../../services/individu/individu.service';
import { AdresseService } from '../../../../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { FileService } from '../../../../../services/file/file.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-fiche-am',
  templateUrl: './fiche-am.component.html',
  styleUrls: ['./fiche-am.component.css']
})
export class FicheAmComponent implements OnInit {
  public show: boolean;
  reference: string;
  tecInfo: any;
  employeur: any;
  individu: any;
  adresseIndividu: any;
  pieceJointeMessage: string;
  droit: any;
  enfant: any[];
  piece: any[] = [];
  dataEnfant: any[] = [];
  amForm: FormGroup;
  validForm: FormGroup;
  cant_validate: boolean;
  id_empl: any;
  user:any;
  constructor(
    private notificationService: NotificationService,
    private routes: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private amservice: Am1Service,
    private ijpf: IjPfService,
    private empService: EmployeurService,
    private indivService: IndividuService,
    private adresseService: AdresseService,
    private toastr: ToastrService,
    private fileService: FileService,
    private fb: FormBuilder
  ) {
    this.validForm = this.fb.group({
      'observations': ['']
    });
    this.amForm = this.fb.group({});
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P') {
      this.routes.navigate(['/accueil-connecte']);
    }
    this.route.params.subscribe((params: Params) => {
      this.reference = params['id'];
      this.ijpf.getEtatDmd(this.reference).subscribe(data => {
        if (data.success) {
          this.cant_validate = data.msg.id_type_etat == 3 ? false : true;
        }
        else {
          this.toastr.error('Erreur get Etat Dmd :' + data.msg);
        }
      });
      this.ijpf.detailsDemande(this.reference).subscribe(data => {
        if (data.success) {
          this.tecInfo = data.msg;
          if (this.tecInfo.accueilMod.id_empl != "") {
            this.empService.infoEmployeur(this.tecInfo.accueilMod.id_empl).subscribe(data => {
              if (data.success) {
                this.employeur = data.msg;
                this.id_empl = this.tecInfo.accueilMod.id_empl;
              } else {
                this.toastr.warning(data.msg);
              }
            });
          }
          else {
            this.id_empl = "";
          }

          this.indivService.infoIndiv(this.tecInfo.accueilMod.id_individu).subscribe(data => {
            if (data.success) {
              this.individu = data.msg;
            } else {
              this.toastr.error('info Indiv AM error: AM-1 ' + data.msg);
            }
          });
          var i = 0;
          for (i = 0; i < (this.tecInfo.refEnfantNeMod).length; i++) {
            // console.log(this.tecInfo.refEnfantNeMod[i].matricule);
            this.indivService.infoIndiv(this.tecInfo.refEnfantNeMod[i].matricule).subscribe(data => {
              if (data.success) {
                this.dataEnfant.push(data.msg);
                // this.dataEnfant = Array.of(this.dataEnfant);
                console.log(this.dataEnfant);
              }
            });
          }

          /* this.adresseService.infoAdresse(this.tecInfo.id_individu).subscribe(data => {
             if (data.success) {
               this.adresseIndividu = data.msg[0];
             } else {
               this.toastr.error('infoIndiv AM error: AM-1 ' + data.msg);
             }
           });*/
          /* this.amservice.getEnfAM(this.reference).subscribe(data => {
             if (data.success) {
               this.enfant = data;
             } else {
               this.toastr.error('infoIndiv AM error: AM-1 ' + data.msg);
             }
           });*/
        } else {
          this.toastr.error('error getDemandeAM error: AM-1 ' + data.msg);
        }
        this.fileService.read(this.reference).subscribe(data => {
          if (data.success) {
            this.piece = data.msg;
          }
        });

      });
      this.amservice.droitAM1(this.reference).subscribe(data => {
        if (data.success) {
          this.droit = data.msg;
          // console.log(this.droit);
        }
      })
    });
  }

  onClickPiece(lien) {
    window.open(lien);
  }

  validerDemande() {
    this.show = true;
    const formValue = this.validForm.value;
    let dataop = {
      "tecop": {
        "id_op": null,
        "id_acc": this.reference,
        "montant": parseFloat(this.droit.message.replace(",", ".")),
        "flag_valide": "O",
        "observations": formValue['observations'],
        "br_code": null,
        "date_op": null,
        "tecbenef": [
          {
            "id_op": null,
            "id_sucursale": "",
            "id_adresse": "",
            "id_benef": this.individu.id_individu,
            "id_compte": null,
            "id_empl": this.id_empl,
            //"id_empl": "",
            "id_individu": this.individu.id_individu,
            "id_mode_paiement": {
              "id_mode_paiement": 1,
              "libelle": "Espece"
            }
          }
        ]
      },
      "prestation": "412",
      "dr": "42"
    };
    console.log(dataop)
    this.ijpf.saveToOP(dataop).subscribe(data => {
      if (data.success) {
        const idop = data.msg;
        this.toastr.success('Success save tec op');
        //change ETat
        const dataEtat = {
          "idacc": this.reference,
          "etat": 3
        };
        this.ijpf.changeEtatDemandeIj(dataEtat).subscribe(data => {
          if (data.success) {
            this.toastr.success('Success change etat');
          } else {
            this.toastr.error('Error change etat');
          }
        });
        //save to Op Ij
        this.ijpf.saveToOPforIj(idop, this.reference).subscribe(data => {
          if (data.success) {
            this.toastr.success('Success save OP Demande AM1');

            const notifMessage = "Votre demande d'allocation de matérnité 1ère tranche: ref - " + this.reference + " a ete valide.";
            const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const content = {
              expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
              destinataire: this.individu.id_individu,
              titre: "Demande d'allocation de matérnité 1ère tranche",
              message: notifMessage,
              typeNotif: '',
              dateEnvoi: dateToday
            };
            this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
              this.toastr.success('Notification envoyé');
            }, (err) => {
              this.toastr.error('Notification non envoyé');
            });

            this.routes.navigate(['/liste-am1']);
          } else {
            this.toastr.error('Error save to op AM1');
          }
        });
      } else {
        this.toastr.error('Error save to tec_op');
      }
    });

  }

  pieceNonConforme() {
    const dataEtat = {
      "idacc": this.reference,
      "etat": 6
    };

    this.ijpf.changeEtatDemandeIj(dataEtat).subscribe(data => {
      if (data.success) {
        this.toastr.success('Success change etat');
        //const notifMessage = "Demande d'indemnite journaliere ref - " + this.reference + " : "+ this.pieceJointeMessage;
        const notifMessage = "Demande d'allocation de matérnité première tranche ref - " + this.reference + " : " + this.pieceJointeMessage;
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
          destinataire: this.individu.id_individu,
          titre: "Demande d'allocation de matérnité première tranche",
          message: notifMessage,
          typeNotif: '',
          dateEnvoi: dateToday
        };
        this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
          this.toastr.success('Notification envoyé');
        }, (err) => {
          this.toastr.error('Notification non envoyé');
        });
        this.routes.navigate(['/liste-am1']);
        //document.getElementById('piecesJointes').click();
        //this.routes.navigate(['/ij-pf']);
      } else {
        this.toastr.error('Error change etat');
      }
    });

  }

  onModifTecInfReq() {
    const data = [
      {
        "id_acc": this.reference,
        "id_type_info": 45,
        "valeur": this.tecInfo.tecInfoRecuMod[0].valeur,
        "id_recu": 3002,
        "refAccInfoTypMod": {
          "id_type_info": 45,
          "libelle_info": this.tecInfo.tecInfoRecuMod[0].refAccInfoTypMod.libelle_info,
          "type_champ": "D",
          "abbrev": "DVT"
        }
      },
      {
        "id_acc": this.reference,
        "id_type_info": 65,
        "valeur": this.tecInfo.tecInfoRecuMod[1].valeur,
        "id_recu": 3003,
        "refAccInfoTypMod": {
          "id_type_info": 65,
          "libelle_info": this.tecInfo.tecInfoRecuMod[1].refAccInfoTypMod.libelle_info,
          "type_champ": "D",
          "abbrev": "DPT"
        }
      }
    ]
    this.amservice.updateInfoAm1(data).subscribe(data => {
      if (data.success) {
        this.toastr.success('Modification succes');
        location.reload();
      }
      else {
        this.toastr.error('Erreur lors de la modification' + data.msg);
      }
    })
  }

}
