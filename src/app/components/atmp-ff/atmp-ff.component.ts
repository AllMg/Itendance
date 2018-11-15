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
	selector: 'app-atmp-ff',
	templateUrl: './atmp-ff.component.html',
	styleUrls: ['./atmp-ff.component.css']
})
export class AtmpFfComponent implements OnInit {
	public show: boolean;
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
	entite:string;
	iddat : any ;
	dat : any;
	dn :any;
	sme:any;
	montant :any;
	matricule_benef:any;
	datefun:any;
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

		) { 

	}

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
			this.DynamicsService.getInputValue(this.refatmp).subscribe( datlibelle => {
				if (datlibelle.success) {
					let infofd1=datlibelle.msg;
					console.log(infofd1);
					for (let i = 0; i < infofd1.length; i++) {
						if(infofd1[i].id_type_info==83)
						{
							this.montant=infofd1[i].valeur;
						}
						if(infofd1[i].id_type_info==65)
						{
							this.matricule_benef=infofd1[i].valeur;
						}
						if(infofd1[i].id_type_info==89)
						{
							this.datefun=infofd1[i].valeur;
						}
					}
					this.DynamicsService.getEntite(this.matricule_benef).subscribe( datlibelle => {
						if (datlibelle.success) {
							this.entite=datlibelle.msg[0].type_entite;

						}
						else {
							console.log("info  employeur eroor");
							this.toastr.error('Info get Entite ATMp error: ' + datlibelle.msg);
						}
					});
				}
				else {
					this.toastr.error('dynamics service get Idmere error: ' + datlibelle.msg);
				}
			});	            			   	
			



			this.DynamicsService.getDemande(this.refatmp).subscribe(data => {
				if (data.success) {
					this.dmd = data.msg;
					this.DynamicsService.getmother(this.refatmp).subscribe( idaccmere => {
				if (idaccmere.success) {
					this.iddat = idaccmere.msg.idAccMere;
				}
				else {
					this.toastr.error('dynamics service get Idmere error: ' + idaccmere.msg);
				}
			});
					this.indivService.getlastempl(this.dmd.matricule).subscribe( data => {
						if (data.success) {
							this.employeur = data.msg;

						}
						else {

							this.toastr.error('infoEmployeur ATMp error: ' + data.msg);
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
							this.toastr.error('infoIndiv ATMp error: ' + data.msg);
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
					this.toastr.error('error getDemandeAM error: AM-1 ' + data.msg);
				}

			});
		});
	}
	ChangeImgModal(val)
	{
		this.image=val;
	}
	open(val)
	{
		 
		window.open(val);
	}
	ValidateIJ()
	{
		const funeraire = {
			"idFun" : this.refatmp,
			"idDat" : this.iddat,
			"beneficiaireMatric" :this.matricule_benef,
			"beneficiaireFlag" :this.entite,
			"montant" : this.montant,
			"dateFun" : this.datefun,
			"userId"  : ""
		};
		const datas  = {

			"funeraire" : funeraire,
			"idIndividu" :this.dmd.matricule,
			"idEmpl" : this.employeur.id_empl
		}
		console.log(datas);


		this.show = true;
		this.DynamicsService.SaveFD3(datas).subscribe( result => {
			if (result.success) {
				this.show = false;
				this.DynamicsService.updateEtat(this.refatmp, 13).subscribe( result => {
					if (result.success) {

						this.disabled = true;
						this.toastr.success('La demande FF/AT n° ' + this.refatmp + ' a été pris en charge');
						const msg = 'Bonjour, nous vous annonçons que votre demande ' +
						'de remboursement frais funeraire a ete pris en Charge. Veuillez vous munir des pièces jointes que nous allons vous demander' +
						'dans un  brief délais. Merci. Votre' +
						' numero de demande : ' + this.refatmp;
						const content = {
							expediteur: 'System',
							destinataire: this.dmd.matricule,
							titre: 'Demande FF/AT ',
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
		this.DynamicsService.updateEtat(this.refatmp,11).subscribe( result => {
			this.show = false;
			if (result.success) {
				this.disabled = true;
				this.toastr.success('La demande IJ/AT n° ' + this.refatmp + ' a été rejeté');
				const msg = 'Bonjour, c\'est avec un sincère regret que nous vous annonçons que votre demande ' +
				'de remboursement frais funeraire  a été rejeté suite au non conformités des pieces. Votre' +
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

