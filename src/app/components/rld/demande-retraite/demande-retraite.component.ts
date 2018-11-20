import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileService} from '../../../services/file/file.service';
import {ToastrService} from 'ngx-toastr';
import {MouvementService} from '../../../services/rh/mouvement.service';

@Component({
  selector: 'app-demande-retraite',
  templateUrl: './demande-retraite.component.html',
  styleUrls: ['./demande-retraite.component.css']
})
export class DemandeRetraiteComponent implements OnInit {
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
    this.formGroup = this._formBuilder.group({
      raison: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  save() {
    if (this.formGroup.valid) {
        console.log(this.filesValue);
        const result = this.formGroup.value;
        const data = {
          data: {
            info: {
              matricule: result.matricule,
              idservice: 2,
              idtype: 'M25',
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
          } else {
            this.toastr.error(returnResult.msg);
          }
        });
    } else {
      this.toastr.error('Veuillez vérifier les champs');
    }
  }

}
