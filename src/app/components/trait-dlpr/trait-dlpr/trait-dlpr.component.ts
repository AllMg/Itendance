import { Component, OnInit } from '@angular/core';
import { DlprService } from '../../../services/dlpr/dlpr.service';
import { ToastrService } from 'ngx-toastr';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trait-dlpr',
  templateUrl: './trait-dlpr.component.html',
  styleUrls: ['./trait-dlpr.component.css']
})
export class TraitDlprComponent implements OnInit {
   etat : any;
   pagination:any;
   prestation: any ;
   listdem :any[];
   show :any;
   constructor(
  	private routes : Router,
  	private dlprservice : DlprService,
  	private  toaster   :  ToastrService
  	) { 
  	this.show= false;
  }
    

   ngOnInit() {

  	this.etat = 4;
    this.pagination = 1;
    this.prestation = 311;  

    let params = {
      "type_etat": this.etat,
      "pagination": this.pagination,
      "prestation": this.prestation
    };
     this.dlprservice.ListDemande(params).subscribe(data => {
      if (data.success) {
        this.listdem = data.msg;
      } else {
        this.toaster.error('Erreur Recuperation liste DLPR :' + data.msg);
      }
    });
     

  }
   onClickDmd(iddem)
  {
  	 this.routes.navigate(['/fiche-am/' + iddem]);
  }
}
