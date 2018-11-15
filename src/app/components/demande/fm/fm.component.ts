import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { NotificationService } from '../../../services/notification/notification.service';
import { InputService } from '../../../services/ij/input-service/input.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';
import { IjService } from '../../../services/ij/ij.service';
import { DatePipe } from '@angular/common';
import { FmService } from '../../../services/fm/fm.service';
import { FileService } from '../../../services/file/file.service';

@Component({
  selector: 'app-fm',
  templateUrl: './fm.component.html',
  styleUrls: ['./fm.component.css']
})
export class FmComponent implements OnInit {
  public medical: Array<any> = [];
  public show: boolean;
  entity: string;
  user: any;
  referenceDemande: string;
  dateAccouchement: string;
  dateNaissance: string;
  dateArret: string;
  salaireDernierMois: number;
  // listEmployeur: any[];
  employeur: string;
  code_prestation = 430;

  fmForm: FormGroup;
  @Input() inputs: InputBase<any>[] = [];
  @Input() pieces: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private inputService: InputService,
    private fileService: FileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router,
    private ijService: IjService,
    private fmService: FmService
  ) {
    this.fmForm = this.fb.group({

    });
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;

    const ref = {
      "prestation": this.code_prestation.toString(),
      "dr": "42"
    }
    this.ijService.getRefIj(ref).subscribe(data => {
      if (data.success) {
        this.referenceDemande = data.msg;
      }
      else {
        this.toastr.error('Erreur reference am1 :' + data.msg);
      }
    });

    this.ijService.getListLibelle(this.code_prestation.toString()).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.inputs = this.ijService.setValidFormDataForDynamicForms(listForm);
        console.log("inputs", this.inputs);
        this.fmForm = this.inputService.addControlToFormGroup(this.fmForm, this.inputs);
        console.log("fmform", this.fmForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis am1 ' + data.msg);
      }
    });

    this.ijService.getPiecesRequise(this.code_prestation.toString()).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.pieces = this.ijService.setValidFormDataForDynamicFormsPieces(listForm);
        console.log("pieces", this.pieces);
        this.fmForm = this.inputService.addControlToFormGroupPcs(this.fmForm, this.pieces);
        console.log("fmform", this.fmForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij 2 ' + data.msg);
      }
    });
  }

  onSaveCLick() {
    const formValue = this.fmForm.value;

    let tecInfoNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.pieces);
    const tecInfRec = this.ijService.setTecInfRec(formValue, this.referenceDemande, tecInfoNonRequis);

    let tecPcsNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.inputs);
    let tecPcsRec = this.ijService.setTecPcsRec(formValue, this.referenceDemande, tecPcsNonRequis);

    const msg = {
      "accueilMod": {
        "id_acc": this.referenceDemande,
        "id_empl": null,
        "id_individu": this.user.id_acces,
        "id_succursale": null,
        "id_tec_dmd": this.code_prestation.toString(),
        "num_doss": "",
        "date_dossier": null
      },
      "tecInfoRecuMod": tecInfRec,
      "tecPcsRecMod": tecPcsRec,
      "ordonnanceMod": {
        "ordMere": {
          "id_acc": this.referenceDemande,
          "is_validate": null
        },
        "ordFille": this.medical
      }
    };

    console.log(this.medical)
    console.log(msg)

    if (this.medical.length != 0) {
      this.show = true;
      this.fmService.demandeFm(msg).subscribe(data => {
        if (data.success) {
          const Pcs = this.ijService.getTecPcsForMongo(formValue, tecPcsNonRequis);
          for (let i = 0; i < Pcs.length; i++) {
            for (let j = 0; j < Pcs[i].length; j++) {
              Pcs[i][j].serviceName = "Demande FM";
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
            titre: "Demande de remboursement de frais medicaux",
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
    else {
      this.toastr.info("Veuillez transcrire l'ordonnance dans le tableau");
    }

  }
  updateMother(param) {
    this.medical = param;
  }
  getvalmedoc() {
    console.log(this.medical);
  }

}
