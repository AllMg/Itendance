import { Component, OnInit, Input } from '@angular/core';
import { IjService } from '../../../services/ij/ij.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { InputService } from '../../../services/ij/input-service/input.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { FileService } from '../../../services/file/file.service';

@Component({
  selector: 'app-ij',
  templateUrl: './ij.component.html',
  styleUrls: ['./ij.component.css']
})

export class IjComponent implements OnInit {
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

  ijForm: FormGroup;
  @Input() inputs: InputBase<any>[] = [];
  @Input() pieces: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private ijService: IjService,
    private inputService: InputService,
    private fileService: FileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router
  ) {
    this.ijForm = this.fb.group({
      '49': ['', Validators.required],
      'employeur': ['', Validators.required]
    });
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;

    //reference ij
    const ref = {
      "prestation": 421,
      "dr": "42"
    }
    this.ijService.getRefIj(ref).subscribe(data => {
      if (data.success) {
        this.referenceDemandeIj = data.msg;
      }
      else {
        this.toastr.error('Erreur reference ij :' + data.msg);
      }
    });

    //list formulaire dynamic à afficher
    this.ijService.getListLibelle("421").subscribe(data => {
      console.log("69 inputs -> ", data);
      if (data.success) {
        const listForm = data.msg;
        this.inputs = this.ijService.setValidFormDataForDynamicForms(listForm);
        console.log("inputs", this.inputs);
        this.ijForm = this.inputService.addControlToFormGroup(this.ijForm, this.inputs);
        console.log("ijform", this.ijForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij ' + data.msg);
      }
    });

    this.ijService.getPiecesRequise("421").subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.pieces = this.ijService.setValidFormDataForDynamicFormsPieces(listForm);
        console.log("pieces", this.pieces);
        this.ijForm = this.inputService.addControlToFormGroupPcs(this.ijForm, this.pieces);
        console.log("ijform", this.ijForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij 2 ' + data.msg);
      }
    });

    this.ijService.getListEmployeur(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.listEmployeur = data.msg;
      }
      else {
        this.toastr.error('Erreur liste employeur :' + data.msg);
      }
    });
  }


  onSaveCLick() {
    this.show = true;
    const formValue = this.ijForm.value;

    let tecInfoNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.pieces);
    tecInfoNonRequis.push("employeur")
    const tecInfRec = this.ijService.setTecInfRec(formValue, this.referenceDemandeIj, tecInfoNonRequis);

    let tecPcsNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.inputs);
    tecPcsNonRequis.push("employeur")
    let tecPcsRec = this.ijService.setTecPcsRec(formValue, this.referenceDemandeIj, tecPcsNonRequis);


    this.ijService.controleIj11mois(this.user.id_acces).subscribe(data => {
      if (data.msg.message == "true") {

        const msg = {
          "accueilMod": {
            "id_acc": this.referenceDemandeIj,
            "id_empl": formValue['employeur'],
            "id_individu": this.user.id_acces,
            "id_succursale": null,
            "id_tec_dmd": "421",
            "num_doss": "",
            "date_dossier": null
          },
          "tecInfoRecuMod": tecInfRec,
          "tecPcsRecMod": tecPcsRec
        }
        console.log("message", msg);
        this.ijService.demandeIj(msg).subscribe(data => {
          if (data.success) {
            const Pcs = this.ijService.getTecPcsForMongo(formValue, tecPcsNonRequis);
            for (let i = 0; i < Pcs.length; i++) {
              for (let j = 0; j < Pcs[i].length; j++) {
                Pcs[i][j].serviceName = "Demande IJ1";
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
            const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
            const content = {
              expediteur: this.user.id_acces,
              destinataire: this.user.id_acces,
              titre: "Demande d'indemnité journalière",
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
          else {
            this.toastr.error('Erreur demande ij :' + data.msg);
            this.show = false;
          }
        });
      }
      else {
        setTimeout(() => this.toastr.error("La demande d'indemnité journalière n'est autorisée qu'après 11 mois si une demande a déja été validée."));
        this.show = false;
      }
    });
  }
}