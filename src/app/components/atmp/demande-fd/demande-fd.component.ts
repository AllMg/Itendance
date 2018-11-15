import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileService} from '../../../services/file/file.service';
import {FileModel} from '../../../models/file-model';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {AtmpService} from '../../../services/atmp/atmp.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {InfoService} from '../../../services/info/info.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-demande-fd',
  templateUrl: './demande-fd.component.html',
  styleUrls: ['./demande-fd.component.css']
})
export class DemandeFdComponent implements OnInit {
  demandeFormGroup: FormGroup;
  user: any;
  empl: any;
  file: any;
  id_save: any;
  libelle: any[];
  piece: any[];
  reference: string;
  id_acc: string;
  pieceValue: any[];
  infoPiece: any[];
  prestation: number;
  id_individu: string;
  disabled = false;
  show = false;
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
    this.prestation = 214;
    console.log(JSON.parse(localStorage.getItem('user')));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_acc = params['id'];
      this.demandeService.exist(this.id_acc).subscribe( existResult => {
        if (existResult.success) {
          if (!existResult.msg.exist) {
            this.disabled = true;
            this.toastr.error('la demande n\'existe pas, vous serez redirigé dans 3s');
            setTimeout( a => {
              this.routes.navigate(['/']);
            }, 3000);
          }
        }
      });
      this.demandeService.getDemande(this.id_acc).subscribe( data => {
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
    this.demandeService.libelle(this.prestation).subscribe(libelleDat => {
      if (libelleDat.success) {
        this.libelle = libelleDat.msg;
        for (let i = 0; i < this.libelle.length; i++) {
          this.libelle[i].type = this.demandeService.findType(this.libelle[i].type_champ);
          if (this.libelle[i].id_type_info === 82) {
            this.demandeFormGroup.addControl(this.libelle[i].id_type_info, new FormControl(''));
          } else {
            this.demandeFormGroup.addControl(this.libelle[i].id_type_info, new FormControl('', Validators.required));
          }
        }
      } else {
        setTimeout(() => this.toastr.warning(libelleDat.msg));
      }
    });
    this.demandeService.piece(this.prestation).subscribe(libelleDat => {
      if (libelleDat.success) {
        this.piece = libelleDat.msg;
        for (let i = 0; i < this.piece.length; i++) {
          this.demandeService.getPieceInfoRequise(this.piece[i].id_piece).subscribe( result => {
            if (result.success) {
              this.piece[i].infos = result.msg;
              for ( let j = 0; j < result.msg.length; j ++) {
                this.piece[i].infos[j].type = this.demandeService.findType(this.piece[i].infos[j].typeChamp);
                this.demandeFormGroup.addControl(this.piece[i].infos[j].idTypeInfo, new FormControl('', Validators.required));
              }
            } else {
              setTimeout(() => this.toastr.warning(libelleDat.msg));
            }
          });
          this.pieceValue.push([new FileModel()]);

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
          this.show = true;
          const infoRec = [];
          const piecesRec = [];
          const tecPcsInfoRecue = [];

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
              for (let j = 0; j < this.piece[i].infos.length; j++) {
                const info = this.piece[i].infos[j];
                tecPcsInfoRecue.push({
                  idAcc: this.reference,
                  idPiece: this.piece[i].id_piece,
                  idTypeInfo: info.idTypeInfo,
                  valeurInfo: cc[info.idTypeInfo]
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
            const data = {
              data: demande
            };
            console.log(cc);
            console.log(data);
            this.demandeService.new(data).subscribe(response => {
              if (response.success) {
                this.toastr.success('Votre demande a été enregistré');
                this.demandeService.saveReferentielle(this.id_acc, this.reference).subscribe( resultRef => {
                  this.show = false;
                  if (resultRef.success) {
                    this.toastr.success('Demande FD rattachée à DAT n° ' + this.id_acc + 'avec success ');
                    this.disabled = true;
                  } else {
                    this.toastr.error('Impossible de de rattachée la demande Ij à DAT n° ' + this.id_acc + 'cause : ' + resultRef.msg);
                  }
                });
                for (let i = 0; i < this.pieceValue.length; i++) {
                  for (let j = 0; j < this.pieceValue[i].length; j++) {
                    this.fileService.save(this.pieceValue[i][j]).subscribe( fileResponse => {
                      if (!fileResponse.success) {
                        this.toastr.error(fileResponse.msg, 'Erreur d\'enregistrement du fichier');
                      }
                    });
                  }
                }
              } else {
                this.show = false;
                this.toastr.error(response.msg, 'Une erreur s\'est produite lors du sauvegarde de la demande');
              }
            });
          } else {
            this.show = false;
            this.toastr.error('Veuillez bien remplir le formulaire, merci', 'Champs d\'entrée');
          }
        } else {
          this.toastr.error('Cette demande existe déjà');
        }
      }
    });
  }
  onFileChange($event, indice: number) {
    console.log($event);
    this.readThis($event.target, indice);
  }
  readThis(inputValue: any, indice: number): void {
    for ( let i = 0; i < inputValue.files.length ; i++) {
      const file: File = inputValue.files[i];
      const myReader: FileReader = new FileReader();
      myReader.readAsDataURL(file);
      this.pieceValue[indice] = [];
      const temp = new FileModel();
      myReader.onloadend = (e) => {
        temp.id_files = this.reference;
        temp.file = myReader.result;
        temp.serviceName = 'Demande Frais de déplacement / ATMP';
        temp.idType = this.piece[indice].id_piece;
        temp.name = this.piece[indice].libelle;
        this.pieceValue[indice].push(temp);
      };
    }
    console.log(this.pieceValue);
  }
  filesIsValide(): boolean {
    let result = true;
    for (let i = 0; i < this.pieceValue.length; i++) {
      if (this.pieceValue[i].length === 0 ) {
        result = false;
        break;
      }
    }
    return result;

  }
  testExist (){

  }
}
