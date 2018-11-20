import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MouvementService} from '../../../../../services/rh/mouvement.service';
import {ActivatedRoute, Params} from '@angular/router';
import {InfoService} from '../../../../../services/info/info.service';

@Component({
  selector: 'app-validation-mouvement-recrutement',
  templateUrl: './validation-dem-recrut.component.html',
  styleUrls: ['./validation-dem-recrut.component.css']
})
export class ValidationDemRecrutComponent implements OnInit {
  agent: any;
  reference: string;
  info: any;
  postes: any[];
  raison: string;
  tempDemande: any;
  show = false;
  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private mouvementService: MouvementService,
    private infoService: InfoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.initData();
  }
  valide() {
    const idEtat = this.tempDemande.info.idetat;
    if (idEtat === 1) {
      this.show = true;
      this.tempDemande.info.idetat = 2;
      console.log(this.tempDemande);
      const data =  {
        data : this.tempDemande
      };
      this.mouvementService.saveRecrutement(data).subscribe( res => {
        this.show = false;
        console.log(res);
        if (res.success) {
          this.toastr.success('Valider avec succès');
        } else {
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
      console.log(this.tempDemande);
      const data =  {
        data : this.tempDemande
      };
      this.mouvementService.saveRecrutement(data).subscribe( res => {
        this.show = false;
        console.log(res);
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
            console.log(this.agent);
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

}
