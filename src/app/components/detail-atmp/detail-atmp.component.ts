import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import { InfoService} from '../../services/info/info.service';
import { IndividuService } from '../../services/individu/individu.service';
import { DynamicAtmpService } from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import { FileService } from '../../services/file/file.service';
import { EmployeurService } from '../../services/employeur/employeur.service';
import { AdresseService } from '../../services/adresse/adresse.service';
import { ToastrService } from 'ngx-toastr';
import { FileModel } from '../../models/file-model';
import { NotificationService } from '../../services/notification/notification.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-detail-atmp',
	templateUrl: './detail-atmp.component.html',
	styleUrls: ['./detail-atmp.component.css']
})
export class DetailAtmpComponent implements OnInit {

	public show = false;
	refatmp : any;
	dmd: any;
	image :any;
	fileQuery = new FileModel();
	employeur: any;
	individu: any;
	adresseIndividu: any;
	pieceJointeMessage: string;
	pieceJointe: any[];
	infopiece : any[];
	ijdatmod: any;
	dat : any;
	dn :any;
	sme:any;
	entite :any;
	iddat:any;
	dateacc : any;
	nbrjr : any;
	disabled = false; 
	constructor(
		private notificationService: NotificationService,
		private routes: Router,
		private datePipe: DatePipe,
		private route: ActivatedRoute,
		private DynamicsService : DynamicAtmpService,
		private infoService: InfoService,
		private fileservice : FileService,
		private empService: EmployeurService,
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
											this.entite=datlibelle.msg[0].type_entite;
											console.log(this.entite);
										}
										else {
											console.log("info  employeur eroor");
											this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
										}
									});
									this.DynamicsService.libelle(this.dat.reference).subscribe( datlibelle => {
										if (datlibelle.success) {
											let infolib =  datlibelle.msg;
											console.log(infolib);
											for (let i = 0; i < infolib.length; i++) {
												if(infolib[i].id_type_info==66)
												{
													infolib=infolib[i];
												}
											}
											this.DynamicsService.getinfopiece(this.refatmp).subscribe( datlibelle => {
												if (datlibelle.success) {
													let infoij =  datlibelle.msg;
													infoij =  infoij.filter(function(infoij) {
														return infoij.idTypeInfo == 14 ;
													}); 
													this.nbrjr = infoij[0].valeurInfo;
												}
												else {
													console.log("info  employeur eroor");
													this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
												}
											});
											this.dateacc=infolib;
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
											this.individu = infoTravailleur.msg;
										}
										else {
											this.toastr.error('infoIndiv ATMp error: ' + data.msg);
										}
									});


									this.DynamicsService.getinfopiece(this.dmd.reference).subscribe( infopiece => {
										if (infopiece.success) {
											this.infopiece = infopiece.msg;
										}
										else {
											console.log("erreur got info indiv atmp");
											this.toastr.error('infoIndiv ATMp error: ' + data.msg);
										}
									});

									this.adresseService.infoAdresse(this.dmd.id_individu).subscribe(data => {
										if (data.success) {
											this.adresseIndividu = data.msg[0];
										} else {
											this.toastr.error('infoIndiv ATMP ' + data.msg);
										}
									});
								}
								else {
									this.toastr.error('Erreur extraction Demande ' + data.msg);
								}

							});
}
else {
	this.toastr.error('Get demande Rentev  error: ' + idaccmere.msg);
}
});
}
else {
	this.toastr.error('Get demande AT mere   error: ' + idaccmere.msg);
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

	this.ijdatmod = {

		"sme":this.sme,
		"dnIndiv" : this.dn,
		"ijDat" : {
			"idIjDat":this.refatmp,
			"idDat":this.iddat,
			"beneficiaireMatricule":this.dn.idIndividu,
			"beneficiaireFla" :this.entite,
			"ijBase":"",
			"ijSalaireJour":"",
			"ijNbJoursOuvres":"",
			"ijMontant":"",
			"ijNbrJrArret":this.nbrjr
		}
	};
	this.show = true;
	this.DynamicsService.SaveIJ(this.ijdatmod).subscribe( ijsave => {
		this.show = false;
		if (ijsave.success) {
			this.DynamicsService.updateEtat(this.refatmp,13).subscribe( result => {
				if (result.success) {
					this.disabled = true;
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
			});
		}
		else {
			this.toastr.error('SaveIJ ATMp error: ' + ijsave.msg);
		}
	});
	/* */
}
PcsNon()
{
	this.show = true;
	this.DynamicsService.updateEtat(this.refatmp, 11).subscribe( result => {
		this.show = false;
		if (result.success) {
			this.disabled = true;
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
