import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { InfoService} from '../../services/info/info.service';
import { IndividuService } from '../../services/individu/individu.service';
import { DynamicAtmpService } from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import { FileService } from '../../services/file/file.service';
import { FamilleService } from '../../services/famille/famille.service';
 import { AdresseService } from '../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';
import { FileModel } from '../../models/file-model';
import { NotificationService } from '../../services/notification/notification.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-atmp-fm',
  templateUrl: './atmp-fm.component.html',
  styleUrls: ['./atmp-fm.component.css']
})
export class AtmpFmComponent implements OnInit {
 public show: boolean;
  refatmp : string;
  dmd: any;
  image :any;
  fileQuery = new FileModel();
  employeur: any;
  individu: any;
  adresseIndividu: any;
  pieceJointeMessage: string;
  pieceJointe: any[];
  famille : any[];
  iddat : any ;
  dat : any;
  dn :any;
  sme:any;
 /*id_individu;
 famille;*/
  constructor(
private notificationService: NotificationService,
    private routes: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private DynamicsService : DynamicAtmpService,
    private infoService: InfoService,
    private fileservice : FileService,
    private familleService: FamilleService,
    private indivService: IndividuService,
    private adresseService: AdresseService,
    private toastr: ToastrService,
    private sanitizer:DomSanitizer
  	) { }



  ngOnInit() {
  		 this.route.params.subscribe((params: Params) => {
      this.refatmp = params['id'];
      	this.fileQuery.id_files = this.refatmp;
        this.fileservice.readQuery(this.fileQuery).subscribe(data => {

        if (data.success) {
          this.pieceJointe = data.msg;
          for (let i = 0; i < this.pieceJointe.length; i++) {
            this.pieceJointe[i].ext = this.fileservice.extensionBase64(this.pieceJointe[i].file);
            this.pieceJointe[i].type = this.fileservice.typefileBase64(this.pieceJointe[i].file);
          }
        } else {
          setTimeout(() => this.toastr.warning(data.msg, 'chargement des pièce jointe'));
        }
      });


 		this.DynamicsService.getDemande(this.refatmp).subscribe(data => {
      if (data.success) {
				          this.dmd = data.msg;
		                   this.familleService.infoFamille(this.dmd.matricule).subscribe( famille => {
            					if (famille.success) {
			             			 this.famille = famille.msg;
			             			 this.famille =  this.famille.filter(function(membre) {
										return membre.age <= 21 ;
										});
             			   		}
         					  else {
				              this.toastr.error('Info Famille ATMp error: ' + data.msg);
						        }
		     				 });

 						 this.infoService.infoIndiv(this.dmd.matricule).subscribe( infoTravailleur => {
            			   if (infoTravailleur.success) {
             			   this.individu = infoTravailleur.msg;
         					 }
         					  else {
				              this.toastr.error('info Indiv ATMp error: ' + data.msg);
				            }
     				      });

                      	this.adresseService.infoAdresse(this.dmd.id_individu).subscribe(data => {
				            if (data.success) {
				              this.adresseIndividu = data.msg[0];
				            } else {
				              this.toastr.error('infoIndiv AM error: AM-1 ' + data.msg);
				            }
				          });

           }
			       else {
			          this.toastr.error('error getDemandeAM error: rente Mortelle ' + data.msg);
			        }

      });
    });
  }
  ChangeImgModal(val)
  {
  	this.image=val;
  }
  ValidateIJ()
  {


	  const rentetype =
	  {
	    "id_rente_ipp" : this.refatmp
	  }
	  const datas  = {
	      "famille" : this.famille  ,
	      "idIndividu" :this.dmd.matricule
	  }
	    console.log(datas);
  	 /*this.DynamicsService.updateEtat(this.refatmp, 8).subscribe( result => {
      if (result.success) {
        this.toastr.success('La demande IJ/AT n° ' + this.refatmp + ' a été pris en charge');
        const msg = 'Bonjour, nous vous annonçons que votre demande ' +
          'd\'indemnite journaliere a été pris en charge. Veuillez vous munir des pièces jointes que nous allons vous demander' +
          'dans un  brief délais. Merci. Votre' +
          ' numero de demande : ' + this.refatmp;
        const content = {
          expediteur: 'System',
          destinataire: this.dmd.matricule,
          titre: 'Demande IJ/AT ',
          message: msg,
          typeNotif: 'DAT',
          dateEnvoi: new Date()
        };
        this.notificationService.sendNotif(this.dmd.matricule, content).then(
          () => {
            this.toastr.success('Notification envoyé');
          },
          (err) => {
            this.toastr.error('Notification non envoyé');
          }
        );
      } else {
        this.toastr.error('Une erreur s\'est produite : ' + result.msg, 'erreur');
      }
    });*/
  }
  PcsNon()
  {
      this.DynamicsService.updateEtat(this.refatmp, 9).subscribe( result => {
      if (result.success) {
        this.toastr.success('La demande IJ/AT n° ' + this.refatmp + ' a été rejeté');
        const msg = 'Bonjour, c\'est avec un sincère regret que nous vous annonçons que votre demande ' +
          'd\'indemnite journaliere de travail a été rejeté. Votre' +
          ' numero de demande : ' + this.refatmp + ' numero DAT :  ';
        const content = {
          expediteur: 'System',
          destinataire: this.dmd.matricule,
          titre: 'Demande IJ/AT ',
          message: msg,
          typeNotif: 'DAT',
          dateEnvoi: new Date()
        };
        this.notificationService.sendNotif(this.dmd.matricule, content).then(
          () => {
            this.toastr.success('Notification envoyé');
          },
          (err) => {
            this.toastr.error('Notification non envoyé');
          }
        );
      } else {
        this.toastr.error('Une erreur s\'est produite : ' + result.msg, 'erreur');
      }
    });
  }
  sanitize(url:string){
    return  this.sanitizer.bypassSecurityTrustUrl(url);
}
}

