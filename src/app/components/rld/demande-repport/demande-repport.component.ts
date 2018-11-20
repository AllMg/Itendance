import {Component, OnInit} from '@angular/core';
import {FileService} from '../../../services/file/file.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MouvementService} from '../../../services/rh/mouvement.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-demande-repport',
  templateUrl: './demande-repport.component.html',
  styleUrls: ['./demande-repport.component.css']
})
export class DemandeRepportComponent implements OnInit {
  formGroup: FormGroup;
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
    this.service = 'R.H / Démission';
    this.id_demande = '';
    this.files_names = [];
    this.files_names.push({
      name: 'Preuve', multiple: true,
      type: 'application/msword, application/vnd.ms-excel, application/pdf, image/*'
    });
    this.formGroup = this._formBuilder.group({
      raison: ['', Validators.required],
      matricule: ['', Validators.required]
    });
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
        console.log(this.filesValue);
        const result = this.formGroup.value;
        const data = {
          data: {
            info: {
              matricule: result.matricule,
              idservice: 2,
              idtype: 'M24',
              idetat: 1,
              raison: result.raison,
              datedemande: new Date()
            },
            poste: []
          }
        };
        this.mouvementService.saveRecrutement(data).subscribe(returnResult => {
          if (returnResult.success) {
            this.toastr.success('Votre demande a été enregistré avec succès');
            this.id_demande = returnResult.msg.id;
            const sizeBase64 = this.filesValue.length;
            let value = true;
            let messageError = '';
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
            if (!value) {
              data.data.info.idetat = 3;
              this.mouvementService.saveRecrutement(data).subscribe(resUpdate => {
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

}
