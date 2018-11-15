import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { InputBase } from '../../../services/ij/input-service/input-base';
import { InputService } from '../../../services/ij/input-service/input.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileModel } from '../../../models/file-model';
import { FileService } from '../../../services/file/file.service';
import { PenService } from '../../../services/pension/pen.service';
import { InfoService } from '../../../services/info/info.service';
import { DemandeReversionService } from '../../../services/reversion-pension/demande-reversion.service';

@Component({
  selector: 'app-detail-modif',
  templateUrl: './detail-modif.component.html',
  styleUrls: ['./detail-modif.component.css']
})
export class DetailModifComponent implements OnInit {
  show: boolean;
  show1: boolean;
  indice: any;
  fileQuery = new FileModel();
  piecesRec: any[];
  pensionClick: any;
  infoDemande: any;
  infoDemandeur: any;
  infoAyontDroit: any[];
  titre: string;
  listPcsMulti: any[];
  revForm: FormGroup;
  listPieceTemp: any[];
  listPieceAffiche: any[];
  referenceDemande: string;

  @Input() listPiece: InputBase<any>[] = [];
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private routes: Router,
    private fb: FormBuilder,
    private penService: PenService,
    private infoService: InfoService,
    private reversionService: DemandeReversionService,
    private inputService: InputService
  ) {
    this.revForm = this.fb.group({
    });
  }

  ngOnInit() {
    this.listPcsMulti = ['Certif de scolarité ', 'Certif de vie de l\'enfant', 'Acte de naissance de l\'enfant', 'Acte de naissanece de l\'enfant', 'Acte de reconnaissance de l\'enfant', 'Jugement supplétif de naissance'];
    this.show = true;
    this.show1 = false;
    this.infoAyontDroit = [];
    this.route.params.subscribe((params: Params) => {
      this.pensionClick = params['indice'];
    });
    this.penService.getTypeDemande(this.pensionClick.substring(0, 3)).subscribe(data => {
      if (data.success) {
        this.titre = data.msg.libelle;
      }
      else {
        this.show = false;
        this.toastr.error("Données inaccessibles.");
      }
    });
    this.penService.getDetailDemandePen(this.pensionClick).subscribe(data => {
      let avecAyantDroit = true;
      if (data.success) {
        this.infoDemande = data.msg;
        if (this.infoDemande.tecIndivAccMod.length <= 0) {
          avecAyantDroit = false;
        }
        this.getInfoIndivDemandeur(data.msg.accueilMod.id_individu);
        this.getTypePcsDemandeur(this.infoDemande.accueilMod.id_tec_dmd, avecAyantDroit);
        this.getInfoIndivAyant(this.infoDemande.tecIndivAccMod);
      }
      else {
        this.show = false;
        this.toastr.error("Données inaccessibles.");
      }
    });
  }

  getTypePcsDemandeur(type: string, avecAyantDroit: boolean) {
    this.show = true;
    this.listPieceAffiche = [];
    this.reversionService.getPiecesRequise(type).subscribe(data => {
      if (data.success) {
        this.listPieceTemp = data.msg;
        this.show = false;
        if (!avecAyantDroit) {
          this.setPcsSansEnfant();
          this.setPcs(this.listPieceAffiche);
        }
        else {
          this.setPcs(this.listPieceTemp);
        }
        this.show = false;
      }
      else {
        this.toastr.error('Erreur: list libelle requis Ij ' + data.msg);
      }
    });
  }
  setPcsSansEnfant() {
    for (let info of this.listPieceTemp) {
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

  getInfoIndivDemandeur(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        console.log("getInfoIndivDemandeu Data => ", data.msg);
        this.infoDemandeur = data.msg.nom + " " + data.msg.prenoms;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

  getInfoIndivAyant(ayantDroit: any[]) {
    console.log("Data AyantDroit =>", ayantDroit);
    if (ayantDroit.length > 0) {
      for (let info of ayantDroit) {
        if (info.individuType === "10") {
          this.infoService.infoIndiv(info.idIndividu).subscribe(data => {
            if (data.success) {
              console.log("getInfoIndivAyant =>", data.msg);
              this.infoAyontDroit.push(data.msg);
            } else {
              setTimeout(() => this.toastr.error(data.msg));
            }
          });
        }
      }
    }
    console.log("getInfoIndivAyant=> ", this.infoAyontDroit);
  }
  onSaveCLick() {
    this.show1 = true;
    const formValue = this.revForm.value;
    let tecPcsNonRequis = ["matriculeTravailleur", "matriculBenef"];
    const msg = {
      "idacc": this.pensionClick,
      "etat": 4
    };
    //const Pcs = this.reversionService.getTecPcsForMongo(formValue, tecPcsNonRequis);
    //console.log("PIECE =>", Pcs);
    this.penService.changerEtatDemandePension(msg).subscribe(data => {
      if (data.success) {
        this.toastr.success("Demande rejeter.");
        const Pcs = this.reversionService.getTecPcsForMongo(formValue, tecPcsNonRequis);
        for (let i = 0; i < Pcs.length; i++) {
          for (let j = 0; j < Pcs[i].length; j++) {
            //Insertion fichier mongo

            const condition = {
              "id_files": this.pensionClick,
              "name": Pcs[i][j].libelle
            };
            this.fileService.updateFile(condition, Pcs[i][j]).subscribe(fileResponse => {
              if (fileResponse.success) {
                this.toastr.success("Pièces en cours de vérification.");

                this.routes.navigate(['/accueil-connecte']);
              } else {
                this.toastr.error("Erreur enregistrement fichiers.");

              }
            });
            this.routes.navigate(['/liste-demande-pension']);
          }
        }
      }
    });
    //this.show = true;
  }
}
