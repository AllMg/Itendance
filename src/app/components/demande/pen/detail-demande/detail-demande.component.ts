import { Component, OnInit } from '@angular/core';
import {DemandePensionService} from '../../../../services/pension/demande-pension.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileModel} from '../../../../models/file-model';
import {FileService} from '../../../../services/file/file.service';

@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.css']
})
export class DetailDemandeComponent implements OnInit {
  detail: any;
  libelleDmd: string;
  libelle: any[];
  piece: any[];
  pieceValue: any[];
  detailForm: FormGroup;
  refdmd: string;
  fileQuery = new FileModel();
  pieceJointe: any[];
  image: any;
  prestation: string;
  accueil: string;
  constructor(private demandeService: DemandePensionService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private routes: Router,
              private _formBuilder: FormBuilder,
              private fileservice: FileService) {
    this.detailForm = this._formBuilder.group({void: ['']});
    this.detailForm.removeControl('void');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.demandeService.detail(params['accueil']).subscribe(demande => {
        if (demande.success) {
          this.detail = demande.msg;
          this.prestation = this.detail.accueilMod.id_tec_dmd;
          this.accueil = this.detail.accueilMod.id_acc;
          console.log(this.detail);
        } else {
          setTimeout(() => this.toastr.warning(demande.msg));
        }
        this.demandeService.libelleDemande(this.detail.accueilMod.id_tec_dmd).subscribe(lib => {
          if (lib.success) {
            this.libelleDmd = lib.msg.libelle;
          } else {
            setTimeout(() => this.toastr.warning(lib.msg));
          }
        });
        this.demandeService.libellePen(this.detail.accueilMod.id_tec_dmd).subscribe(lib => {
          if (lib.success) {
            this.libelle = lib.msg;
            for (let i = 0; i < this.libelle.length; i++) {
              this.libelle[i].type = this.demandeService.findType(this.libelle[i].type_champ);
              this.detailForm.addControl(this.libelle[i].id_type_info, new FormControl(this.detail.tecInfoRecuMod[i].valeur, Validators.required));
            }
          } else {
            setTimeout(() => this.toastr.warning(lib.msg));
          }
        });
        this.refdmd = this.detail.accueilMod.id_acc;
        this.fileQuery.id_files = this.refdmd;
        console.log('FILE: ' + this.refdmd);
        this.fileservice.readQuery(this.fileQuery).subscribe(data => {
          if (data.success) {
            this.pieceJointe = data.msg;
            for (let i = 0; i < this.pieceJointe.length; i++) {
              this.pieceJointe[i].ext = this.fileservice.extensionBase64(this.pieceJointe[i].file);
              this.pieceJointe[i].type = this.fileservice.typefileBase64(this.pieceJointe[i].file);
            }
          } else {
            setTimeout(() => this.toastr.warning(data.msg, 'chargement des pièce jointe'));
          }
        });
        this.demandeService.piecePen(this.detail.accueilMod.id_tec_dmd).subscribe(libellePen => {
          if (libellePen.success) {
            this.piece = libellePen.msg;
            for (let i = 0; i < this.piece.length; i++) {
              this.pieceValue.push(new FileModel());
            }
          } else {
            setTimeout(() => this.toastr.warning(libellePen.msg));
          }
        });
      });
    });
  }

  ChangeImgModal(val) {
    this.image = val;
  }

  onChangeEtat(acc: string, etat: number) {
    this.demandeService.change(acc, etat).subscribe(res => {
      if (res.success) {
        if (etat === 6) {
          this.toastr.success('Pièce a réclamer');
        } if (etat === 2) {
          this.toastr.success('A vérifier');
        } else {
          this.toastr.success('Valider');
        }
      } else {
        setTimeout(() => this.toastr.warning(res.msg));
      }
    });
  }

  onSaveEnfant() {
    this.routes.navigate(['/ajouter-enfant/' + this.accueil]);
  }

}
