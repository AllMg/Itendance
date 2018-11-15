import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { NotificationService } from '../../../services/notification/notification.service';
import { InputService } from '../../../services/ij/input-service/input.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';
import { IjService } from '../../../services/ij/ij.service';
import { DatePipe } from '@angular/common';
import { ApService } from '../../../services/pf/ap/ap.service';
import { FileService } from '../../../services/file/file.service';

@Component({
  selector: 'app-ap',
  templateUrl: './ap.component.html',
  styleUrls: ['./ap.component.css']
})
export class ApComponent implements OnInit {

  public show: boolean;
  entity: string;
  user: any;
  referenceDemande: string;
  dateAccouchement: string;
  dateNaissance: string;
  dateArret: string;
  salaireDernierMois: number;
  listEmployeur: any[];
  employeur: string;
  code_prestation = 411;

  apForm: FormGroup;
  @Input() inputs: InputBase<any>[] = [];
  @Input() pieces: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private inputService: InputService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private fileService: FileService,
    private routes: Router,
    private ijService: IjService,
    private apService: ApService
  ) {
    this.apForm = this.fb.group({});
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;
    //const sexe = this.user.id_sexe.id_sexe.replace(/\s+/g, '');
    /*if (sexe != 'F') {
      this.toastr.error('Vous n' + "'" + 'êtes pas une femme');
      this.routes.navigate(['/accueil-connecte']);
    }*/

    const ref = {
      "prestation": this.code_prestation.toString(),
      "dr": "42"
    }
    this.ijService.getRefIj(ref).subscribe(data => {
      if (data.success) {
        this.referenceDemande = data.msg;
      }
      else {
        this.toastr.error('Erreur reference ap :' + data.msg);
      }
    });

    this.ijService.getListLibelle(this.code_prestation.toString()).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.inputs = this.ijService.setValidFormDataForDynamicForms(listForm);
        console.log("inputs", this.inputs);
        this.apForm = this.inputService.addControlToFormGroup(this.apForm, this.inputs);
        console.log("apform", this.apForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis ap ' + data.msg);
      }
    });

    this.ijService.getPiecesRequise(this.code_prestation.toString()).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.pieces = this.ijService.setValidFormDataForDynamicFormsPieces(listForm);
        console.log("pieces", this.pieces);
        this.apForm = this.inputService.addControlToFormGroupPcs(this.apForm, this.pieces);
        console.log("apform", this.apForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis ap ' + data.msg);
      }
    });
  }

  onSaveCLick() {
    this.show = true;
    const formValue = this.apForm.value;

    let tecInfoNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.pieces);
    let tecInfRec = this.ijService.setTecInfRec(formValue, this.referenceDemande, tecInfoNonRequis);

    let tecPcsNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.inputs);
    let tecPcsRec = this.ijService.setTecPcsRec(formValue, this.referenceDemande, tecPcsNonRequis);

    const msg = {
      "accueilMod": {
        "id_acc": this.referenceDemande,
        "id_empl": "",
        "id_individu": this.user.id_acces,
        "id_succursale": null,
        "id_tec_dmd": this.code_prestation.toString(),
        "num_doss": "",
        "date_dossier": null
      },
      "tecInfoRecuMod": tecInfRec,
      "tecPcsRecMod": tecPcsRec
    };
    console.log('msg', msg);
    this.apService.demandeAp(msg).subscribe(data => {
      if (data.success) {
        const Pcs = this.ijService.getTecPcsForMongo(formValue, tecPcsNonRequis);

        console.log("Pcs 1", Pcs)
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            Pcs[i][j].serviceName = "Demande AP";
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
          titre: "Demande d'allocation prenatale",
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
