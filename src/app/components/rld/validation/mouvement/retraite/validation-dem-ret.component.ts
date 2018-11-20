import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params} from '@angular/router';
import {MouvementService} from '../../../../../services/rh/mouvement.service';
import {InfoService} from '../../../../../services/info/info.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-validation-dem-ret',
  templateUrl: './validation-dem-ret.component.html',
  styleUrls: ['./validation-dem-ret.component.css']
})
export class ValidationDemRetComponent implements OnInit {
  agent: any;
  reference: string;
  info: any;
  postes: any[];
  raison: string;
  tempDemande: any;
  show = false;
  dateMvt: Date;
  dateDemission: any;
  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private mouvementService: MouvementService,
    private infoService: InfoService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
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
        this.dateMvt = new Date(this.info.datedebutmvt);
        this.dateDemission = this.datePipe.transform(this.dateMvt, 'yyyy-MM-dd');
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
      this.mouvementService.saveRecrutement(data).subscribe( res => {
        console.log(res);
        if (res.success) {
          this.mouvementService.newMouvement( this.info.matricule, null,
            new Date(this.dateDemission), this.info.idservice, this.info.idtype, this.info.raison, 1).subscribe( resMouvement => {
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
          this.show = false;
          this.toastr.error(res.msg);
          this.tempDemande.info.idetat = 1;
        }
      });
    } else {
      this.toastr.error( 'Désolé cette demande a déjà été traité');
    }
  }

  rejeter() {
    const idEtat = this.tempDemande.info.idetat;
    if (idEtat === 1) {
      this.show = true;
      this.tempDemande.info.idetat = 3;
      const data =  {
        data : this.tempDemande
      };
      this.mouvementService.saveRecrutement(data).subscribe( res => {
        this.show = false;
        if (res.success) {
          this.toastr.success('Rejeter avec succès');
        } else {
          this.toastr.error(res.msg);
          this.tempDemande.info.idetat = 1;
        }
      });
    } else {
      this.toastr.error( 'Désolé cette demande a déjà été traité');
    }
  }

}
