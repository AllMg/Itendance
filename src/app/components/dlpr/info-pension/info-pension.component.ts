import { Component, OnInit } from '@angular/core';
import { DemandeReversionService } from '../../../services/reversion-pension/demande-reversion.service';
import { DlprService } from '../../../services/dlpr/dlpr.service'; 
import {ToastrService} from 'ngx-toastr';
import { InfoService} from '../../../services/info/info.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-pension',
  templateUrl: './info-pension.component.html',
  styleUrls: ['./info-pension.component.css']
})
export class InfoPensionComponent implements OnInit {
	infoDemandePension: any;
	montantTotal: any;
	show = true;
	user:any;
	infoIndiv:any;
	infoDemandeur:string;

  constructor(
  	 private toastr: ToastrService,
    private routes: Router, 
    private Dlprservice: DlprService ,
    private infoService: InfoService,
   ) { }

  ngOnInit() {
  	this.user = JSON.parse(localStorage.getItem('user'));
  }

  getInfoIndividu(matricul: string) {
    this.infoService.infoIndiv(matricul).subscribe(data => {
      if (data.success) {
        this.infoIndiv = data.msg;
        this.infoDemandeur = data.msg.nom + ' ' + data.msg.prenoms;
           } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }
   getInfoPension() {
      let idindiv = this.user.id_acces;
    
    this.Dlprservice.getinfopen(idindiv).subscribe(data => {
      if (data.success) {
		  console.log("Info pension => ",data.msg);
        if(data.msg !== undefined || data.msg === null ){
          this.infoDemandePension = data.msg;
          this.montantTotal = this.infoDemandePension.montant ;
          this.show = false;
        } else{
          this.toastr.warning('Vous n\'aviez pas encore effectué une demande', 'Information');
          this.routes.navigate(['/accueil-connecte']);
        }
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  }

}
