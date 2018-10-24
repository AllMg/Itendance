import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { NotificationService } from '../../../services/notification/notification.service';
import { InputService } from '../../../services/ij/input-service/input.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';
import { IjService } from '../../../services/ij/ij.service';
import { DatePipe } from '@angular/common';
import { FileService } from '../../../services/file/file.service';
import { IndividuService } from '../../../services/individu/individu.service';
import { Am2Service } from '../../../services/pf/am2/am2.service';

@Component({
  selector: 'app-am2',
  templateUrl: './am2.component.html',
  styleUrls: ['./am2.component.css']
})
export class Am2Component implements OnInit {

  public show: boolean;
  entity: string;
  user: any;
  referenceDemande: string;
  dateAccouchement: string;
  dateNaissance: string;
  dateArret: string;
  salaireDernierMois: number;
  employeur: string;
  code_prestation = 413;
  listeEnfant: any[] = [];
  ijForm: FormGroup;
  idDmdAm1: string;
  @Input() inputs: InputBase<any>[] = [];
  @Input() pieces: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private inputService: InputService,
    private fileService: FileService,
    private indivService: IndividuService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router,
    private ijService: IjService,
    private am2Service: Am2Service
  ) { 
    this.ijForm = this.fb.group({ });
    this.show = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.entity = this.user.type_entite;

    const ref = {
      "prestation": this.code_prestation,
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
        this.ijForm = this.inputService.addControlToFormGroup(this.ijForm,this.inputs);
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
        this.ijForm = this.inputService.addControlToFormGroupPcs(this.ijForm,this.pieces);
        console.log("ijform", this.ijForm.value)
      }
      else {
        this.toastr.error('Erreur: list libelle requis am 2 ' + data.msg);
      }
    });

    this.am2Service.getDemande(this.user.id_acces, 412).subscribe(data => {
      if (data.success){
        this.idDmdAm1 =  data.msg.id_acc;
        console.log(this.idDmdAm1)
        this.getListEnfant(this.idDmdAm1);
      }else {
        this.toastr.error('Erreur: demande am1 service am2 ' + data.msg);
      }
    });

  }

  getListEnfant(idDmdAm1){
    console.log("liste enfant")
    this.am2Service.listeEnfant(idDmdAm1).subscribe(data => {
      console.log("liste enfant")
      if(data.success){
        const enfants = data.msg;
        console.log(enfants)
        for(let i =0;i<enfants.length;i++){
          console.log(enfants[i])
          this.indivService.infoIndiv(enfants[i].matricule).subscribe(data => {
            if(data.success){
              console.log(data.msg)
              this.listeEnfant.push(data.msg);
              console.log(this.listeEnfant)
            }else{
              this.toastr.error('Erreur: service Individu ' + data.msg);
            }
          });
        }
      }else {
        this.toastr.error('Erreur: demande am1 service am2 ' + data.msg);
      }
    });
  }

  onSaveCLick() {
    this.show = true;
    const formValue = this.ijForm.value;

    let tecInfoNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.pieces);
    const tecInfRec = this.ijService.setTecInfRec(formValue, this.referenceDemande, tecInfoNonRequis);

    let tecPcsNonRequis = this.ijService.setValidFormDataForDynamicForms_toKeyArray(this.inputs);
    let tecPcsRec = this.ijService.setTecPcsRec(formValue,this.referenceDemande, tecPcsNonRequis);

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
      "tecPcsRecMod": tecPcsRec
    };
    this.am2Service.demandeAm2(msg).subscribe(data => {
      if(data.success){
        const Pcs = this.ijService.getTecPcsForMongo(formValue, tecPcsNonRequis);
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            Pcs[i][j].serviceName = "Demande AM2";
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
              titre: "Demande d'indemnité journalière deuxieme tranche",
              message: notifMessage,
              typeNotif: '',
              dateEnvoi: dateToday
            };
            this.notificationService.sendNotif(this.user.id_acces, content).then(() => {
                this.toastr.success('Notification envoyé');
              },(err) => {
                this.toastr.error('Notification non envoyé');
              }
            );
            this.routes.navigate(['/accueil-connecte']);
      }
    });
    
  }

}
