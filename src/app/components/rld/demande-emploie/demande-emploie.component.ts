import {Component, OnInit} from '@angular/core';
import {MouvementService} from '../../../services/rh/mouvement.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {FileService} from '../../../services/file/file.service';

@Component({
  selector: 'app-demande-emploie',
  templateUrl: './demande-emploie.component.html',
  styleUrls: ['./demande-emploie.component.css']
})
export class DemandeEmploieComponent implements OnInit {
  user: any;
  formGroup: FormGroup;
  items: any[];

  service: string;
  id_demande: string;
  files_names: any[];
  filesValue: any[];
  valide: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private mouvementService: MouvementService,
    private fileService: FileService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.service = 'R.H / Postule';
    this.files_names = [];
    this.files_names.push({
        name: 'Fiche d\'accompagnement', multiple: false,
        type: 'application/msword, application/vnd.ms-excel, application/pdf, image/*'
      },
      {name: 'Lettre de motivation', multiple: false, type: 'application/msword, application/vnd.ms-excel, application/pdf, image/*'},
      {name: 'Curriculum Vitae', multiple: false, type: 'application/msword, application/vnd.ms-excel, application/pdf, image/*'},
      {name: 'Dîplomes', multiple: true, type: 'application/msword, application/vnd.ms-excel, application/pdf, image/*'});
    this.formGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      poste: ['', Validators.required]
    });
  }

  initData(data: any[]) {
    this.items = [];
    for (let i = 0; i < data.length; i++) {
      this.items.push({id: data[i].id_categorie, text: data[i].libelle});
    }
  }

  private initDataItem(data: any[]) {
    this.items = [];
    for (let i = 0; i < data.length; i++) {
      this.items.push({id: data[i].idposte, text: data[i].libelle});
    }
  }

  inputTyped(event) {
    const text = event.target.value;
    if (text.length === 19) {
      this.mouvementService.getDemande(text).subscribe(data => {
        if (data.success) {
          this.items = [];
          this.initDataItem(data.msg.poste);
        } else {
          this.toastr.error(data.msg);
        }
      });
    }
  }

  getFile(event) {
    this.filesValue = event;
  }

  getValide(event) {
    this.valide = event;
  }

  save() {
    if (this.formGroup.valid) {
      if (this.valide) {
        const result = this.formGroup.value;
        this.mouvementService.postule(result.nom, result.prenom, result.email, result.telephone, result.poste, 1).subscribe(
          returnResult => {
            if (returnResult.success) {
              this.id_demande = returnResult.msg.id;
              const sizeBase64 = this.filesValue.length;
              let value = true;
              let messageError = '';
              (async () => {
                await this.delay(500);
                for (let i = 0; i < sizeBase64; i++) {
                  const size2D = this.filesValue[i].length;
                  for (let j = 0; j < size2D; j++) {
                    this.fileService.save(this.filesValue[i][j]).subscribe(res => {
                      if (!res.success) {
                        value = false;
                        messageError = res.msg;
                      }
                    });
                  }
                }
              })();
              if (!value) {
                this.mouvementService.delete(this.id_demande).subscribe(resUpdate => {
                  if (resUpdate.success) {
                    this.toastr.error(messageError);
                  } else {
                    this.toastr.error(resUpdate.msg);
                  }
                });
              } else {
                this.toastr.success('Votre demande a été enregistré avec succès');
              }
            } else {
              this.toastr.error(returnResult.msg);
            }
          });
      } else {
        this.toastr.error('Veuillez remplir les pièces jointes');
      }
    } else {
      this.toastr.error('Veuillez vérifier les champs');
    }
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
