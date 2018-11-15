import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AtmpService} from '../../../services/atmp/atmp.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InfoService} from '../../../services/info/info.service';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {FileService} from '../../../services/file/file.service';
import {FileModel} from '../../../models/file-model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-demande-ij',
  templateUrl: './demande-ij.component.html',
  styleUrls: ['./demande-ij.component.css']
})
export class DemandeIjComponent implements OnInit {
  demandeFormGroup: FormGroup;
  user: any;
  empl: any;
  file: any;
  id_save: any;
  libelle: any[];
  piece: any[];
  reference: string;
  referenceIPP: string;
  id_acc: string;
  pieceValue: FileModel[];
  pieceValueIPP: FileModel;
  infoPiece: any[];
  prestation: number;
  prestationIPP: number;
  id_individu: string;
  show = false;
  disabled = false;

  constructor(private routes: Router,
              private route: ActivatedRoute,
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
    this.prestation = 211;
    this.prestationIPP = 228;
    console.log(JSON.parse(localStorage.getItem('user')));
    this.pieceValueIPP = new FileModel();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_acc = params['id'];
      this.demandeService.getDemande(this.id_acc).subscribe(data => {
        if (data.success) {
          this.id_individu = data.msg.matricule;
        }
      });
    });
    this.demandeService.reference(42, this.prestation).subscribe(ref => {
      if (ref.success) {
        this.reference = ref.msg;
      } else {
        setTimeout(() => this.toastr.warning(ref.msg));
      }
    });
    this.demandeService.reference(42, this.prestationIPP).subscribe(ref => {
      if (ref.success) {
        this.referenceIPP = ref.msg;
      } else {
        setTimeout(() => this.toastr.warning(ref.msg));
      }
    });
    this.demandeService.libelle(this.prestation).subscribe(libelleDat => {
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
    this.demandeService.piece(this.prestation).subscribe(libelleDat => {
      if (libelleDat.success) {
        this.piece = libelleDat.msg;
        for (let i = 0; i < this.piece.length; i++) {
          this.demandeService.getPieceInfoRequise(this.piece[i].id_piece).subscribe(result => {
            if (result.success) {
              this.piece[i].infos = result.msg;
              for (let j = 0; j < result.msg.length; j++) {
                this.piece[i].infos[j].type = this.demandeService.findType(this.piece[i].infos[j].typeChamp);
                this.demandeFormGroup.addControl(this.piece[i].infos[j].idTypeInfo, new FormControl('', Validators.required));
              }
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
    this.demandeService.exist(this.reference).subscribe( exist => {
      if (exist.success) {
        if (!exist.success.msg.exist) {
          const infoRec = [];
          const piecesRec = [];
          const piecesRecIPP = [];
          const tecPcsInfoRecue = [];
          const tecPcsInfoRecueIPP = [];
          let canDoIPP = false;

          const cc = this.demandeFormGroup.value;
          if (this.demandeFormGroup.valid && this.filesIsValide()) {
            this.show = true;
            for (let i = 0; i < this.libelle.length; i++) {
              infoRec.push({
                id_type_info: this.libelle[i].id_type_info,
                valeur: cc[this.libelle[i].id_type_info],
                id_recu: '',
                id_acc: this.reference
              });
            }
            for (let i = 0; i < this.piece.length; i++) {
              for (let j = 0; j < this.piece[i].infos.length; j++) {
                const info = this.piece[i].infos[j];
                if (this.piece[i].id_piece === '212') {
                  if (info.idTypeInfo === 26) {
                    if (cc[info.idTypeInfo] > 0) {
                      canDoIPP = true;
                    }
                  }
                  tecPcsInfoRecueIPP.push({
                    idAcc: this.referenceIPP,
                    idPiece: this.piece[i].id_piece,
                    idTypeInfo: info.idTypeInfo,
                    valeurInfo: cc[info.idTypeInfo]
                  });
                }
                tecPcsInfoRecue.push({
                  idAcc: this.reference,
                  idPiece: this.piece[i].id_piece,
                  idTypeInfo: info.idTypeInfo,
                  valeurInfo: cc[info.idTypeInfo]
                });
              }
              if (this.piece[i].id_piece === '212') {
                piecesRecIPP.push({
                  id_acc: this.referenceIPP,
                  id_piece: this.piece[i].id_piece
                });
              }
              piecesRec.push({
                id_acc: this.reference,
                id_piece: this.piece[i].id_piece
              });
            }
            const demande = {
              'accueilMod': {
                'id_acc': this.reference,
                'id_empl': '',
                // 'id_individu': this.user.id_acces,
                'id_individu': this.id_individu,
                'id_succursale': null,
                'id_tec_dmd': this.prestation,
                'num_doss': null,
                'date_dossier': new Date()
              },
              'tecInfoRecuMod': infoRec,
              'tecPcsRecMod': piecesRec,
              'tecPcsInfoRecue': tecPcsInfoRecue
            };
            const demandeIPP = {
              'accueilMod': {
                'id_acc': this.referenceIPP,
                'id_empl': '',
                // 'id_individu': this.user.id_acces,
                'id_individu': this.id_individu,
                'id_succursale': null,
                'id_tec_dmd': this.prestationIPP,
                'num_doss': null,
                'date_dossier': new Date()
              },
              'tecInfoRecuMod': [],
              'tecPcsRecMod': piecesRecIPP,
              'tecPcsInfoRecue': tecPcsInfoRecueIPP
            };
            const data = {
              data: demande
            };
            const dataIPP = {
              data: demandeIPP
            };
            console.log(data);
            console.log(dataIPP);
            if (canDoIPP) {
              this.demandeService.new(dataIPP).subscribe(response => {
                if (response.success) {
                  this.toastr.success('Ouverture d`\'une demande ipp automatique');
                  this.demandeService.saveReferentielle(this.id_acc, this.referenceIPP).subscribe(resultRef => {
                    if (resultRef.success) {
                      this.toastr.success('Demande rente IPP rattachée à DAT n° ' + this.id_acc + 'avec success ');
                    } else {
                      this.toastr.error('Impossible de de rattachée la demande IPP à DAT n° ' + this.id_acc + 'cause : ' + resultRef.msg);
                    }
                  });
                  this.fileService.save(this.pieceValueIPP).subscribe( saveFile => {
                    if (saveFile.success) {
                    } else {
                      this.toastr.error(saveFile.msg, 'Erreur d\'enregistrement du fichier vers rente IPP');
                    }
                  });
                } else {
                  this.toastr.error(response.msg, 'Une erreur s\'est produite lors du sauvegarde de la demande');
                }
              });
            }
            this.demandeService.new(data).subscribe(response => {
              this.show = false;
              if (response.success) {
                this.toastr.success('Votre demande a été enregistré');
                this.disabled = true;
                this.demandeService.saveReferentielle(this.id_acc, this.reference).subscribe(resultRef => {
                  if (resultRef.success) {
                    this.toastr.success('Demande Ij rattachée à DAT n° ' + this.id_acc + 'avec success ');
                  } else {
                    this.toastr.error('Impossible de de rattachée la demande Ij à DAT n° ' + this.id_acc + 'cause : ' + resultRef.msg);
                  }
                });
                for (let i = 0; i < this.pieceValue.length; i++) {
                  this.fileService.save(this.pieceValue[i]).subscribe(fileResponse => {
                    if (!fileResponse.success) {
                      this.toastr.error(fileResponse.msg, 'Erreur d\'enregistrement du fichier');
                    }
                  });
                }
              } else {
                this.show = false;
                this.toastr.error(response.msg, 'Une erreur s\'est produite lors du sauvegarde de la demande');
              }
            });
          } else {
            this.toastr.error('Veuillez bien remplir le formulaire, merci', 'Champs d\'entrée');
          }
        } else {
          this.toastr.error('Cette demande existe déjà');
        }
      }
    });
  }

  onFileChange($event, indice: number) {
    this.readThis($event.target, indice);
  }

  readThis(inputValue: any, indice: number): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (e) => {
      this.pieceValue[indice].id_files = this.reference;
      this.pieceValue[indice].file = myReader.result;
      this.pieceValue[indice].serviceName = 'Demande Indaminité Journalière';
      this.pieceValue[indice].idType = this.piece[indice].id_piece;
      this.pieceValue[indice].name = this.piece[indice].libelle;
      if (this.piece[indice].id_piece === '212') {
        this.pieceValueIPP[indice].id_files = this.referenceIPP;
        this.pieceValueIPP[indice].file = myReader.result;
        this.pieceValueIPP[indice].serviceName = 'Demande Rente IPP';
        this.pieceValueIPP[indice].idType = this.piece[indice].id_piece;
        this.pieceValueIPP[indice].name = this.piece[indice].libelle;
      }
    };
  }

  filesIsValide(): boolean {
    let result = true;
    for (let i = 0; i < this.pieceValue.length; i++) {
      if (this.pieceValue[i].file === '' || this.pieceValue[i].file === undefined) {
        result = false;
        break;
      }
    }
    return result;

  }

}
