import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {InputBase} from '../../services/ij/input-service/input-base';
import {InputService} from '../../services/ij/input-service/input.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification/notification.service';
import {DatePipe} from '@angular/common';
import {DemandeReversionService} from '../../services/reversion-pension/demande-reversion.service';
import {DemandeRappelService} from '../../services/rappel-pension/demande-rappel.service';
import {InfoService} from '../../services/info/info.service';
import {FamilleService} from '../../services/famille/famille.service';
import {FileService} from '../../services/file/file.service';
import {PenService} from '../../services/pension/pen.service';

@Component({
  selector: 'app-demande-reversion',
  templateUrl: './demande-reversion.component.html',
  styleUrls: ['./demande-reversion.component.css']
})
export class DemandeReversionComponent implements OnInit {
  public show: boolean;
  public show1: boolean;
  entity: string;
  user: any;
  _demandeur = true;
  revForm: FormGroup;
  referenceDemande: string;
  type: number;
  ref: any;
  listFamille = [];
  listEnfant = [];
  listFamilleUser = [];
  matriculeTravailleur: string;
  nomdemandeur: string;
  nombreAyantdroit: number;
  enfantChecked: any;
  listPcsMulti: any [];
  famil: any;
  infoIndiv: any;
  infoIndivUser: any;
  showMessage: boolean;
  showPcs: boolean;
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
    this.showPcs = true;
    this.ref = {
      'prestation': 319,
      'dr': '42'
    };
    this.enfantChecked = [];
    this.listPcsMulti = ['Certif de scolarité ', 'Certif de vie de l\'enfant', 'Acte de naissance de l\'enfant'];
  }

  ngOnInit() {
	let that = this;
    this.show1 = true;
    this.show = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.showMessage = true;
	console.log(this.user.id_acces);
    this.infoService.infoFamille(this.user.id_acces).subscribe(data => {
      if (data.success) {
        console.log('Data=>', data.msg);
        if (data.msg == null || data.msg.length == 0) {
          that.showMessage = false;
        }
		if (that.showMessage) {
			console.log("showMessage",that.showMessage);
		  that.listPieceAffiche = [];
		  that._demandeur = true;
		  that.type = 319;
		  that.matriculeTravailleur = '';
		  that.getTousInfo();
		  that.nombreAyantdroit = -1;
		} else {
			this.toastr.warning('Vous n\'êtes pas assigné a un travailleur.','Information');
		  that.routes.navigate(['/accueil-connecte']);
		}
      } else {
		  console.log("Erreur Data");
	  }
	  console.log("Data result ",data);
    });
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
	console.log("getTousInfo");
  }
  
  getAllSatatu(matricul: any) {
    let that = this;
    this.penService.getAllStatuIndiv(matricul).subscribe(data => {
      if (data.success) {
		  console.log("getAllSatatu =>",data);
        this.type = Number(that.verifTypeStatu(data.msg));
        that.getInfoFamilleUser(this.user.id_acces);
        console.log('getInfoIndividuUser => ', this.infoIndivUser);
      } else {
        this.show = false;
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
  
  verifTypeStatu(liste: any) {
    let result = null;
    for (let info  of liste) {
		console.log('info.statut => ',info);
      if (info != null && info.date_fin != null) {
        result = info.id_statut;
        break;
      }
    }
    if (result === 4) {
      return '319';
    } else if (result === 5) {
      return '320';
    }
	this.toastr.warning('Votre Statut ne vous permet pas d\'effectuer cette demande.','Information');
	this.routes.navigate(['/accueil-connecte']);
  }
  
  getInfoFamilleUser(matricule: string) {
    let that = this;
    this.familleService.infoFamille(matricule).subscribe(data => {
      if (data.success) {
        that.listFamilleUser = this.getConjointForUser(data.msg);
        for (let info of this.listFamilleUser) {
			console.log("info"+(1+1),info);
          that.matriculeTravailleur = info.matricule;
        }
        that.getInfoIndividu(that.matriculeTravailleur);
        console.log('getInfoFamilleUser => ', that.matriculeTravailleur);
      } else {
        this.toastr.error('Erreur reference famille travailleur :' + data.msg);
      }
    });
  }

  getInfoIndividu(matricul: string) {
    let that = this;
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        that.infoIndiv = data.msg;
        that.getInfoFamille(matricul);
        console.log('getInfoIndividu => ', this.infoIndivUser);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
  
    getInfoFamille(matricule: string) {
    let that = this;
    this.familleService.infoFamille(matricule).subscribe(data => {
      if (data.success) {
        this.listFamille = data.msg;
        this.listEnfant = this.getEnfant(this.listFamille);
        that.getInfoIndividuUser(this.user.id_acces);
        this.enfantChecked = [this.listEnfant.length];
      } else {
        this.toastr.error('Erreur reference famille travailleur :' + data.msg);
      }
    });
  }
  
  getInfoIndividuUser(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndivUser = data.msg;
        this.getTypePcsDemandeur(String(this.type));

      } else {
        this.show = false;
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
  
  getTypePcsDemandeur(type: string) {
    this.show = true;
    // this.infoIndiv = null;
    // this.listFamille = null;
    // this.listEnfant = null;
    this.listPieceAffiche = [];
    this.type = Number(type);
    this.reversionService.getPiecesRequise(type).subscribe(data => {
      if (data.success) {
        this.listPieceTemp = data.msg;

        
        if (type === '319') {
          this.setPcsSansEnfant();
          this.setPcs(this.listPieceAffiche);
        } else {
          this.setPcs(this.listPieceTemp);
        }
		this.getRefDemande(this.type);
        
      } else {
        this.show = false;
        this.toastr.error('Erreur: list libelle requis Ij ' + data.msg);
      }
    });
  }
  
  getRefDemande(type: number) {
    this.ref.prestation = type;
    this.reversionService.getRefPen(this.ref).subscribe(data => {
      if (data.success) {
        this.referenceDemande = data.msg;
		this.show = false;
      }
    });
  }
  
  getConjointForUser(listFamilleuser: any) {
    // const date = listFamille;
    const data = [];
    for (const donne of listFamilleuser) {
      if (donne.statut === 'TRAVAILLEUR' || donne.statut === 'PENSIONAIRE' || donne.statut === 'CONJOINT' || donne.statut === 'TIERS') {
        data.push(donne);
      }
    }
    return data;
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
    this.show = false;
  }

  getConjoint(listFamille: any) {
    // const date = listFamille;
    let data = [];
    for (const donne of listFamille) {
      if (donne.statut === 'CONJOINT') {
        data.push(donne);
      }
    }
    return data;
  }

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

  getNomPcs($event) {
    const dataR = $event.target.value;
    const libelle = dataR.replace(/ /g, '');
    if (libelle.length >= 3) {
      this.rapelleService.getPiecesRequise(libelle).subscribe(data => {
        if (data.success) {
          const listForm = data.msg;
          this.listTousPiece = this.reversionService.setValidFormDataForDynamicForms(listForm);

        } else {
          this.toastr.error('Erreur: list libelle requis Pension ' + data.msg);
        }
      });
    }
  }

  * setTecget() {
    console.log('Miditra setTecgetBenef');
    let result: any;
    for (const info of this.listFamille) {
      if (this.user.id_acces === info.matricule) {
        console.log('For Benf +> ' + info.matricule + ' == ' + this.user.id_acces);
        result = info;
      }
    }
    console.log('setTecgetBenef =>', this.user.id_acces);
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
    } else if (!checked) {
      this.nombreAyantdroit--;
      delete this.enfantChecked[indice];
    }
    if (this.type === 319) {
      if (this.nombreAyantdroit === -1) {
        this.setPcsSansEnfant();
        this.setPcs(this.listPieceAffiche);
      } else if (this.nombreAyantdroit === 0) {
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
    const infoTravailleur =  {
        idAcc: this.referenceDemande,
        idIndividu: this.matriculeTravailleur,
        individuType: 6
      };

    console.log('infoReq =>', infoReq);
    // infoReq.push(infoT);
    const msgAyantDroit = this.rapelleService.setTecIndividuAcc(infoReq, this.referenceDemande);
    if (this.type === 319) {
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
            Pcs[i][j].serviceName = 'Demande Réversion';
            this.fileService.save(Pcs[i][j]).subscribe(dataR => {
              if (dataR.success) {
                this.toastr.success('Fichier enregistré avec succes');
              } else {
                this.toastr.error(dataR.msg, 'Erreur d\'enregistrement du fichier');
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
      } else {
        this.show1 = true;
        console.log('Reversion onSaveCLick ' + JSON.stringify(data));
        this.toastr.error('Erreur demande :' + data.msg);
        // this.show = false;
      }
    });
  }
}
