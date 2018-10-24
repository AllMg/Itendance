import { Component, OnInit } from '@angular/core';
import { Params } from '../../../../../../assets/fontawesome-free-5.0.9/advanced-options/use-with-node-js/fontawesome';
import { ActivatedRoute, Router } from '@angular/router';
import { IndividuService } from '../../../../../services/individu/individu.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IjPfService } from '../../../../../services/ij-pf/ij-pf.service';
import { FileService } from '../../../../../services/file/file.service';
import { EmployeurService } from '../../../../../services/employeur/employeur.service';
import { RfaService } from '../../../../../services/pf/rfa/rfa.service';
import { DatePipe } from '../../../../../../../node_modules/@angular/common';
import { NotificationService } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'app-details-rfa',
  templateUrl: './details-rfa.component.html',
  styleUrls: ['./details-rfa.component.css']
})
export class DetailsRfaComponent implements OnInit {

  public show: boolean;
  reference: any;
  tecInfo: any;
  individu: any;
  rfaForm: FormGroup;
  validForm: FormGroup;
  estSEM: boolean;
  estPF: boolean;
  user: any;
  tabSommeMedAvalide: any[] = [];
  factureValide = [];
  sommeMedicament = 0;
  montantAvalider = 0;
  checked: boolean;
  montantMedicament = 0;
  piece: any[] = [];
  employeur: any;
  sme = 0;
  sme40 = 0;
  montantDroit: any;
  id_empl: any;
  pieceJointeMessage: string;
  cant_validate: boolean;
  /* medicaments = [
     { id: 1, nom: 'paracetamol', prix: '2000' },
     { id: 2, nom: 'cotrime', prix: '4000' }
   ];*/
  medicaments: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private indivService: IndividuService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ijpf: IjPfService,
    private fileService: FileService,
    private employeurService: EmployeurService,
    private rfaService: RfaService,
    private router: Router,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
  ) {
    this.validForm = this.fb.group({
      'observations': ['']
    });
    this.rfaForm = this.fb.group({});
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite != 'P') {
      this.router.navigate(['/accueil-connecte']);
    }
    this.route.params.subscribe((params: Params) => {
      this.reference = params['id'];
      this.ijpf.getEtatDmd(this.reference).subscribe(data => {
        if (data.success) {
          this.cant_validate = data.msg.id_type_etat == 3 ? false : true;
        } else {
          this.toastr.error('Erreur get Etat Dmd :' + data.msg);
        }
      });
      console.log(this.reference);
      this.user = JSON.parse(localStorage.getItem('user'));
      // SI SEM
      if (this.user.type_entite === 'S') {
        this.estSEM = true;
        this.ijpf.detailsDemande(this.reference).subscribe(data => {
          if (data.success) {
            this.tecInfo = data.msg;
            this.medicaments = this.tecInfo.ordonnanceMod.ordFille;
            for (let i = 0; i < (this.medicaments).length; i++) {
              this.montantMedicament = this.montantMedicament + this.medicaments[i].total;
            }
            this.indivService.infoIndiv(this.tecInfo.accueilMod.id_individu).subscribe(data => {
              if (data.success) {
                this.individu = data.msg;
                console.log(this.individu);
              } else {
                this.toastr.error('info Indiv RFA error:RFA ' + data.msg);
              }
            });

            this.employeurService.infoEmployeur(this.tecInfo.accueilMod.id_empl).subscribe(data => {
              if (data.success) {
                this.employeur = data.msg;
                const today = Date.now();
                const date = new Date(today);
                const month = (date.getMonth()) + 1;
                const dateNow = date.getFullYear() + '-' + month + '-' + date.getDate();
                // maka valeur ray sme pour test
                this.rfaService.smeRfa(dateNow, this.employeur.id_activite.id_regime.id_regime).subscribe(data => {
                  if (data.success) {
                    this.sme = data.msg.smeMens;
                  } else {
                    this.toastr.error('error SME: ' + data.msg);
                  }

                });
                //console.log(this.employeur.id_activite.id_regime.id_regime);
                console.log(dateNow);
              }

            });
          } else {
            this.toastr.error('error getDemandeRFA error:RFA ' + data.msg);
          }
          // this.fileService.read(this.reference).subscribe(data => {
          //   if (data.success) {
          //     this.piece = data.msg;
          //   }
          // });
        });
      } else if (this.user.type_entite === 'P') {


        this.estPF = true;
        const tempo = {
          'id_acc': this.reference,
          'validationPF': true
        };
        this.rfaService.droitRFA(this.reference).subscribe(data => {
          if (data.success) {
            this.montantDroit = data.msg;
          }
        });
        this.rfaService.detailsRfa(tempo).subscribe(data => {
          if (data.success) {
            this.tecInfo = data.msg;
            this.medicaments = this.tecInfo.ordonnanceMod.ordFille;
            this.indivService.infoIndiv(this.tecInfo.accueilMod.id_individu).subscribe(data => {
              if (data.success) {
                this.individu = data.msg;
                console.log(this.individu);
              } else {
                this.toastr.error('info Indiv RFA error:RFA ' + data.msg);
              }
            });
            for (let i = 0; i < (this.medicaments).length; i++) {
              this.montantMedicament = this.montantMedicament + this.medicaments[i].total;
            }
            this.employeurService.infoEmployeur(this.tecInfo.accueilMod.id_empl).subscribe(data => {
              if (data.success) {
                this.employeur = data.msg;
                const today = Date.now();
                const date = new Date(today);
                const month = (date.getMonth()) + 1;
                const dateNow = date.getFullYear() + '-' + month + '-' + date.getDate();
                // maka valeur ray sme pour test
                this.rfaService.smeRfa(dateNow, this.employeur.id_activite.id_regime.id_regime).subscribe(data => {
                  if (data.success) {
                    this.sme = data.msg.smeMens;
                  } else {
                    this.toastr.error('error SME: ' + data.msg);
                  }

                });
                //console.log(this.employeur.id_activite.id_regime.id_regime);
                console.log(dateNow);
              }

            });
          } else {
            this.toastr.error('error getDemandeRFA error:RFA ' + data.msg);
          }
          // this.fileService.read(this.reference).subscribe(data => {
          //   if (data.success) {
          //     this.piece = data.msg;
          //   }
          // });

        });
      }
      this.fileService.read(this.reference).subscribe(data => {
        if (data.success) {
          this.piece = data.msg;
        }
      });
    });
  }

  onClickPiece(lien) {
    window.open(lien);
  }
  change(e, type) {
    let temp = {};
    if (e.target.checked) {
      this.tabSommeMedAvalide.push(type.total);
      temp = {
        'id_ref_ord_det': type.id_ref_ord_det,
        'designation': type.designation,
        'qt': type.qt,
        'valide': true,
        'total': type.total,
        'id_ref_rfa_ord': type.id_ref_rfa_ord
      };
      this.factureValide.push(temp);
      this.sommeMedicament = this.sommeMedicament + parseFloat(this.tabSommeMedAvalide[(this.tabSommeMedAvalide).length - 1]);
    } else {
      this.sommeMedicament = 0;
      const index = this.tabSommeMedAvalide.indexOf(type.total);
      const index1 = this.factureValide.indexOf(temp);
      this.tabSommeMedAvalide.splice(index, 1);
      this.factureValide.splice(index1, 1);
      for (let i = 0; i < (this.tabSommeMedAvalide).length; i++) {
        this.sommeMedicament = this.sommeMedicament + parseFloat(this.tabSommeMedAvalide[i]);
      }
      this.factureValide.push(temp);
      if (isNaN(this.sommeMedicament)) {
        this.sommeMedicament = 0;
      }
    }
  }
  pieceNonConforme() {
    const dataEtat = {
      'idacc': this.reference,
      'etat': 6
    };

    this.ijpf.changeEtatDemandeIj(dataEtat).subscribe(data => {
      if (data.success) {
        this.toastr.success('Success change etat');
        //const notifMessage = "Demande d'indemnite journaliere ref - " + this.reference + " : "+ this.pieceJointeMessage;
        const notifMessage = 'Demande de remboursement des fraix médicaux - ' + this.reference + ' : ' + this.pieceJointeMessage;
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
          destinataire: this.individu.id_individu,
          titre: 'Demande de remboursement des fraix médicaux',
          message: notifMessage,
          typeNotif: '',
          dateEnvoi: dateToday
        };
        this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
          this.toastr.success('Notification envoyé');
        }, (err) => {
          this.toastr.error('Notification non envoyé');
        });
        this.router.navigate(['/liste-demande-rfa']);
        //document.getElementById('piecesJointes').click();
        //this.routes.navigate(['/ij-pf']);
      } else {
        this.toastr.error('Error change etat');
      }
    });

  }
  validerDemande() {
    this.show = true;
    const formValue = this.validForm.value;
    const dataop = {
      'tecop': {
        'id_op': null,
        'id_acc': this.reference,
        'montant': parseFloat(this.montantDroit.replace(',', '.')),
        'flag_valide': 'O',
        'observations': formValue['observations'],
        'br_code': null,
        'date_op': null,
        'tecbenef': [
          {
            'id_op': null,
            'id_sucursale': '',
            'id_adresse': '',
            'id_benef': this.individu.id_individu,
            'id_compte': null,
            'id_empl': this.id_empl,
            //"id_empl": "",
            'id_individu': this.individu.id_individu,
            'id_mode_paiement': {
              'id_mode_paiement': 1,
              'libelle': 'Espece'
            }
          }
        ]
      },
      'prestation': '430',
      'dr': '42'
    };
    console.log(dataop);
    this.ijpf.saveToOP(dataop).subscribe(data => {
      if (data.success) {
        const idop = data.msg;
        this.toastr.success('Success save tec op');
        //change ETat
        const dataEtat = {
          'idacc': this.reference,
          'etat': 3
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
            this.toastr.success('Success save OP Demande RFA');

            const notifMessage = 'Votre demande de remboursement des fraix médicaux: ref - ' + this.reference + ' a ete valide.';
            const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const content = {
              expediteur: JSON.parse(localStorage.getItem('user')).id_acces,
              destinataire: this.individu.id_individu,
              titre: 'Demande de remboursement des fraix médicaux',
              message: notifMessage,
              typeNotif: '',
              dateEnvoi: dateToday
            };
            this.notificationService.sendNotif(this.individu.id_individu, content).then(() => {
              this.toastr.success('Notification envoyé');
            }, (err) => {
              this.toastr.error('Notification non envoyé');
            });

            this.router.navigate(['/liste-demande-rfa']);
          } else {
            this.toastr.error('Error save to op RFA');
          }
        });
      } else {
        this.toastr.error('Error save to tec_op');
      }
    });

  }
  validerSEM() {
    const cc = this.validForm.value;
    const dataEtat = {
      'idacc': this.reference,
      'etat': 2
    };
    this.ijpf.changeEtatDemandeIj(dataEtat).subscribe(data => {
      if (data.success) {
        this.toastr.success('Success change etat');
      } else {
        this.toastr.error('Error change etat');
      }
    });
    console.log(cc.observations);
    //this.sme = 168019;
    this.sme40 = ((this.sme) * 40) / 100;
    if (this.sommeMedicament <= this.sme40) {
      this.montantAvalider = this.sommeMedicament;
    } else {
      this.montantAvalider = this.sme40;
    }
    const data = {
      'id_acc': this.reference,
      'droit': this.montantAvalider,
      'ordfille': this.factureValide
    };
    this.rfaService.validerSME(data).subscribe(data => {
      if (data.success) {
        this.toastr.success('Success: Facture validé par SME');
        console.log(data.msg);
        this.montantDroit = data.msg;
        this.router.navigate(['/liste-demande-rfa']);
      } else {
        this.toastr.error('Error');
      }
    });


  }

  onModifTecInfReq() {
    const data = [
      {
        'id_acc': this.reference,
        'id_type_info': 65,
        'valeur': this.tecInfo.tecInfoRecuMod[0].valeur,
        'id_recu': 3800,
        'refAccInfoTypMod': {
          'id_type_info': 65,
          'libelle_info': this.tecInfo.tecInfoRecuMod[0].refAccInfoTypMod.libelle_info,
          'type_champ': 'D',
          'abbrev': 'DPT'
        }
      }
    ];
    this.rfaService.updateRfa(data).subscribe(data => {
      if (data.success) {
        this.toastr.success('Modification succes');
        location.reload();
      } else {
        this.toastr.error('Erreur lors de la modification' + data.msg);
      }
    });

  }


}
