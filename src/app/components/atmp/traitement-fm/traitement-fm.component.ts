import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {ToastrService} from 'ngx-toastr';
import {FileModel} from '../../../models/file-model';
import {DomSanitizer} from '@angular/platform-browser';
import {FileService} from '../../../services/file/file.service';

@Component({
  selector: 'app-traitement-fm',
  templateUrl: './traitement-fm.component.html',
  styleUrls: ['./traitement-fm.component.css']
})
export class TraitementFmComponent implements OnInit {
  id_acc: string;
  exist: boolean;
  medicaments: any;
  tabSommeMedAvalide: any[];
  fileQuery = new FileModel();
  pieceJointe: any[];

  constructor(
    private routes: Router,
    private route: ActivatedRoute,
    private demandeAtmpService: DynamicAtmpService,
    private toatr: ToastrService,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {
    this.tabSommeMedAvalide = [];
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id_acc = params['id'];
      this.fileQuery.id_files = this.id_acc;
      this.fileService.readQuery(this.fileQuery).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.pieceJointe = data.msg;
          for (let i = 0; i < this.pieceJointe.length; i++) {
            this.pieceJointe[i].ext = this.fileService.extensionBase64(this.pieceJointe[i].file);
            this.pieceJointe[i].type = this.fileService.typefileBase64(this.pieceJointe[i].file);
          }
        } else {
          setTimeout(() => this.toatr.warning(data.msg, 'chargement des pièce jointe'));
        }
      });
      if ( this.id_acc.substring(0, 3) !== '212') {
          this.toatr.error('la reférence n\'est pas une demande de frais médicaux, vous serez redirigé');
          setTimeout( () => this.routes.navigate(['/']), 2000);
      }
      this.demandeAtmpService.exist(this.id_acc).subscribe(result => {
        if (result.success) {
          if (!result.msg.exist) {
            this.toatr.error('La référence n\'existe pas');
            setTimeout( () => this.routes.navigate(['/']), 2000);
            this.exist = false;
          } else {
            this.demandeAtmpService.medicamentsAcc(this.id_acc).subscribe(medicamentsResult => {
              if (medicamentsResult.success) {
                this.medicaments = medicamentsResult.msg;
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
    console.log(indice);
    if (e.target.checked) {
      this.medicaments.fille[indice].valide = 1;
    } else {
      this.medicaments.fille[indice].valide = 0;
    }
    console.log(this.medicaments);
  }
  save() {
    this.demandeAtmpService.updateEtat(this.id_acc, 12).subscribe(result => {
      if (result.success) {
        this.demandeAtmpService.updateMere(this.medicaments.mere.idFactureMere,  true, this.medicaments.idAcc).subscribe( resultUpdate => {
          if (resultUpdate.success) {
            this.toatr.success('Enregistrement avec success', ' Modification état');
          } else {
            this.toatr.error(resultUpdate.msg, 'Modification état');
          }
        });
        this.demandeAtmpService.updateFille(this.medicaments.fille).subscribe( resultUpdate => {
          if (resultUpdate.success) {
            this.toatr.success('Enregistrement avec success', 'Modification médicaments');
          } else {
            this.toatr.error(resultUpdate.msg, 'Modification médicaments');
          }
        });
      } else {
        this.toatr.error(result.msg, 'Modification état demande');
      }
    });
  }
  rejeter() {
    this.demandeAtmpService.updateEtat(this.id_acc, 9).subscribe(result => {
      if (result.success) {
        this.medicaments.valide = 0;
        this.demandeAtmpService.updateMere(this.medicaments.mere,  false, this.medicaments.idAcc).subscribe( resultUpdate => {
          if (resultUpdate.success) {
            this.toatr.success('Enregistrement avec success', ' Modification état');
          } else {
            this.toatr.error(resultUpdate.msg);
          }
        });
        this.toatr.success( 'la demande a été rejeté avec success');
      } else {
        this.toatr.error(result.msg, 'Modification état demande');
      }
    });
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
