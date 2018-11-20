import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params} from '@angular/router';
import {MouvementService} from '../../../../../services/rh/mouvement.service';
import {InfoService} from '../../../../../services/info/info.service';

@Component({
  selector: 'app-validation-dem-rep',
  templateUrl: './validation-dem-rep.component.html',
  styleUrls: ['./validation-dem-rep.component.css']
})
export class ValidationDemRepComponent implements OnInit {
  selectModel: any;
  agent: any;
  reference: string;
  info: any;
  postes: any[];
  raison: string;
  tempDemande: any;
  show = false;
  dateMvt: Date;
  dateDemission: any;
  dateDebut: any;
  dateFin: any;
  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private mouvementService: MouvementService,
    private infoService: InfoService,
    private toastr: ToastrService,
  ) { }
  ngOnInit() {
    this.selectModel = 0;
    this.initData();
  }
  initData() {
    this.route.params.subscribe( (params: Params) => {
      this.reference = params['id'];
    });
    this.mouvementService.getDemande(this.reference).subscribe( resultMouvement => {
      if (resultMouvement.success) {
        this.tempDemande = resultMouvement.msg;
        this.info = resultMouvement.msg.info;
        this.raison = this.info.raison;
        this.postes = resultMouvement.msg.poste;
        this.infoService.infoIndiv(this.info.matricule).subscribe( resultInfo => {
          if (resultInfo.success) {
            this.agent = resultInfo.msg;
          } else {
            setTimeout( () => {
              this.toastr.error(resultInfo.msg);
            });
          }
        });
      } else {
        setTimeout( () => {
          this.toastr.error(resultMouvement.msg);
        });
      }
    });
  }
  onChange(event) {
    this.selectModel = event;
    if (event === 'M08') {
      this.dateFin = undefined;
    }
  }

  valide() {
    const idEtat = this.tempDemande.info.idetat;
    if (idEtat === 1) {
      this.show = true;
      this.tempDemande.info.idetat = 2;
      this.tempDemande.info.datedebutmvt = this.dateDemission;
      console.log(this.tempDemande);
      const data =  {
        data : this.tempDemande
      };
      if (this.selectModel === '0') {
        this.tempDemande.info.idetat = 3;
      }
      this.mouvementService.saveRecrutement(data).subscribe( res => {
        console.log(res);
        if (res.success) {
          if ( this.selectModel !== '0' && this.selectModel !== '1' ) {
            this.mouvementService.newMouvement( this.info.matricule, new Date(this.dateFin),
              new Date(this.dateDebut), this.info.idservice, this.info.idtype, this.info.raison, 1).subscribe( resMouvement => {
              this.show = false;
              if (resMouvement.success) {
                this.toastr.success('Valider avec succès');
              } else {
                this.tempDemande.info.idetat = 1;
                this.mouvementService.saveRecrutement(data).subscribe( resUpdate => {
                  if (resUpdate.success) {
                    this.toastr.error(resMouvement.msg, 'New Mouvement');
                  } else {
                    this.toastr.error(resUpdate.msg, 'Update etat');
                  }
                });
              }
            });
          } else {
            this.toastr.success('Valider avec Succes');
          }
        } else {
          this.show = false;
          this.toastr.error(res.msg);
          this.tempDemande.info.idetat = 1;
        }
      });
    } else {
      this.toastr.error( 'Désolé cette demande a déjà été traité');
    }
  }

}
