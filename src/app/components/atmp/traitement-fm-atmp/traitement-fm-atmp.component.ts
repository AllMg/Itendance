import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-traitement-fm-atmp',
  templateUrl: './traitement-fm-atmp.component.html',
  styleUrls: ['./traitement-fm-atmp.component.css']
})
export class TraitementFmAtmpComponent implements OnInit {
  id_acc: string;
  exist: boolean;
  medicaments: any;
  medoc: any[];
  tabSommeMedAvalide: any[];
  dat: any;

  constructor(
    private routes: Router,
    private route: ActivatedRoute,
    private demandeAtmpService: DynamicAtmpService,
    private toatr: ToastrService
  ) {
    this.tabSommeMedAvalide = [];
    this.medoc = [];
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_acc = params['id'];
      if (this.id_acc.substring(0, 3) !== '212') {
        this.toatr.error('la reférence n\'est pas une demande de frais médicaux, vous serez redirigé');
        setTimeout( () => this.routes.navigate(['/']), 2000);
      }
      this.demandeAtmpService.exist(this.id_acc).subscribe(result => {
        if (result.success) {
          if (!result.msg.exist) {
            this.toatr.error('La référence n\'existe pas, vous erez redirigé');
            setTimeout( () => this.routes.navigate(['/']), 2000);
            this.exist = false;
          } else {
            this.demandeAtmpService.medicamentsAcc(this.id_acc).subscribe(medicamentsResult => {
              if (medicamentsResult.success) {
                this.medicaments = medicamentsResult.msg;
                this.demandeAtmpService.getmother(this.medicaments.mere.idAcc).subscribe( mother => {
                  if (mother.success) {
                    this.demandeAtmpService.getDemande(mother.msg.idAccMere).subscribe( datResult => {
                      if (datResult.success) {
                        this.dat = datResult.msg;
                      }
                    });
                  }
                });
                const self = this;
                this.medicaments.fille.forEach(function (part, index, theArray) {
                  if (part.valide === 1) {
                    self.medoc.push(part);
                    self.medoc[index].montantSem = self.medoc[index].pu;
                  }
                });
              } else {
                this.toatr.error('erreur de chargement de donnée des médicaments cause : ' + medicamentsResult.msg);
              }
            });
          }
        }
      });
    });
  }

  change(e, indice) {
    if (e.target.checked) {
      this.medicaments.fille[indice].valide = 1;
    } else {
      this.medicaments.fille[indice].valide = 0;
    }
  }

  save() {
    this.demandeAtmpService.updateEtat(this.id_acc, 13).subscribe(result => {
      if (result.success) {
        this.demandeAtmpService.updateFilleMontant(this.medoc).subscribe(resultUpdate => {
          if (resultUpdate.success) {
                let montant = 0;
                this.medoc.forEach( item => {
                  montant = montant + item.montantSem;
                });
                const detailFm = {
                  idFm : this.medicaments.mere.idAcc,
                  idDat: this.dat.reference,
                  montant: montant,
                  dateFm: new Date(),
                  idFactureMere: this.medicaments.mere.idFactureMere,
                  idFmType: 7
                };
                const idEmpl = '';
                const idIndividu = this.dat.matricule;
                this.demandeAtmpService.saveFM(detailFm, idEmpl, idIndividu).subscribe( resultSaveFM => {
                  if (resultSaveFM.success) {
                    this.demandeAtmpService.updateEtat(this.id_acc, 13).subscribe( resultUpdateEtat => {
                      if (resultUpdateEtat.success) {
                        this.toatr.success('Frais Médicaux Sauvegardé et Traité avec success');
                      } else {
                        this.toatr.error(resultUpdateEtat.msg, 'Modification Etat de la demande');
                      }
                    });
                  } else {
                    this.toatr.error(resultSaveFM.msg, 'Sauvegarde des Frais Médicaux');
                  }
                });
          } else {
            this.toatr.error(resultUpdate.msg, 'Modification Prix S.E.M');
          }
        });
      } else {
        this.toatr.error(result.msg, 'Modification état demande');
      }
    });
  }
}
