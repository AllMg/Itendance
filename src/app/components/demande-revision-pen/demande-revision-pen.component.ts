import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {InputBase} from '../../services/ij/input-service/input-base';
import {InputService} from '../../services/ij/input-service/input.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {DatePipe} from '@angular/common';
import {DemandeReversionService} from '../../services/reversion-pension/demande-reversion.service';
import {PenService} from '../../services/pension/pen.service';
import {InfoService} from '../../services/info/info.service';
import {FamilleService} from '../../services/famille/famille.service';
import {DemandeRappelService} from '../../services/rappel-pension/demande-rappel.service';
import {FileService} from '../../services/file/file.service';

@Component({
  selector: 'app-demande-revision-pen',
  templateUrl: './demande-revision-pen.component.html',
  styleUrls: ['./demande-revision-pen.component.css']
})
export class DemandeRevisionPenComponent implements OnInit {
  show: boolean;
  titre: string;
  entity: string;
  user: any;
  revForm: FormGroup;
  referenceDemande: string;
  type: number;
  ref: any;
  obj_demandeur: FormGroup;
  matriculeTravailleur: string;
  infoIndiv: any;
  nombrePiece: number;

  @Input() listPiece: InputBase<any>[] = [];
  @Input() listTousPiece: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private inputService: InputService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router,
    private reversionService: DemandeReversionService,
    private penService: PenService,
    private familleService: FamilleService,
    private rapelleService: DemandeRappelService,
    private infoService: InfoService,
    private fileService: FileService
  ) {
    this.revForm = this.fb.group({});

    this.ref = {
      'prestation': 335,
      'dr': '42'
    };
    this.nombrePiece = 1;
  }

  ngOnInit() {
    this.show = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('ngOnInit => ', this.user);
    this.recupTypePcsDemandeur('335');
    this.getTypeDemande('335');
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  getTypeDemande(id_demande: string) {
    this.penService.getTypeDemande(id_demande).subscribe(data => {
      if (data.success) {
        this.titre = data.msg.libelle;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  getInfoIndividu(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndiv = data.msg;
        this.matriculeTravailleur = matricul;
        this.show = false;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  recupTypePcsDemandeur(type: string) {
    this.type = Number(type);
    const nomRequi = {
      '33R': false,
      '33B': false,
      '33D': false
    };
    this.getRefDemande(this.type);
    this.reversionService.getPiecesRequise(type).subscribe(data => {
      if (data.success) {
        this.getInfoIndividu(this.user.id_acces);
        const listForm = data.msg;
        this.listPiece = this.reversionService.setValidFormDataForDynamicFormsPieces2(listForm, nomRequi);
        this.revForm = this.inputService.addControlToFormGroupPcs(this.revForm, this.listPiece);
        console.log('listForm =>', listForm);
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij ' + data.msg);
      }
    });
  }

  getRefDemande(type: number) {
    this.ref.prestation = type;
    this.reversionService.getRefPen(this.ref).subscribe(data => {
      if (data.success) {
        console.log('Data Ref=> ' + data);
        this.referenceDemande = data.msg;
      }
      else {
        this.toastr.error('Erreur reference ij :' + data.msg);
      }
    });
  }

  getTousPcs(type: string) {
    this.reversionService.getPiecesRequise(type).subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.listTousPiece = this.reversionService.setValidFormDataForDynamicForms(listForm);
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij ' + data.msg);
      }
    });
  }

  /* Input plus */
  onClickPlusPiece() {
    this.nombrePiece++;
  }

  onClickMoyenPiece() {
    if (this.nombrePiece > 1) {
      this.nombrePiece--;
    }
  }

  /* Fin input plus */

  onSaveCLick() {
    //console.log("Reversion onSaveCLick");
    const formValue = this.revForm.value;
    let tecPcsNonRequis = [];
    console.log('formValue=> ', formValue);
    const tecPcsRec = this.reversionService.setTecPcsRec(formValue, this.referenceDemande, tecPcsNonRequis);

    const msg = {
      'accueilMod': {
        'id_acc': this.referenceDemande,
        'id_empl': null,
        'id_individu': this.matriculeTravailleur,
        'id_succursale': null,
        'id_tec_dmd': String(this.type),
        'num_doss': '',
        'date_dossier': new Date()
      },
      'tecInfoRecuMod': [],
      'tecPcsRecMod': tecPcsRec,
      'tecIndivAccMod': []
    };

    console.log('Reversion onSaveCLick infoReq => ', msg);
    this.reversionService.demandePen(msg).subscribe(data => {
      console.log('Reversion onSaveCLick Premi');
      if (data.success) {
        const Pcs = this.reversionService.getTecPcsForMongo(formValue, tecPcsNonRequis);
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            Pcs[i][j].serviceName = 'Demande Révision';
            this.fileService.save(Pcs[i][j]).subscribe(data => {
              if (data.success) {
                this.toastr.success('Fichier enregistré avec succes');
              } else {
                this.toastr.error(data.msg, 'Erreur d\'enregistrement du fichier');
              }
            });
          }
        }
        this.toastr.success('Votre demande a été prise en compte');
        const notifMessage = 'Votre demande a été prise en charge.';
        const dateToday = this.datePipe.transform(new Date(Date.now()), 'yyyy-MM-dd');
        const content = {
          expediteur: this.user.id_acces,
          destinataire: this.user.id_acces,
          titre: 'Demande de réversion pension',
          message: notifMessage,
          typeNotif: '',
          dateEnvoi: dateToday
        };
        /*this.notificationService.sendNotif(this.user.id_acces, content).then(() => {
            this.toastr.success('Notification envoyé');
          },(err) => {
            this.toastr.error('Notification non envoyé');
          }
        );*/

        this.routes.navigate(['/accueil-connecte']);
      }
      else {
        console.log('Reversion onSaveCLick ' + JSON.stringify(data));
        this.toastr.error('Erreur demande :' + data.msg);
        this.show = false;
      }
    });
  }

}

