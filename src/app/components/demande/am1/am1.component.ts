import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { NotificationService } from '../../../services/notification/notification.service';
import { InputService } from '../../../services/ij/input-service/input.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';
import { IjService } from '../../../services/ij/ij.service';
import { Am1Service } from '../../../services/pf/am1/am1.service';
import { DatePipe } from '@angular/common';
import { FamilleService } from '../../../services/famille/famille.service';
import { FileService } from '../../../services/file/file.service';

@Component({
  selector: 'app-am1',
  templateUrl: './am1.component.html',
  styleUrls: ['./am1.component.css']
})
export class Am1Component implements OnInit {

  public show: boolean;
  entity: string;
  user: any;
  referenceDemande: string;
  dateAccouchement: string;
  dateNaissance: string;
  dateArret: string;
  salaireDernierMois: number;
  employeur: string;
  code_prestation = 412;

  listEnfant: any[];
  nombreAyantdroit: number;
  enfantChecked: any;
  listPcsMulti: any[];

  ijForm: FormGroup;
  @Input() inputs: InputBase<any>[] = [];
  @Input() pieces: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private am1Service: Am1Service,
    private ijService: IjService,
    private inputService: InputService,
    private familleService: FamilleService,
    private fileService: FileService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router
  ) {
    this.ijForm = this.fb.group({
      'enfants': this.fb.array([], Validators.required)
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
        this.ijForm = this.inputService.addControlToFormGroup(this.ijForm, this.inputs);
        console.log("ijform", this.ijForm.value)
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
        this.ijForm = this.inputService.addControlToFormGroupPcs(this.ijForm, this.pieces);
        console.log("ijform", this.ijForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis am1 ' + data.msg);
      }
    });

    this.reccupInfoFamille(this.user.id_acces);
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  reccupInfoFamille(matricule: string) {
    this.familleService.infoFamille(matricule).subscribe(data => {
      if (data.success) {
        this.listEnfant = data.msg;
        for (let i = 0; i < this.listEnfant.length; i++) {
          if (this.listEnfant[i].statut == "CONJOINT") {
            this.listEnfant.splice(i, 1);
          }
        }
      }
      else {
        this.toastr.error('Erreur reference famille travailleur :' + data.msg);
      }
    });
  }

  oncheckEnfant(value: string, isChecked: boolean) {
    const enfantFormArray = <FormArray>this.ijForm.controls.enfants;

    if (isChecked) {
      const enfant = {
        "id_ref_enfant_ne": null,
        "id_acc": this.referenceDemande,
        "matricule": value
      };
      enfantFormArray.push(new FormControl(enfant));
    } else {
      let index = enfantFormArray.controls.findIndex(x => x.value == value)
      enfantFormArray.removeAt(index);
    }
  }

  declarer(){
    this.routes.navigate(['/new-individus']);
  }

  onSaveCLick() {
    this.show = true;
    const formValue = this.ijForm.value;

    let tecInfoNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.pieces);
    tecInfoNonRequis.push("enfants");
    const tecInfRec = this.ijService.setTecInfRec(formValue, this.referenceDemande, tecInfoNonRequis);

    let tecPcsNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.inputs);
    tecPcsNonRequis.push("enfants");
    let tecPcsRec = this.ijService.setTecPcsRec(formValue, this.referenceDemande, tecPcsNonRequis);

    let listEnfants = formValue["enfants"];

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
      "tecPcsRecMod": tecPcsRec,
      "refEnfantNeMod": listEnfants
    };
    console.log(msg)
    console.log("enfants", listEnfants);

    this.am1Service.demandeAm1(msg).subscribe(data => {
      if (data.success) {

        const Pcs = this.ijService.getTecPcsForMongo(formValue, tecPcsNonRequis);
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            Pcs[i][j].serviceName = "Demande AM1";
            this.fileService.save(Pcs[i][j]).subscribe(data => {
              if (data.success) {
                this.toastr.success('Fichier enregistré avec succes');
              } else {
                this.toastr.error(data.msg, 'Erreur d\'enregistrement du fichier');
              }
            });
          }
        }
        console.log("Pcs",Pcs)

        const notifMessage = "Votre demande a été prise en charge.";
        this.toastr.success(notifMessage);
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: this.user.id_acces,
          destinataire: this.user.id_acces,
          titre: "Demande d'allocation de maternité premiere tranche",
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
