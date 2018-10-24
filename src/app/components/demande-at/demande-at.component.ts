import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AtmpService} from '../../services/atmp/atmp.service';
import {ToastrService} from 'ngx-toastr';
import {InfoService} from '../../services/info/info.service';
import {FileService} from '../../services/file/file.service';
import {FileModel} from '../../models/file-model';
import {DynamicAtmpService} from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';

@Component({
  selector: 'app-demande-at',
  templateUrl: './demande-at.component.html',
  styleUrls: ['./demande-at.component.css']
})
export class DemandeAtComponent implements OnInit {
  demandeFormGroup: FormGroup;
  user: any;
  empl: any;
  file: any;
  id_save: any;
  libelle: any[];
  piece: any[];
  reference: string;
  pieceValue: FileModel[];
  infoPiece: any[]
  show = false;
  disabled = false;
  constructor(private routes: Router,
              private _formBuilder: FormBuilder,
              private atmpService: AtmpService,
              private infoService: InfoService,
              private toastr: ToastrService,
              private fileService: FileService,
              private demandeService: DynamicAtmpService
  ) {
      this.demandeFormGroup = this._formBuilder.group({void: ['']});
      this.demandeFormGroup.removeControl('void');
      this.pieceValue = [];
  }

  ngOnInit() {
    this.demandeService.reference(42, 229).subscribe(ref => {
      if (ref.success) {
        this.reference = ref.msg;
      } else {
        setTimeout(() => this.toastr.warning(ref.msg));
      }
    });
    this.demandeService.libelleDAT().subscribe(libelleDat => {
      if (libelleDat.success) {
        this.libelle = libelleDat.msg;
        for (let i = 0; i < this.libelle.length; i++) {
          this.libelle[i].type = this.demandeService.findType(this.libelle[i].type_champ);
          this.demandeFormGroup.addControl(this.libelle[i].id_type_info, new FormControl('', Validators.required));
        }
      } else {
        setTimeout(() => this.toastr.warning(libelleDat.msg));
      }
    });
    this.demandeService.pieceDAT().subscribe(libelleDat => {
      if (libelleDat.success) {
        this.piece = libelleDat.msg;
        for (let i = 0; i < this.piece.length; i++) {
          this.demandeService.pieceDAT().subscribe( res => {
            if (res.success) {

            } else {
              setTimeout(() => this.toastr.warning(libelleDat.msg));
            }
          });
         this.pieceValue.push(new FileModel());

        }
      } else {
        setTimeout(() => this.toastr.warning(libelleDat.msg));
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
  }
  saveDemande() {
    this.show = true;
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
      const demande = {
        'accueilMod': {
          'id_acc': this.reference,
          'id_empl': '',
          'id_individu': this.user.id_acces,
          // 'id_individu': '01014501971790102',
          'id_succursale': null,
          'id_tec_dmd': '229',
          'num_doss': null,
          'date_dossier': new Date()
        },
        'tecInfoRecuMod': infoRec,
        'tecPcsRecMod': piecesRec
      };
      const data = {
        data: demande
      };
      console.log(data);
      this.demandeService.new(data).subscribe(response => {
        if (response.success) {
          this.toastr.success('Votre demande a été enregistré');
          this.show = false;
          this.disabled = true;
          for (let i = 0; i < this.pieceValue.length; i++) {
            this.fileService.save(this.pieceValue[i]).subscribe( fileResponse => {
              if (!fileResponse.success) {
                this.toastr.error(fileResponse.msg, 'Erreur d\'enregistrement du fichier');
                this.disabled = false;
              }
            });
          }
        } else {
          this.show = false;
          this.disabled = false;
          this.toastr.error(response.msg, 'Une erreur s\'est produite lors du sauvegarde de la demande');
        }
      });
    } else {
      this.show = false;
      this.disabled = false;
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
      this.pieceValue[indice].id_files = this.reference;
      this.pieceValue[indice].file = myReader.result;
      this.pieceValue[indice].serviceName = 'Demande ATMP';
      this.pieceValue[indice].idType = this.piece[indice].id_piece;
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
