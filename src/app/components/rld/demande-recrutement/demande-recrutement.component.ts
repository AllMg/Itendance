import { Component, OnInit } from '@angular/core';
import {MouvementService} from '../../../services/rh/mouvement.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-demande-recrutement',
  templateUrl: './demande-recrutement.component.html',
  styleUrls: ['./demande-recrutement.component.css']
})
export class DemandeRecrutementComponent implements OnInit {
  user: any;
  formGroup: FormGroup;
  dataPost: any;
  constructor(
    private _formBuilder: FormBuilder,
    private mouvementService: MouvementService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.formGroup = this._formBuilder.group({
      raison: ['', Validators.required],
    });
  }
  getDataPost(value) {
    this.dataPost = value;
  }
  save() {
    if (this.formGroup.valid) {
      const result = this.formGroup.value;
      const data = {
        data : {
          info : {
            matricule: this.user.id_acces,
            idservice: 2,
            idtype: 'M23',
            idetat: 1,
            raison : result.raison,
            datedemande: new Date()
          },
          poste : this.dataPost
        }
      };
      this.mouvementService.saveRecrutement(data).subscribe( returnResult => {
        if (returnResult.success) {
          this.toastr.success( 'Votre demande a été enregistré avec succès');
        } else {
          this.toastr.error(returnResult.msg);
        }
      });
    } else {
      this.toastr.error('Veuillez vérifier les champs');
    }
    console.log(this.dataPost);
    console.log(this.formGroup.valid);
  }
}
