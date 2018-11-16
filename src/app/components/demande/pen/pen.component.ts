import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileModel} from '../../../models/file-model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AtmpService} from '../../../services/atmp/atmp.service';
import {InfoService} from '../../../services/info/info.service';
import {ToastrService} from 'ngx-toastr';
import {FileService} from '../../../services/file/file.service';
import {DemandePensionService} from '../../../services/pension/demande-pension.service';

@Component({
  selector: 'app-pen',
  templateUrl: './pen.component.html',
  styleUrls: ['./pen.component.css']
})
export class PenComponent implements OnInit {
  demandeFormGroup: FormGroup;
  user: any;
  empl: any;
  file: any;
  id_save: any;
  libelle: any[];
  piece: any[];
  libelleDemande: string;
  reference: string;
  prestation: string;
  pieceValue: FileModel[];
  indivAcc: any[];
  constructor(private routes: Router,
              private _formBuilder: FormBuilder,
              private atmpService: AtmpService,
              private infoService: InfoService,
              private toastr: ToastrService,
              private fileService: FileService,
              private demandeService: DemandePensionService,
              private route: ActivatedRoute
  ) {
    this.demandeFormGroup = this._formBuilder.group({void: ['']});
    this.demandeFormGroup.removeControl('void');
    this.pieceValue = [];
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.prestation = params['prestation'];
      this.demandeService.libelleDemande(params['prestation']).subscribe(lib => {
        if (lib.success) {
          this.libelleDemande = lib.msg.libelle;
        } else {
          setTimeout(() => this.toastr.warning(lib.msg));
        }
      });
      this.demandeService.reference(42, this.prestation).subscribe(ref => {
        if (ref.success) {
          this.reference = ref.msg;
        } else {
          setTimeout(() => this.toastr.warning(ref.msg));
        }
      });
      this.demandeService.libellePen(this.prestation).subscribe(libellePen => {
        if (libellePen.success) {
          this.libelle = libellePen.msg;
          for (let i = 0; i < this.libelle.length; i++) {
            this.libelle[i].type = this.demandeService.findType(this.libelle[i].type_champ);
            this.demandeFormGroup.addControl(this.libelle[i].id_type_info, new FormControl('', Validators.required));
          }
        } else {
          setTimeout(() => this.toastr.warning(libellePen.msg));
        }
      });
      this.demandeService.piecePen(this.prestation).subscribe(libellePen => {
        if (libellePen.success) {
          this.piece = libellePen.msg;
          for (let i = 0; i < this.piece.length; i++) {
            this.pieceValue.push(new FileModel());
          }
        } else {
          setTimeout(() => this.toastr.warning(libellePen.msg));
        }
      });
      this.user = JSON.parse(localStorage.getItem('user'));
      this.infoService.infoCIT(this.user.id_acces).subscribe(data => {
        if (data.success) {
          if (data.msg[0]) {
            this.empl = data.msg[0].id_empl;
          } else {
            this.empl = null;
          }
        } else {
          setTimeout(() => this.toastr.warning(data.msg));
        }
      });
    });
  }

  saveDemande() {
    const infoRec = [];
    const piecesRec = [];

    const cc = this.demandeFormGroup.value;
    if (this.demandeFormGroup.valid && this.filesIsValide()) {
      for (let i = 0; i < this.libelle.length; i++) {
        infoRec.push({
          id_type_info: this.libelle[i].id_type_info,
          valeur: cc[this.libelle[i].id_type_info],
          id_recu: '',
          id_acc: this.reference
        });
      }
      for (let i = 0; i < this.piece.length; i++) {
        piecesRec.push({
          id_acc: this.reference,
          id_piece: this.piece[i].id_piece
        });
      }
      if (this.prestation !== '440') {
        this.indivAcc = [{
          idAcc: this.reference,
          idIndividu: this.user.id_acces,
          individuType: '6'
        }];
      } else {
        this.indivAcc = [];
      }
      const demande = {
        'accueilMod': {
          'id_acc': this.reference,
          'id_empl': null,
          'id_individu': this.user.id_acces,
          'id_succursale': null,
          'id_tec_dmd': this.prestation,
          'num_doss': null,
          'date_dossier': new Date()
        },
        'tecInfoRecuMod': infoRec,
        'tecPcsRecMod': piecesRec,
        'tecIndivAccMod': this.indivAcc
      };
      const data = {
        data: demande
      };
      console.log(data);
      this.demandeService.new(data).subscribe(response => {
        if (response.success) {
          this.toastr.success('Votre demande a été enregistré');
          console.log(this.pieceValue.length);
          for (let i = 0; i < this.pieceValue.length; i++) {
            this.fileService.save(this.pieceValue[i]).subscribe( fileResponse => {
              if (fileResponse.success) {
                this.toastr.success('Fichier enregistré avec succes');
              } else {
                this.toastr.error(fileResponse.msg, 'Erreur d\'enregistrement du fichier');
              }
            });
          }
        } else {
          this.toastr.error(response.msg, 'Une erreur s\'est produite lors du sauvegarde de la demande');
        }
      });
    } else {
      this.toastr.error('Veuillez bien remplir le formulaire, merci', 'Champs d\'entrée');
    }
  }
  onFileChange($event, indice: number) {
    console.log($event);
    this.readThis($event.target, indice);
  }
  readThis(inputValue: any, indice: number): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.pieceValue[indice].file = myReader.result;
      this.pieceValue[indice].id_files = this.reference;
      this.pieceValue[indice].serviceName = 'Demande majoration conjoint';
      this.pieceValue[indice].name = this.piece[indice].libelle;
    };
  }
  filesIsValide(): boolean {
    let result = true;
    for (let i = 0; i < this.pieceValue.length; i++) {
      if (this.pieceValue[i].file === '' || this.pieceValue[i].file ===  undefined) {
        result = false;
        break;
      }
    }
    return result;

  }

}
