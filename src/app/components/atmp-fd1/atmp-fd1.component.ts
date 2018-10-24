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
	selector: 'app-atmp-fd1',
	templateUrl: './atmp-fd1.component.html',
	styleUrls: ['./atmp-fd1.component.css']
})
export class AtmpFd1Component implements OnInit {
	
	refatmp : string;
	dmd: any;
	image :any;
	fileQuery = new FileModel();
	employeur: any;
	employeur_benef:any;
	individu: any;
	adresseIndividu: any;
	pieceJointeMessage: string;
	pieceJointe: any[];
	famille : any[];
	iddat : any ;
	dat : any;
	dn :any;
	sme:any;
	dnbenef :any ; 
	entite_vict:any;
	entite_benef:any;
	date_deb :any;
	heure_deb:any;
	date_fin:any;
	heure_fin:any;
	traj_go:any;
	traj_back:any;
	montant_fd1 :any;
	matr_benef :any;
	dateacc : any;
	nbrjr : any;
	dnx:any[];
	indemnit:any[];
	disabled = false;
    show = false;
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
 	) { 
this.dnx=[];
this.indemnit=[];
 }

 ngOnInit()
 {
 	this.route.params.subscribe((params: Params) => {
 		this.refatmp = params['id']; 
 		this.fileQuery.id_files = this.refatmp;
 		this.disabled = true;
 		this.fileservice.readQuery(this.fileQuery).subscribe(data => {

 			if (data.success) {
 				this.pieceJointe = data.msg;
 				for (let i = 0; i < this.pieceJointe.length; i++) {
 					this.pieceJointe[i].ext = this.fileservice.extensionBase64(this.pieceJointe[i].file);
 					this.pieceJointe[i].type = this.fileservice.typefileBase64(this.pieceJointe[i].file);
 				}
 				console.log(this.pieceJointe);
 			} else {
 				setTimeout(() => this.toastr.warning(data.msg, 'chargement des pièce jointe'));
 			}
 		});
          
 		this.DynamicsService.getmother(this.refatmp).subscribe( idaccmere => {
 			if (idaccmere.success) {
 				this.iddat = idaccmere.msg.idAccMere;
 				this.DynamicsService.getDemande(this.iddat).subscribe( dat => {
 					if (dat.success) {
 						this.dat = dat.msg;
 						this.DynamicsService.getDemande(this.refatmp).subscribe(data => {
 							if (data.success) {
 								this.dmd = data.msg; 
 								this.DynamicsService.getEntite(this.dmd.matricule).subscribe( datlibelle => {
 									if (datlibelle.success) {
 										this.entite_vict=datlibelle.msg[0].type_entite;

 									}
 									else {
 										console.log("info  employeur eroor");
 										this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
 									}
 								});
 								this.DynamicsService.getInputValue(this.dat.reference).subscribe( datlibelle => {
 									if (datlibelle.success) {
 										let infolib =  datlibelle.msg;
 										console.log(infolib);
 										for (let i = 0; i < infolib.length; i++) {
 											if(infolib[i].id_type_info==66)
 											{
 												infolib=infolib[i];
 											}
 										}
 										this.DynamicsService.getinfopiece(this.refatmp).subscribe(data => {
 											if (data.success) {
 												let infopc = data.msg;
 												console.log(infopc);
 												for (let i = 0; i < infopc.length; i++) {
			 											if(infopc[i].idTypeInfo==14)
			 											{
			 												infopc=infopc[i];
			 											}
			 										} 
 												this.nbrjr = infopc.valeurInfo;
 											}
 											else {
 												this.toastr.error('Info famille erreur: ' + data.msg);
 											}
 										});
 										this.DynamicsService.getInputValue(this.refatmp).subscribe( datlibelle => {
 											if (datlibelle.success) {
 												let infofd1=datlibelle.msg;
 												console.log(infofd1);
 												for (let i = 0; i < infofd1.length; i++) {
 													if(infofd1[i].id_type_info==76)
 													{
 														this.date_deb=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==77)
 													{
 														this.heure_deb=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==78)
 													{
 														this.date_fin=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==79)
 													{
 														this.heure_fin=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==80)
 													{
 														this.traj_go=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==81)
 													{
 														this.traj_back=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==82)
 													{
 														this.matr_benef=infofd1[i].valeur;
 													}
 													if(infofd1[i].id_type_info==8)
 													{
 														this.montant_fd1=infofd1[i].valeur;
 													}
 												}
 												//donne accompagnateur ///////////////////////////////////////////////////////////////////////////////
 										if(this.matr_benef!="")
 										{   console.log(this.matr_benef + "matricule beneficiaire");
 											this.indivService.getlastempl(this.matr_benef).subscribe( infoempl => {
 												if (infoempl.success) {
 													this.DynamicsService.getEntite(this.matr_benef).subscribe( datlibelle => {
 														if (datlibelle.success) {
 															this.entite_benef=datlibelle.msg[0].type_entite;

 														}
 														else {
 															console.log("info  employeur eroor");
 															this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
 														}
 													});
 													this.employeur_benef = infoempl.msg; 
 													const dnindiv={
 														"periode":this.dateacc.valeur,
 														"idIndividu":this.matr_benef
 													};
 													this.DynamicsService.getDnindiv(dnindiv).subscribe( dnindiv => {
 														if (dnindiv.success) {
 															console.log("success dnindiv benef ");
 															this.dnbenef = dnindiv.msg;
 															console.log(this.dnbenef);
 														}
 														else {
 															console.log("error get DN benef");
 															this.toastr.error('info DN indiv benef : ' + dnindiv.msg);
 														}
 													});


 												}
 												else {
 													console.log("info  employeur accompagneteur eroor");
 													this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
 												}
 											});
 									  ///////////////////////////////////////////////////////////
 									}	
 											}
 											else {
 												this.toastr.error('Info famille erreur: ' + data.msg);
 											}	 
 										});
 										

 										this.dateacc=infolib;
 										//////////////////////::get donne victime /////////////////////////////////////////
 										this.indivService.getlastempl(this.dmd.matricule).subscribe( infoempl => {
 											if (infoempl.success) {
 												console.log("success get last empl");
 												this.employeur = infoempl.msg; 

 												const semdata= {
 													"dateDebutSme":this.dateacc.valeur,
 													"smeRegime":this.employeur.id_activite.id_regime.id_regime
 												};
 												console.log(semdata);
 												this.DynamicsService.getSme(semdata).subscribe( sme => {
 													if (sme.success) {
 														this.sme = sme.msg;
 														console.log(this.sme);
 													}
 													else {
 														console.log("error get SME");
 														this.toastr.error('info GET SME: ' + sme.msg);
 													}
 												});
 												const dnindiv={
 													"periode":this.dateacc.valeur,
 													"idIndividu":this.dmd.matricule
 												};
 												this.DynamicsService.getDnindiv(dnindiv).subscribe( dnindiv => {
 													if (dnindiv.success) {
 														console.log("success dnindiv");
 														this.dn = dnindiv.msg;
 														console.log(this.dn);
 													}
 													else {
 														console.log("error get DN");
 														this.toastr.error('info DN indiv : ' + dnindiv.msg);
 													}
 												});


 											}
 											else {
 												console.log("info  employeur eroor");
 												this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
 											}
 										});
 										
 								}
 								else {
 									console.log("info individu error");
 									this.toastr.error('infoIndiv ATMp error: ' + datlibelle.msg);
 								}
 							});




this.infoService.infoIndiv(this.dmd.matricule).subscribe( infoTravailleur => {
	if (infoTravailleur.success) {
		this.disabled = false;
		this.individu = infoTravailleur.msg;
	}
	else {
					this.disabled = true;
		this.toastr.error('infoIndiv ATMp error: ' + data.msg);
	}
});



this.adresseService.infoAdresse(this.dmd.id_individu).subscribe(data => {
	if (data.success) {
		this.adresseIndividu = data.msg[0];
	} else {

					this.disabled = true;
		this.toastr.error('infoIndiv ATMP ' + data.msg);
	}
});
}
else {

					this.disabled = true;
	this.toastr.error('Erreur extraction Demande ' + data.msg);
}

});
}
else {

					this.disabled = true;
	this.toastr.error('Get demande Rentev  error: ' + idaccmere.msg);
}
});
}
else {

					this.disabled = true;
	this.toastr.error('Get DAT mere   error: ' + idaccmere.msg);
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

 	this.show = true;
	
	let indemnite_victime={
		"idDat":this.iddat,
        "idDemande":this.refatmp,
        "montant":this.montant_fd1,
        "dateDebut":this.date_deb,
        "heureDebut" :this.heure_deb+':00',
        "trajetDebut":this.traj_go,
        "dateFin":this.date_fin,
        "heureFin":this.heure_fin+':00',
        "trajetFin":this.traj_back,
        "beneficiaireMatricule":this.dmd.matricule,
        "benefFlag":this.entite_vict,
        "nbrJr":this.nbrjr
 
	};
	if(this.matr_benef!="")
	{
		let indemnite_benef={
			"idDat":this.iddat,
			"idDemande":this.refatmp,
			"montant":this.montant_fd1,
			"dateDebut":this.date_deb,
			"heureDebut" : this.heure_deb+':00',
			"trajetDebut":this.traj_go,
			"dateFin":this.date_fin,
			"heureFin":this.heure_fin+':00',
			"trajetFin":this.traj_back,
            "beneficiaireMatricule":this.matr_benef,
			"benefFlag":this.entite_benef,
			"nbrJr":this.nbrjr
 
		};
		this.dnx.push(this.dnbenef);
		this.indemnit.push(indemnite_benef);
		
	}
	this.dnx.push(this.dn); 
 	this.indemnit.push(indemnite_victime);
	 
    
	let datas = {
	  "sme":this.sme,
      "dnIndiv" : this.dnx,
      "indemnite" : this.indemnit
    };
	

	this.DynamicsService.SaveFD1(datas).subscribe( result => {
		this.show=false;
		if (result.success) {
		 this.DynamicsService.updateEtat(this.refatmp, 13).subscribe( result => {
				if (result.success) {
					this.disabled = true;
					this.toastr.success('La demande FD1/AT n° ' + this.refatmp + ' a été pris en charge');
					const msg = 'Bonjour, nous vous annonçons que votre demande ' +
					'de remboursement Frais de deplacement a été pris en charge. Veuillez vous munir des pièces jointes que nous allons vous demander' +
					'dans un  brief délais. Merci. Votre' +
					' numero de demande : ' + this.refatmp;
					const content = {
						expediteur: 'System',
						destinataire: this.dmd.matricule,
						titre: 'Demande FD/AT ',
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
		else {
			this.toastr.error('Une erreur s\'est produite : ' + result.msg, 'erreur');
		}
	});
}

PcsNon()
{
	this.show = true;
	this.DynamicsService.updateEtat(this.refatmp, 9).subscribe( result => {
		this.show =false;
		if (result.success) {
			this.disabled = true;
			this.toastr.success('La demande IJ/AT n° ' + this.refatmp + ' a été rejeté');
			const msg = 'Bonjour, c\'est avec un sincère regret que nous vous annonçons que votre demande ' +
			'de remboursement frais deplacement de travail a été rejeté. Votre' +
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

