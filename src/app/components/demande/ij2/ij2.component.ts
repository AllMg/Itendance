import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { NotificationService } from '../../../services/notification/notification.service';
import { InputService } from '../../../services/ij/input-service/input.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';
import { IjService } from '../../../services/ij/ij.service';
import { DatePipe } from '@angular/common';
import { Ij2Service } from '../../../services/ij2/ij2.service';
import { EmployeurService } from '../../../services/employeur/employeur.service';
import { FileService } from '../../../services/file/file.service';

@Component({
  selector: 'app-ij2',
  templateUrl: './ij2.component.html',
  styleUrls: ['./ij2.component.css']
})
export class Ij2Component implements OnInit {

  public show: boolean;
  entity: string;
  user: any;
  referenceDemandeIj: string;
  dateAccouchement: string;
  dateNaissance: string;
  dateArret: string;
  salaireDernierMois: number;
  listEmployeur: any[];
  employeur: string;
  code_prestation = 422;
  ij1: any;

  ijForm: FormGroup;
  @Input() inputs: InputBase<any>[] = [];
  @Input() pieces: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private ij2Service: Ij2Service,
    private ijService: IjService,
    private empService: EmployeurService,
    private fileService: FileService,
    private inputService: InputService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router
  ) {
    this.ijForm = this.fb.group({});
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;

    const ref = {
      'prestation': this.code_prestation.toString(),
      'dr': '42'
    };
    this.ijService.getRefIj(ref).subscribe(data => {
      if (data.success) {
        this.referenceDemandeIj = data.msg;
      } else {
        this.toastr.error('Erreur reference ij 2 :' + data.msg);
      }
    });

    this.ij2Service.getDemande(this.user.id_acces, 421).subscribe(data => {
      if (data.success) {
        this.ij1 = data.msg;
        console.log('ij1', this.ij1);
        let idemployeur = this.ij1.id_empl;
        console.log(idemployeur)

        let idij1 = this.ij1.id_acc;
        console.log(idij1)

        this.ij2Service.getnombredejourij1(idij1.toString()).subscribe(data => {
          if (data.success) {
            const nbjrij1 = data.msg;
            console.log('nbjrij1', nbjrij1);
            this.getInfoRecu(this.code_prestation.toString(), this.ij1.id_acc, nbjrij1);
          } else {
            this.toastr.error('Error getdemandeij1 in demandeIJ2 :' + data.msg);
          }
        });

        this.empService.infoEmployeur(idemployeur).subscribe(data => {
          if (data.success) {
            this.employeur = data.msg.employeur_nom;
            console.log('employeur', this.employeur);
          }
          else {
            this.toastr.error('Erreur: employeur requis ' + data.msg);
          }
        });

      } else {
        this.toastr.error('Error get demande ij1 in demandeIJ2 :' + data.msg);
      }
    });

    this.ijService.getPiecesRequise(this.code_prestation.toString()).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.pieces = this.ijService.setValidFormDataForDynamicFormsPieces(listForm);
        console.log('pieces', this.pieces);
        this.ijForm = this.inputService.addControlToFormGroupPcs(this.ijForm, this.pieces);
        console.log('ijform', this.ijForm.value);
      } else {
        this.toastr.error('Erreur: list libelle requis Ij 2 ' + data.msg);
      }
    });
  }

  getInfoRecu(code_prestation: string, id_acc, nbjr) {
    this.ijService.getListLibelle(code_prestation).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        console.log('listform', listForm);
        const exception: any[] = [{
          id_type_info: 52,
          val: '0',
          isrequired: true,
          readonly: false
        }, {
          id_type_info: 61,
          val: id_acc,
          isrequired: true,
          readonly: true
        }, {
          id_type_info: 62,
          val: nbjr,
          isrequired: true,
          readonly: true
        }
        ];
        this.inputs = this.ijService.setValidFormDataForDynamicForms2(listForm, exception);
        console.log('inputs', this.inputs);
        this.ijForm = this.inputService.addControlToFormGroup(this.ijForm, this.inputs);
        console.log('ijform', this.ijForm.value);
      } else {
        this.toastr.error('Erreur: list libelle requis Ij 2 ' + data.msg);
      }
    });
  }

  onSaveCLick() {
    this.show = false;
    const formValue = this.ijForm.value;

    const tecInfoNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.pieces);
    const tecInfRec = this.ijService.setTecInfRec(formValue, this.referenceDemandeIj, tecInfoNonRequis);

    let tecPcsNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.inputs);
    let tecPcsRec = this.ijService.setTecPcsRec(formValue, this.referenceDemandeIj, tecPcsNonRequis);

    const msg = {
      'accueilMod': {
        'id_acc': this.referenceDemandeIj,
        'id_empl': this.ij1.id_empl,
        'id_individu': this.user.id_acces,
        'id_succursale': null,
        'id_tec_dmd': this.code_prestation.toString(),
        'num_doss': '',
        'date_dossier': null
      },
      "tecInfoRecuMod": tecInfRec,
      "tecPcsRecMod": tecPcsRec
    };

    console.log("msg", msg)

    this.ij2Service.demandeIj2(msg).subscribe(data => {
      if (data.success) {
        const Pcs = this.ijService.getTecPcsForMongo(formValue, tecPcsNonRequis);
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            Pcs[i][j].serviceName = "Demande IJ2";
            this.fileService.save(Pcs[i][j]).subscribe(data => {
              if (data.success) {
                this.toastr.success('Fichier enregistré avec succes');
              } else {
                this.toastr.error(data.msg, 'Erreur d\'enregistrement du fichier');
              }
            });
          }
        }
        console.log("Pcs", Pcs)

        const notifMessage = "Votre demande a été prise en charge.";
        this.toastr.success(notifMessage);
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: this.user.id_acces,
          destinataire: this.user.id_acces,
          titre: "Demande d'indemnité journalière deuxieme tranche",
          message: notifMessage,
          typeNotif: '',
          dateEnvoi: dateToday
        };
        this.notificationService.sendNotif(this.user.id_acces, content).then(() => {
          this.toastr.success('Notification envoyé');
        }, (err) => {
          this.toastr.error('Notification non envoyé');
        }
        );
        this.routes.navigate(['/accueil-connecte']);
      }
    });

  }

}
