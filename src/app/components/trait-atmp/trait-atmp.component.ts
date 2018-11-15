import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { DynamicAtmpService } from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import { FileService } from '../../services/file/file.service';
import { IndividuService } from '../../services/individu/individu.service';
import { AdresseService } from '../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../services/notification/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trait-atmp',
  templateUrl: './trait-atmp.component.html',
  styleUrls: ['./trait-atmp.component.css']
})
export class TraitAtmpComponent implements OnInit {

   nom_prestation : any;
   etat : number;
   typechoose :number;
   pagination:any;
   prestation: number ;
   listdem :any[];
     pageCount: any[];
    page = 1;
  size = 10;
   statelist : any[];
   show :any;

   constructor(
    private notificationService: NotificationService,
    private routes: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private atmpservice: DynamicAtmpService,
    private fileservice : FileService,
    private indivService: IndividuService,
    private adresseService: AdresseService,
    private toastr: ToastrService 
  	) { 
  	this.show= true;
  }
    

   ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['page']) {
        this.page = params['page'];
      }
      if (params['size']) {
          this.size = params['size'];
      }
      this.prestation = params['prestation'];
      this.nom_prestation = params['nom_prest'];
  	  this.etat =1;
    this.atmpservice.type().subscribe( types => {
        if (types.success) {
          console.log('finish 1');
          this.statelist = types.msg;
          this.etat = this.statelist[0].id_type_etat;
          this.atmpservice.getDemandes(this.etat, this.page,this.prestation, this.size).subscribe( data => {
            console.log('finish 2');
            if (data.success) {
              this.listdem = data.msg;
              this.show= false;
            } else {
              this.show= false;
              setTimeout(() => this.toastr.error(data.msg));
            }
          });
          this.atmpservice.pageSize(this.etat, this.page, this.prestation, this.size).subscribe( data => {
            if (data.success) {
              console.log('finish 3');
              this.pageCount =  Array(+data.msg).map((x, i) => i) ;
            } else {
              setTimeout(() => this.toastr.error(data.msg));
            }
          });
        } else {
          setTimeout(() => this.toastr.error(types.msg));
        }
      }); 

  });
  }
   initData() {
    this.atmpservice.getDemandes(this.etat, this.page, this.prestation, this.size).subscribe( data => {
      if (data.success) {
        this.listdem = data.msg;
        this.show= false;
      } else {
        this.show= false;
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.atmpservice.pageSize(this.etat, this.page, this.prestation, this.size).subscribe( data => {
      if (data.success) {
        this.pageCount =  Array(+data.msg).map((x, i) => i) ;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });

  }
    onChangeEtatDmd()
 {
   this.show= true;
   this.listdem=[];
 	   this.atmpservice.getDemandes(this.typechoose, this.page, this.prestation, this.size).subscribe( data => {
      if (data.success) {
        this.show= false;
        this.listdem = data.msg;
      } else {
        this.show= false;
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.atmpservice.pageSize(this.typechoose, this.page, this.prestation, this.size).subscribe( data => {
      if (data.success) {
        this.pageCount =  Array(+data.msg).map((x, i) => i) ;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
  
 }
   onClickDmd(iddem)
  {
  	  if(this.prestation==215)
     {
       this.routes.navigate(['/detail-FF/' + iddem]);
     }
      if(this.prestation==227)
     {
       this.routes.navigate(['/atmp-rente/' + iddem]);
     }
     if(this.prestation==228)
     {
       this.routes.navigate(['/detail-IPP/' + iddem]);
     } 
      if(this.prestation==211)
     {
       this.routes.navigate(['/detail-atmp/' + iddem]);
     }
     if(this.prestation==212)
     {
       this.routes.navigate(['/atmp/traitement/fm/' + iddem]);
     } 
     if(this.prestation==213)
     {
       this.routes.navigate(['/atmp/traitement/fp/' + iddem]);
     } 
     if(this.prestation==214)
     {
       this.routes.navigate(['/detail-FD1/' + iddem]);
     }
  
  }
}

