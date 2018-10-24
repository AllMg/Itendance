import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { EmployeurService } from '../../../../../services/employeur/employeur.service';
import { InputService } from '../../../../../services/ij/input-service/input.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputBase } from '../../../../../services/ij/input-service/input-base';
import { IjService } from '../../../../../services/ij/ij.service';
import { IndividuService } from '../../../../../services/individu/individu.service';
import { AdresseService } from '../../../../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../../../../services/file/file.service';

@Component({
  selector: 'app-details-ij',
  templateUrl: './details-ij.component.html',
  styleUrls: ['./details-ij.component.css']
})
export class DetailsIjComponent implements OnInit {
  public show: boolean;
  idDmdIJ: string;
  dmdIJ: any;
  employeur: any;
  individu: any;
  adresseIndividu: any;
  pieceJointeMessage: string;
  ijForm: FormGroup;
  validForm: FormGroup;
  champIjValueList: any[];
  decompte: any;
  pieces: any[];
  cant_validate: boolean;
  @Input() inputs: InputBase<any>[] = [];
  user: any;
  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private routes: Router,
    private route: ActivatedRoute,
    private ijpfService: IjPfService,
    private empService: EmployeurService,
    private inputService: InputService,
    private fileService: FileService,
    private fb: FormBuilder,
    private ijService: IjService,
    private indivService: IndividuService,
    private adresseService: AdresseService,
    private toastr: ToastrService
  ) {
    this.validForm = this.fb.group({
      'observations': ['']
    });
    this.ijForm = this.fb.group({});
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P') {
      this.routes.navigate(['/accueil-connecte']);
    }
    this.route.params.subscribe((params: Params) => {
      this.idDmdIJ = params['id'];

      this.ijpfService.getEtatDmd(this.idDmdIJ).subscribe(data => {
        if (data.success) {
          this.cant_validate = data.msg.id_type_etat == 3 ? false : true;
        }
        else {
          this.toastr.error('Erreur get Etat Dmd :' + data.msg);
        }
      });

      this.fileService.read(this.idDmdIJ).subscribe(data => {
        if (data.success) {
          this.pieces = data.msg;
        } else {
          this.toastr.error('Erreur get Pieces jointe :' + data.msg);
        }
      });

      this.ijService.decompteIj(this.idDmdIJ).subscribe(data => {
        if (data.success) {
          this.decompte = data.msg;
          this.decompte.salaire = parseFloat(this.decompte.salaire).toFixed(2);
          this.decompte.demisalaire = parseFloat(this.decompte.demisalaire).toFixed(2);
          this.decompte.ij1 = parseFloat(this.decompte.ij1).toFixed(2);
          this.decompte.postnatale = parseFloat(this.decompte.postnatale).toFixed(2);
          this.decompte.prenatale = parseFloat(this.decompte.prenatale).toFixed(2);
        } else {
          this.toastr.error('Erreur get decompteij :' + data.msg);
        }
      });

      this.ijpfService.listchampRequisVal(this.idDmdIJ).subscribe(data => {
        if (data.success) {
          this.champIjValueList = data.msg;
          this.inputs = this.ijpfService.setValidFormDataForDynamicForms(this.champIjValueList);
          this.ijForm = this.inputService.toFormGroupIJPf(this.inputs);
          console.log("ijform value", this.ijForm.value)
        } else {
          this.toastr.error('listchampRequisVal error: ij-pf ' + data.msg);
        }
      });

      this.ijpfService.getDemandeIj(this.idDmdIJ).subscribe(data => {
        if (data.success) {
          this.dmdIJ = data.msg;
          this.empService.infoEmployeur(this.dmdIJ.id_empl).subscribe(data => {
            if (data.success) {
              this.employeur = data.msg;
            } else {
              this.toastr.error('infoemployeur ij error: ij-pf ' + data.msg);
            }
          });
          this.indivService.infoIndiv(this.dmdIJ.id_individu).subscribe(data => {
            if (data.success) {
              this.individu = data.msg;
            } else {
              this.toastr.error('infoIndiv ij error: ij-pf ' + data.msg);
            }
          });
          this.adresseService.infoAdresse(this.dmdIJ.id_individu).subscribe(data => {
            if (data.success) {
              this.adresseIndividu = data.msg[0];
            } else {
              this.toastr.error('infoIndiv ij error: ij-pf ' + data.msg);
            }
          });
        } else {
          this.toastr.error('error getDemandeIj error: ij-pf ' + data.msg);
        }
      });
    });
  }

  onClickPiece(lien) {
    window.open(lien);
  }

  onDecompteClick() {
    this.routes.navigate(['/decompte/' + this.idDmdIJ]);
  }

  onModifTecInfReq() {
    const formValue = this.ijForm.value;
    console.log('form value', formValue)
    const tecInfRec = this.ijpfService.setTecInfRec(formValue, this.idDmdIJ, this.champIjValueList);
    console.log('tec info requis', tecInfRec)

    this.ijService.updateIj(tecInfRec).subscribe(data => {
      if (data.success) {
        this.toastr.success('Données mise à jour');
        location.reload();
      }
      else {
        this.toastr.error('Erreur :' + data.msg);
      }
    });
  }

  onAcceptCLick() {
    this.show = true;
    const formValue = this.validForm.value;
    let dataop = {
      "tecop": {
        "id_op": null,
        "id_acc": this.idDmdIJ,
        "montant": parseFloat(this.decompte.ij1.replace(",", ".")),
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
            "id_empl": this.employeur.id_empl,
            "id_individu": this.individu.id_individu,
            "id_mode_paiement": {
              "id_mode_paiement": 1,
              "libelle": "Espece"
            }
          }
        ]
      },
      "prestation": "421",
      "dr": "42"
    };
    console.log(dataop)
    this.ijpfService.saveToOP(dataop).subscribe(data => {
      if (data.success) {
        const idop = data.msg;
        this.toastr.success('Success save tec op');
        //change ETat
        const dataEtat = {
          "idacc": this.idDmdIJ,
          "etat": 3
        };
        this.ijpfService.changeEtatDemandeIj(dataEtat).subscribe(data => {
          if (data.success) {
            this.toastr.success('Success change etat');
          } else {
            this.toastr.error('Error change etat');
          }
        });
        //save to Op Ij
        this.ijpfService.saveToOPforIj(idop, this.idDmdIJ).subscribe(data => {
          if (data.success) {
            this.toastr.success('Success save OP Demande Ij');

            const notifMessage = "Votre demande d'indemnite journaliere: ref - " + this.idDmdIJ + " a ete valide.";
            const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const content = {
              expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
              destinataire: this.individu.id_individu,
              titre: "Demande d'indemnité journalière",
              message: notifMessage,
              typeNotif: '',
              dateEnvoi: dateToday
            };
            this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
              this.toastr.success('Notification envoyé');
            }, (err) => {
              this.toastr.error('Notification non envoyé');
            });

            this.routes.navigate(['/decompte/' + idop]);
          } else {
            this.toastr.error('Error save to op IJ');
          }
        });
      } else {
        this.toastr.error('Error save to tec_op');
      }
    });
  }

  onPieceJointeClick() {
    const dataEtat = {
      "idacc": this.idDmdIJ,
      "etat": 6
    };
    this.ijpfService.changeEtatDemandeIj(dataEtat).subscribe(data => {
      if (data.success) {
        this.toastr.success('Success change etat');

        const notifMessage = "Demande d'indemnite journaliere ref - " + this.idDmdIJ + " : " + this.pieceJointeMessage;
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
          destinataire: this.individu.id_individu,
          titre: "Demande d'indemnité journalière",
          message: notifMessage,
          typeNotif: '',
          dateEnvoi: dateToday
        };
        this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
          this.toastr.success('Notification envoyé');
        }, (err) => {
          this.toastr.error('Notification non envoyé');
        });


        document.getElementById('piecesJointes').click();
        this.routes.navigate(['/ij-pf']);
      } else {
        this.toastr.error('Error change etat');
      }
    });
  }
}
