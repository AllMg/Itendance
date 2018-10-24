import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {InputBase} from '../../services/ij/input-service/input-base';
import {InputService} from '../../services/ij/input-service/input.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {DatePipe} from '@angular/common';
import {InfoService} from '../../services/info/info.service';
import {FamilleService} from '../../services/famille/famille.service';
import {DemandeRappelService} from '../../services/rappel-pension/demande-rappel.service';
import {DemandeReversionService} from '../../services/reversion-pension/demande-reversion.service';
import {PenService} from '../../services/pension/pen.service';
import {FileService} from '../../services/file/file.service';

@Component({
  selector: 'app-ouverture-droit-asvt-pen',
  templateUrl: './ouverture-droit-asvt-pen.component.html',
  styleUrls: ['./ouverture-droit-asvt-pen.component.css']
})
export class OuvertureDroitAsvtPenComponent implements OnInit {
  public show: boolean;
  public show1: boolean;
  entity: string;
  user: any;
  _demandeur: boolean;
  revForm: FormGroup;
  referenceDemande: string;
  type: number;
  ref: any;
  listFamille: any = [];
  listEnfant: any = [];
  listFamilleUser: any[];
  matriculeTravailleur: string;
  nomdemandeur: string;
  nombreAyantdroit: number;
  enfantChecked: any;
  listPcsMulti: any [];
  famil: any;
  infoIndiv: any;
  infoBenef: any;
  infoIndivUser: any;
  showPcs: boolean;
  showMessage: boolean;
  listPieceTemp: any [];
  listPieceAffiche: any[];


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
    private familleService: FamilleService,
    private rapelleService: DemandeRappelService,
    private infoService: InfoService,
    private fileService: FileService,
    private penService: PenService
  ) {
    this.revForm = this.fb.group({
      'matriculeTravailleur': '',
      'matriculBenef': '',
    });

    this.showMessage = true;
    this.ref = {
      'prestation': 317,
      'dr': '42'
    };
    this.enfantChecked = {};
    this.listPcsMulti = ['Acte de naissance de l\'enfant', 'Acte de reconnaissance de l\'enfant', 'Jugement supplétif de naissance'];
  }

  ngOnInit() {
    this.show1 = true;
    this.show = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.showMessage = true;
    this.infoService.infoFamille(this.user.id_acces).subscribe(data => {
      if (data.succes) {
        console.log('Data=>', data.msg);
        if (data.msg == null || data.msg.length < 1) {
          this.showMessage = false;
        }
        if (this.showMessage) {
          this.listPieceAffiche = [];
          this._demandeur = true;
          this.type = 317;
          this.matriculeTravailleur = '';
          this.getTousInfo();
          this.nombreAyantdroit = -1;
        }
        else {
          this.toastr.warning('Vous n\'êtes pas assigné a un travailleur.', 'Information');
          this.routes.navigate(['/accueil-connecte']);
        }
      }
    });

    // this.getTousPcs();
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  clickDisableModale() {
    this.showMessage = true;
    this.routes.navigate(['/accueil-connecte']);
  }

  getTousInfo() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.user = "12037701108600142";
    this.getAllSatatu(this.user.id_acces);
    console.log('getTousInfo => ', this.matriculeTravailleur);
  }

  getConjointForUser(listFamilleuser: any) {
    // let date = listFamille;
    const data = [];
    for (const donne of listFamilleuser) {
      if (donne.statut === 'TRAVAILLEUR' || donne.statut === 'PENSIONAIRE' || donne.statut === 'CONJOINT' || donne.statut === 'TIERS') {
        data.push(donne);
      }
    }
    return data;
  }

  getAllSatatu(matricul: any) {
    this.penService.getAllStatuIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.type = Number(this.verifTypeStatu(data.msg));
        this.getInfoFamilleUser(this.user.id_acces);
        console.log('getInfoIndividuUser => ', this.infoIndivUser);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  verifTypeStatu(liste: any) {
    let result;
    for (const info  of liste) {
      if (info != null && info.date_fin != null) {
        console.log('info.statut => ' + info.id_statut);
        result = info.id_statut;
        break;
      }
    }
    if (result === 4) {
      return '317';
    }
    else if (result === 5) {
      return '318';
    }
    this.toastr.warning('Votre Statut ne vous permet pas d\'effectuer cette demande.', 'Information');
    this.routes.navigate(['/accueil-connecte']);
  }


  getInfoIndividuUser(matricul: string) {
    let that = this;
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndivUser = data.msg;
        that.getTypePcsDemandeur(String(this.type));
        console.log('getInfoIndividuUser => ', this.infoIndivUser);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  getInfoIndividu(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndiv = data.msg;
        this.getInfoFamille(matricul);
        this.getInfoIndividuUser(this.user.id_acces);
        console.log('getInfoIndividu => ', this.infoIndivUser);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  getTypePcsDemandeur(type: string) {
    let that = this;
    this.listPieceAffiche = [];
    this.getRefDemande(this.type);
    this.type = Number(type);
    this.reversionService.getPiecesRequise(type).subscribe(data => {
      if (data.success) {
        that.listPieceTemp = data.msg;
        that.show = false;
        that.getRefDemande(this.type);
        if (type === '317') {
          that.setPcsSansEnfant();
          that.setPcs(that.listPieceAffiche);
        }
        else {
          that.setPcs(that.listPieceTemp);
        }
        that.show = false;
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij ' + data.msg);
      }
    });
  }

  setPcsSansEnfant() {
    for (const info of this.listPieceTemp) {
      let cont = 0;
      for (let i = 0; i < this.listPcsMulti.length; i++) {
        if (info.libelle === this.listPcsMulti[i]) {
          cont++;
        }
      }
      if (cont === 0) {
        this.listPieceAffiche.push(info);
      }
    }
  }

  setPcs(listForm: any[]) {
    this.listPiece = this.reversionService.setValidFormDataForDynamicFormsPieces(listForm);
    this.revForm = this.inputService.addControlToFormGroupPcs(this.revForm, this.listPiece);
  }

  getRefDemande(type: number) {
    this.ref.prestation = type;
    this.reversionService.getRefPen(this.ref).subscribe(data => {
      if (data.success) {
        this.referenceDemande = data.msg;
      }
    });
  }

  getInfoFamille(matricule: string) {
    this.familleService.infoFamille(matricule).subscribe(data => {
      if (data.success) {
        this.listFamille = data.msg;
        this.listEnfant = this.getEnfant(this.listFamille);
        console.log('getInfoFamille enfant => ', this.listEnfant);
        this.enfantChecked = [this.listEnfant.length];
      }
      else {
        this.toastr.error('Erreur reference famille travailleur :' + data.msg);
      }
    });
  }

  getInfoFamilleUser(matricule: string) {
    const that = this;
    this.familleService.infoFamille(matricule).subscribe(data => {
      if (data.success) {
        this.listFamilleUser = this.getConjointForUser(data.msg);
        for (const info of this.listFamilleUser) {
          that.matriculeTravailleur = info.matricule;
        }
        this.getInfoIndividu(that.matriculeTravailleur);
        console.log('getInfoFamilleUser => ', that.matriculeTravailleur);
      }
      else {
        this.toastr.error('Erreur reference famille travailleur :' + data.msg);
      }
    });
  }

  getConjoint(listFamille: any) {
    // let date = listFamille;
    const data = [];
    for (const donne of listFamille) {
      if (donne.statut === 'CONJOINT') {
        data.push(donne);
      }
    }
    return data;
  }

  /*getInfoBenef(){
    for(let info of this.listFamille){
      if(info.statut !== "ENFANT"){
        this.infoService.infoFamille(info.matricule).subscribe(data => {
          if (data.success) {
            this.infoBenef.push(data.msg);
            this.show = false;
          } else {
            setTimeout(() => this.toastr.error(data.msg));
          }
        });
      }
    }
  }*/

  getEnfant(data: any) {
    const result = [];
    for (const donne of data) {
      if (donne.statut === 'ENFANT') {
        result.push(donne);
      }
    }
    return result;
  }

  clickDisablePcs() {
    this.showPcs = true;
  }

  clickShowPcs() {
    this.showPcs = false;
  }

  /*getTousPcs(){
    this.rapelleService.getLibellePiecesRequise().subscribe(data => {
      if (data.success) {
        const listForm = data.msg;
        this.listTousPiece = this.reversionService.setValidFormDataForDynamicForms(listForm);
      }
      else {
        this.toastr.error('Erreur: list libelle requis Pension ' + data.msg);
      }
    });
  }*/

  getNomPcs($event) {
    const data = $event.target.value;
    const libelle = data.replace(/ /g, '');
    if (libelle.length >= 3) {
      this.rapelleService.getPiecesRequise(libelle).subscribe(data => {
        if (data.success) {
          const listForm = data.msg;
          this.listTousPiece = this.reversionService.setValidFormDataForDynamicForms(listForm);

        }
        else {
          this.toastr.error('Erreur: list libelle requis Pension ' + data.msg);
        }
      });
    }
    else if (libelle.length === 0) {
      //this.getTousPcs();
    }
  }

  * setTecget() {
    console.log('Miditra setTecgetBenef');
    let result: any;
    for (const info of this.listFamille) {
      if (this.user.id_acces === info.matricule) {
        console.log('For Benf +> ' + info.matricule + ' == ' + this.user);
        result = info;
      }
    }
    console.log('setTecgetBenef =>', this.user);
    return result;
  }

  setTecgetTravailleur() {
    let result: any;
    for (const info of this.listFamilleUser) {
      if (this.matriculeTravailleur === info.matricule) {
        console.log('For Trav +> ' + info.matricule + ' == ' + this.matriculeTravailleur);
        result = info;
      }
    }
    console.log('setTecgetTravailleur =>', this.matriculeTravailleur);
    return result;
  }

  oncheckEnfant($event, matriculAyantDroit, indice) {
    const checked = $event.target.checked;
    const matricul = String(matriculAyantDroit.matricule);
    if (checked) {
      this.nombreAyantdroit++;
      this.enfantChecked[indice] = matriculAyantDroit;
    }
    else if (!checked) {
      this.nombreAyantdroit--;
      delete this.enfantChecked[indice];
    }
    if (this.type === 317) {
      if (this.nombreAyantdroit === -1) {
        this.setPcsSansEnfant();
        this.setPcs(this.listPieceAffiche);
      }
      else if (this.nombreAyantdroit === 0) {
        this.listPieceAffiche = this.listPieceTemp;
        this.setPcs(this.listPieceAffiche);
      }
    }
  }

  onSaveCLick() {
    this.show1 = false;
    const formValue = this.revForm.value;

    const tecLibNomRequis = this.reversionService.setValidFormDataForDynamicForms_toKeyArray(this.listPiece);
    const tecInfRec = this.reversionService.setTecInfRec(formValue, this.referenceDemande, tecLibNomRequis);

    const tecPcsNonRequis = ['matriculeTravailleur', 'matriculBenef'];
    const tecPcsRec = this.reversionService.setTecPcsRec(formValue, this.referenceDemande, tecPcsNonRequis);

    const infoReq = [];
    const i = 0;
    console.log('infoReq => ', this.enfantChecked);
    for (const info of this.enfantChecked) {
      console.log(info);
      if (info !== undefined && info.matricule !== undefined) {
        infoReq.push(info);
      }
    }
    console.log('infoReq => ', this.enfantChecked);
    // Benef 8
    // IdAcc Demandeur
    const infodemandeur = {
      idAcc: this.referenceDemande,
      idIndividu: this.user.id_acces,
      individuType: 8
    };
    // IdAcc Travailleur
    const infoTravailleur = {
      idAcc: this.referenceDemande,
      idIndividu: this.matriculeTravailleur,
      individuType: 6
    };

    console.log('infoReq =>', infoReq);
    // infoReq.push(infoT);
    const msgAyantDroit = this.rapelleService.setTecIndividuAcc(infoReq, this.referenceDemande);
    if (this.type === 317) {
      // Pensionnaire 6
      const infoBA = {
        idAcc: this.referenceDemande,
        idIndividu: this.user.id_acces,
        individuType: 9
      };
      msgAyantDroit.push(infoBA);
    }
    msgAyantDroit.push(infodemandeur);
    msgAyantDroit.push(infoTravailleur);
    const msg = {
      'accueilMod': {
        'id_acc': this.referenceDemande,
        'id_empl': null,
        'id_individu': this.user.id_acces,
        'id_succursale': null,
        'id_tec_dmd': String(this.type),
        'num_doss': '',
        'date_dossier': new Date()
      },
      'tecInfoRecuMod': [],
      'tecPcsRecMod': tecPcsRec,
      'tecIndivAccMod': msgAyantDroit
    };

    console.log('Reversion onSaveCLick result => ', msg);
    this.reversionService.demandePen(msg).subscribe(data => {
      console.log('Reversion onSaveCLick Premi');
      if (data.success) {
        const Pcs = this.reversionService.getTecPcsForMongo(formValue, tecPcsNonRequis);
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            Pcs[i][j].serviceName = 'Ouverture de droit ASVT';
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
        this.show1 = true;
        console.log('Reversion onSaveCLick ' + JSON.stringify(data));
        this.toastr.error('Erreur demande :' + data.msg);
        // this.show = false;
      }
    });
  }
}
