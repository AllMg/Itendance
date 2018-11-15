import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router, ActivatedRoute, Params } from '../../../../../../../node_modules/@angular/router';
import { DatePipe } from '../../../../../../../node_modules/@angular/common';
import { ApService } from '../../../../../services/pf/ap/ap.service';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { EmployeurService } from '../../../../../services/employeur/employeur.service';
import { IndividuService } from '../../../../../services/individu/individu.service';
import { AdresseService } from '../../../../../services/adresse/adresse.service';
import { ToastrService } from '../../../../../../../node_modules/ngx-toastr';
import { FileService } from '../../../../../services/file/file.service';
import { FormBuilder, FormGroup } from '../../../../../../../node_modules/@angular/forms';
import { IjService } from '../../../../../services/ij/ij.service';

@Component({
  selector: 'app-details-ap',
  templateUrl: './details-ap.component.html',
  styleUrls: ['./details-ap.component.css']
})
export class DetailsApComponent implements OnInit {
  public show: boolean;
  detailsAp: any;
  reference: any;
  individu: any;
  adresseIndividu: any;
  estOk: boolean;
  tecInfo: any;
  droit: any;
  dateVisite: any;
  dpa: any;
  piece: any[] = [];
  apForm: FormGroup;
  validForm: FormGroup;
  pieceJointeMessage: string;
  employeur: any;
  id_empl: any;
  estTraite: boolean;
  cant_validate: boolean;
  champIjValueList: any[];
  user:any;
  constructor(
    private notificationService: NotificationService,
    private routes: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private apService: ApService,
    private ijpf: IjPfService,
    private empService: EmployeurService,
    private indivService: IndividuService,
    private adresseService: AdresseService,
    private toastr: ToastrService,
    private fileService: FileService,
    private fb: FormBuilder,
    private ijService: IjService,
  ) {
    this.validForm = this.fb.group({
      'observations': ['']
    });
    this.apForm = this.fb.group({});
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
          console.log(this.tecInfo);
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
              console.log(this.individu);

            } else {
              this.toastr.error('info Indiv AP error:AP ' + data.msg);
            }
          });
          /* this.adresseService.infoAdresse(this.detailsAp.id_individu).subscribe(data => {
             if (data.success) {
               this.adresseIndividu = data.msg[0];
             } else {
               this.toastr.error('infoIndiv AP error: AP ' + data.msg);
             }
           });*/

        } else {
          this.toastr.error('error getDemandeAP error:AP ' + data.msg);
        }
        this.fileService.read(this.reference).subscribe(data => {
          if (data.success) {
            this.piece = data.msg;
            //console.log(this.piece[0].file);
          }
        });

      });
      /*this.ijpf.listchampRequisVal(this.reference).subscribe(data => {
        if (data.success) {
          this.tecInfo = data.msg;
          // console.log(this.tecInfo);
        }
      });*/
      this.apService.droitAp().subscribe(data => {
        if (data.success) {
          this.droit = data.msg;
           console.log(this.droit);
        }
      });
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
      "prestation": "411",
      "dr": "42"
    };
    console.log(dataop);

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
            this.toastr.success('Success save OP Demande AP');

            const notifMessage = "Votre demande d'allocation prénatale: ref - " + this.reference + " a ete validé.";
            const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const content = {
              expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
              destinataire: this.individu.id_individu,
              titre: "Demande d'allocation prénatale",
              message: notifMessage,
              typeNotif: '',
              dateEnvoi: dateToday
            };
            this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
              this.toastr.success('Notification envoyé');
            }, (err) => {
              this.toastr.error('Notification non envoyé');
            });

            this.routes.navigate(['/liste-demande-ap']);
          } else {
            this.toastr.error('Error save to op IJ');
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
        const notifMessage = "Demande d'allocation prénatale ref - " + this.reference + " : " + this.pieceJointeMessage;
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
          destinataire: this.individu.id_individu,
          titre: "Demande d'allocation prénatale",
          message: notifMessage,
          typeNotif: '',
          dateEnvoi: dateToday
        };
        this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
          this.toastr.success('Notification envoyé');
        }, (err) => {
          this.toastr.error('Notification non envoyé');
        });


        //document.getElementById('piecesJointes').click();
        this.routes.navigate(['/liste-demande-ap']);
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
        "valeur": this.tecInfo.tecInfoRecuMod[2].valeur,
        "id_recu": 3050,
        "refAccInfoTypMod": {
          "id_type_info": 45,
          "libelle_info": this.tecInfo.tecInfoRecuMod[2].refAccInfoTypMod.libelle_info,
          "type_champ": "D",
          "abbrev": "DVT"
        }
      },
      {
        "id_acc": this.reference,
        "id_type_info": 46,
        "valeur": this.tecInfo.tecInfoRecuMod[0].valeur,
        "id_recu": 3051,
        "refAccInfoTypMod": {
          "id_type_info": 46,
          "libelle_info": this.tecInfo.tecInfoRecuMod[0].refAccInfoTypMod.libelle_info,
          "type_champ": "D",
          "abbrev": "DPA"
        }
      },
      {
        "id_acc": this.reference,
        "id_type_info": 48,
        "valeur": this.tecInfo.tecInfoRecuMod[1].valeur,
        "id_recu": 3052,
        "refAccInfoTypMod": {
          "id_type_info": 48,
          "libelle_info": this.tecInfo.tecInfoRecuMod[1].refAccInfoTypMod.libelle_info,
          "type_champ": "D",
          "abbrev": "DDD"
        }
      }
    ]
    this.apService.updateInfoAp(data).subscribe(data => {
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
