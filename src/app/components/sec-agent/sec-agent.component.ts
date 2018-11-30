import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { FileModel } from '../../models/file-model';
import { ImmoService } from '../../services/immo/immo.service';
import { FileService } from '../../services/file/file.service';
import { AdresseService } from "../../services/adresse/adresse.service";

declare var $: any;

@Component({
	selector: 'app-sec-agent',
	templateUrl: './sec-agent.component.html',
	styleUrls: ['./sec-agent.component.css']
})
export class SecAgentComponent implements OnInit {

	@ViewChild('modalChargement') modalChargement;
	@ViewChild('modalAjoutSite') modalAjoutSite;
	@ViewChild('modalAjoutModifRot') modalAjoutModifRot;
	@ViewChild("fullcalendar") fullcalendar: CalendarComponent;
	calendarOptions: Options;

	Menu = {
		menu: "visiteur",
		sousMenu: ""
	};

	ngxFiraisana = [];

	Liste = {
		estVue: false,
		liste: [],
		indice: -1,
		page: 1,
		ligneMax: 15,
		charge: false,
		filtre: {
			nomPrenom: "",
			matricule: "",
			nomSociete: "",
			statut: -1
		}
	};

	Saisie = {
		titre: "Enregistrement d'un nouveau agent de sécurité",
		type: "Ajout",
		idAgentSec: null,
		indice: -1,
		champ: {
			nom: "",
			prenom: "",
			matricule: "",
			cin: "",
			nomSociete: "",
			telephone: "",
			adresse: "",
			statut: ""
		},
		individu: {
			id_firaisana_rel_fkt_naiss: -1,
			id_sexe: {
				id_sexe: 'M'
			},
			date_naissance: null,
			code_dr: "42"
		},
		contrat: {
			type_contrat: "CDI",
			date_debut: null,
			date_fin: null,
			reference: "",
			salaire_fixe: 0,
			employeurmatricule: "" // izay connecté
		},
		photo: null,
		charge: false
	};

	Rot = {
		listeMois: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		listeRotation: [],
		listeConge: [],
		mois: 0,
		annee: 0,
		titreModal: "Insertion",
		chargeModal: false,
		ngxSite: [],
		typeChamp: "s",
		typeAction: "a",
		champ: {
			dateDebut: null,
			heureDebut: null,
			dateFin: null,
			heureFin: null,
			idLoc: "",
			matricules: ""
		},
		objetAModifier: null,
		couleurRotation: "#0099FF",
		couleurConge: "#ff0000"
	};

	Site = {
		chargeModal: false,
		provinces: [],
		regions: [],
		champ: {
			idProv: "",
			idReg: "",
			libelleCommune: "",
			libelleLoc: ""
		},
		fComControl: new FormControl(),
		comOptions: []
	};

	constructor(
		private router: Router,
		private toast: ToastrService,
		private fileService: FileService,
		private adresseService: AdresseService,
		private immoService: ImmoService) {
		let that = this;
		this.Site.fComControl.valueChanges.subscribe(term => {
			term = term.toString().trim();
			if (term.length >= 3) {
				let observ = that.immoService.immoTopic("rechercheCommuneInt", term, false).subscribe(obs => {
					console.log("rechercheCommuneInt", obs);
					if (obs.success) {
						let liste = [];
						for (let i = 0; i < obs.msg.length; i++) {
							liste.push(obs.msg[i].libelle);
						}
						that.Site.comOptions = liste;
					}
					observ.unsubscribe();
				});
			}
			else {
				that.Site.comOptions = [];
			}
		});
	}

	ngOnInit() {
		this.calendarOptions = {
			locale: 'fr',
			timeFormat: 'H:mm',
			editable: true,
			eventLimit: false,
			header: {
				left: '',
				center: '',
				right: ''
			}
		};
		let dateDuJour = new Date(Date.now());
		this.Rot.mois = dateDuJour.getMonth() + 1;
		this.Rot.annee = dateDuJour.getFullYear();

		this.Saisie.contrat.employeurmatricule = "15010181101050142";
	}

	clickInMenu1(lien) {
		this.router.navigate(['/' + lien]);
	}

	clickSousMenu(nom) {
		this.Menu.sousMenu = nom;
		if (nom == "liste") {
			if (!this.Liste.estVue) {
				this.Liste.estVue = true;
				this.listeAgent();
			}
		}
	}

	listeAgent() {
		this.Liste.charge = true;
		let that = this;
		let argument = {
			filtre: {
				nom: this.Liste.filtre.nomPrenom,
				prenom: this.Liste.filtre.nomPrenom,
				matricule: this.Liste.filtre.matricule,
				nomSociete: this.Liste.filtre.nomSociete,
				statut: this.Liste.filtre.statut
			},
			pagination: this.Liste.page
		};
		console.log("argument",argument);
		let observ = this.immoService.immoTopic("listeAgentSecInt", argument, true).subscribe(obs => {
			console.log("listeAgentSecInt", obs);
			if (obs.success) {
				that.Liste.liste = obs.msg;
			}
			else {
				that.toast.error(obs.msg);
			}
			that.Liste.charge = false;
			observ.unsubscribe();
		});
	}

	nomPrenomChange(){
		this.Liste.filtre.nomPrenom = this.Liste.filtre.nomPrenom.trim();
		if(this.Liste.filtre.nomPrenom.length > 2 || this.Liste.filtre.nomPrenom.length == 0){
			this.filtreChange();
		}
	}

	nomSocieteChange(){
		this.Liste.filtre.nomSociete = this.Liste.filtre.nomSociete.trim();
		if(this.Liste.filtre.nomSociete.length > 2 || this.Liste.filtre.nomSociete.length == 0){
			this.filtreChange();
		}
	}

	filtreChange() {
		this.Liste.page = 1;
		this.listeAgent();
	}

	pageSuivant() {
		if (!this.Liste.charge) {
			if (this.Liste.liste.length == this.Liste.ligneMax) {
				this.Liste.page++;
				this.listeAgent();
			}
		}
	}

	pagePrecedent() {
		if (!this.Liste.charge) {
			if (this.Liste.page > 1) {
				this.Liste.page--;
				this.listeAgent();
			}
		}
	}

	saisieNouvAgent() {
		this.Menu.sousMenu = "saisie";
		this.Saisie.titre = "Enregistrement d'un nouveau agent de sécurité";
		this.Saisie.type = "Ajout";
		for (let attr in this.Saisie.champ) {
			this.Saisie.champ[attr] = "";
		}
		this.Saisie.photo = null;
		this.Saisie.champ.statut = "1";
	}

	clickInfoAgent(index) {
		this.Menu.sousMenu = "saisie";
		this.Saisie.indice = index;
		this.Saisie.titre = "Modification d'information d'agent de sécurité";
		this.Saisie.type = "Modif";
		this.Saisie.idAgentSec = this.Liste.liste[index].idAgentSec;
		this.Saisie.champ.nom = this.Liste.liste[index].nom;
		this.Saisie.champ.prenom = this.Liste.liste[index].prenom;
		this.Saisie.champ.cin = this.Liste.liste[index].cin;
		this.Saisie.champ.adresse = this.Liste.liste[index].adresse;
		this.Saisie.champ.telephone = this.Liste.liste[index].telephone;
		this.Saisie.champ.matricule = this.Liste.liste[index].matricule;
		this.Saisie.champ.nomSociete = this.Liste.liste[index].nomSociete;
		this.Saisie.champ.statut = this.Liste.liste[index].statut;

		let that = this;
		let fileQuery = new FileModel();
		fileQuery.id_files = "sec-pdp-" + this.Saisie.idAgentSec;
		let observ = this.fileService.readQuery(fileQuery).subscribe(data => {
			console.log("Photo Agent Sec",data);
			if (data.success) {
				that.Saisie.photo = data.msg[0].file;
			}
			else {
				that.toast.error(data.msg);
			}
			observ.unsubscribe();
		});
	}

	chercheFiraisana(text: string) {
		if (text.length >= 3) {
			this.ngxFiraisana = [];
			let that = this;
			let observ = this.adresseService.firaisanaByName(text).subscribe(obs => {
				if (obs.success) {
					let liste = [];
					for (let i = 0; i < obs.msg.length; i++) {
						liste.push({ id: obs.msg[i].id_firaisana, text: obs.msg[i].libelle });
					}
					that.ngxFiraisana = liste;
				}
				observ.unsubscribe();
			});
		}
	}

	pieceChange(event) {
		let file = event.target.files[0];
		if (file.size < 5000000) {
			if (file.type.search("image") != -1) {
				let that = this;
				let filereader = new FileReader();
				filereader.onload = function () {
					that.Saisie.photo = filereader.result;
				};
				filereader.readAsDataURL(file);
			}
			else {
				this.toast.error("Le fichier doit être une image");
			}
		}
		else {
			this.toast.error("Le fichier est trop volumineux");
		}
	}

	enregistrePhoto(dataUrl, idAgentSec) {
		let that = this;
		let fichier = {
			id_files: "sec-pdp-" + idAgentSec,
			file: dataUrl,
			serviceName: "Intendance",
			name: "photo agent sec"
		};
		let observ = that.fileService.save(fichier).subscribe(obs => {
			if (!obs.success) {
				that.toast.error("L'enregistrement du photo a échoué");
			}
			observ.unsubscribe();
		});
	}

	modifierPhoto(dataUrl, idAgentSec) {
		let that = this;
		let fichier = new FileModel();
		fichier.id_files = "sec-pdp-" + idAgentSec;
		fichier.file = dataUrl;
		fichier.serviceName = "Intendance";
		fichier.name = "photo agent sec";
		let condition = {
			"id_files": "sec-pdp-" + idAgentSec,
			"serviceName": "Intendance"
		};
		let observ = that.fileService.updateFile(condition, fichier).subscribe(obs => {
			if (!obs.success) {
				that.toast.error("La modification du photo a échoué");
			}
			observ.unsubscribe();
		});
	}

	retourALaListe() {
		this.Menu.sousMenu = "liste";
	}

	champEstBon() {
		this.Saisie.champ.nom = this.Saisie.champ.nom.trim();
		this.Saisie.champ.prenom = this.Saisie.champ.prenom.trim();
		this.Saisie.champ.cin = this.Saisie.champ.cin.trim();
		this.Saisie.champ.adresse = this.Saisie.champ.adresse.trim();
		this.Saisie.champ.telephone = this.Saisie.champ.telephone.trim();
		this.Saisie.champ.matricule = this.Saisie.champ.matricule.trim();
		this.Saisie.champ.nomSociete = this.Saisie.champ.nomSociete.trim();
		let champ = this.Saisie.champ;
		if (champ.nom == "" || champ.prenom == "") {
			return { estBon: false, msg: "Nom ou prénom invalide" };
		}
		if (champ.cin == "") {
			return { estBon: false, msg: "Numéro de CIN invalide" };
		}
		else {
			for (let i = 0; i < 12; i++) {
				if (parseInt(champ.cin.charAt(i)) == NaN) {
					return { estBon: false, msg: "Numéro de CIN invalide" };
				}
			}
		}
		if (champ.matricule == "") {
			return { estBon: false, msg: "Numéro matricule invalide" };
		}
		if (champ.telephone == "" || champ.adresse == "") {
			return { estBon: false, msg: "Téléphone ou adresse invalide" };
		}
		if (champ.nomSociete == "") {
			return { estBon: false, msg: "Nom de société d'origine invalide" };
		}
		return { estBon: true, msg: null };
	}

	validerSaisie() {
		let verif = this.champEstBon();
		if (verif.estBon) {
			if (this.Saisie.type == "Ajout") {
				this.validerNouvAgent();
			}
			else {
				this.validerModifAgent();
			}
		}
		else {
			this.toast.error(verif.msg);
		}
	}

	validerNouvAgent() {
		this.Saisie.charge = true;
		let that = this;
		let travailleurContrat = {
			individu: {
				nom: this.Saisie.champ.nom,
				prenoms: this.Saisie.champ.prenom,
				cin: this.Saisie.champ.cin,
				id_firaisana_rel_fkt_naiss: this.Saisie.individu.id_firaisana_rel_fkt_naiss,
				id_sexe: this.Saisie.individu.id_sexe,
				date_naissance: this.Saisie.individu.date_naissance,
				code_dr: this.Saisie.individu.code_dr
			},
			contrat: this.Saisie.contrat
		};
		console.log("travailleurContrat",travailleurContrat);
		let observ0 = this.immoService.ajouttravailleur(travailleurContrat).subscribe(obs0 => {
			console.log("ajouttravailleur", obs0);
			if (obs0.success && obs0.msg != null) {
				this.Saisie.champ["idAgentSec"] = obs0.msg;
				let observ = this.immoService.immoTopic("ajoutAgentSecInt", this.Saisie.champ, true).subscribe(obs => {
					console.log("ajoutAgentSecInt", obs);
					if (obs.success) {
						for (let attr in that.Saisie.champ) {
							that.Saisie.champ[attr] = "";
						}
						let dataUrl = that.Saisie.photo;
						that.enregistrePhoto(dataUrl, obs.msg.idAgentSec);
						that.Saisie.photo = null;
						that.toast.success("Enregistrement terminé");
					}
					else {
						that.toast.error(obs.msg);
					}
					that.Saisie.charge = false;
					observ.unsubscribe();
				});
			}
			else {
				that.Saisie.charge = false;
				that.toast.error("Soit l'un des champs a une valeur invalide soit une erreur de connexion a interrompu l'opération");
			}
			observ0.unsubscribe();
		});
	}

	validerModifAgent() {
		this.Saisie.charge = true;
		let that = this;
		let champ = this.Saisie.champ;
		champ["idAgentSec"] = this.Saisie.idAgentSec;
		let observ = this.immoService.immoTopic("modifierAgentSecInt", champ, true).subscribe(obs => {
			console.log("modifierAgentSecInt",obs);
			if (obs.success) {
				let dataUrl = that.Saisie.photo;
				that.modifierPhoto(dataUrl, that.Saisie.idAgentSec);
				that.toast.success("Modification terminé");
				that.Liste.liste[that.Saisie.indice] = obs.msg;
			}
			else {
				that.toast.error(obs.msg);
			}
			that.Saisie.charge = false;
			observ.unsubscribe();
		});
	}

	dateFiltreChange() {
		if(this.Rot.listeRotation.length == 0){
			this.allerAdate();
		}
	}

	allerAdate(){
		this.fullcalendar.fullCalendar('removeEvents');
		if (this.Rot.mois < 10) {
			this.fullcalendar.fullCalendar('gotoDate', this.Rot.annee + "-0" + this.Rot.mois + "-15");
		}
		else {
			this.fullcalendar.fullCalendar('gotoDate', this.Rot.annee + "-" + this.Rot.mois + "-15");
		}
	}

	clickJour(event) {
		let date = new Date(event._i);
		let annee = date.getFullYear();
		let mois = (date.getMonth() + 1).toString();
		let jour: string = date.getDate().toString();
		if (mois.length < 2) {
			mois = "0" + mois;
		}
		if (jour.length < 2) {
			jour = "0" + jour;
		}
		this.Rot.champ.dateDebut = annee + "-" + mois + "-" + jour;
		this.Rot.champ.heureDebut = "00:00";
		this.Rot.champ.heureFin = "23:59";

		this.Rot.typeChamp = "s";
		this.Rot.titreModal = "Insertion";
		this.Rot.typeAction = "a";
		$(this.modalAjoutModifRot.nativeElement).modal("show");
	}

	ngxTexteSiteChange(texte: string) {
		texte = texte.trim();
		this.Rot.ngxSite = [];
		if (texte.length > 2) {
			let that = this;
			let observ = this.immoService.immoTopic("rechercheLocalisationInt", texte, false).subscribe(obs => {
				console.log("rechercheLocalisationInt", obs);
				if (obs.success) {
					let liste = [];
					for (let i = 0; i < obs.msg.length; i++) {
						liste.push({ id: obs.msg[i].idLoc, text: obs.msg[i].libelle });
					}
					that.Rot.ngxSite = liste;
				}
				observ.unsubscribe();
			});
		}
	}

	validerRotOuCon() {
		this.Rot.chargeModal = true;
		if (this.Rot.typeChamp == "c") {
			this.validerAjoutConge();
		}
		else {
			this.validerAjoutRotation();
		}
	}

	validerModifRotOuCon() {
		this.Rot.chargeModal = true;
		if (this.Rot.typeChamp == "c") {
			this.validerModifConge();
		}
		else {
			this.validerModifRotation();
		}
	}

	validerAjoutRotation() {
		this.Rot.chargeModal = true;
		let that = this;
		let argument = {
			rotation: {
				dateDebut: this.Rot.champ.dateDebut,
				heureDebut: this.Rot.champ.heureDebut+":00",
				dateFin: this.Rot.champ.dateFin,
				heureFin: this.Rot.champ.heureFin+":00",
				idLoc: this.Rot.champ.idLoc
			},
			matricule: this.separeMatricule(this.Rot.champ.matricules)
		};
		let observ = this.immoService.immoTopic("ajoutRotationAgentSecInt", argument, true).subscribe(obs => {
			console.log("ajoutRotationAgentSecInt",obs);
			if (obs.success) {
				let nouvs = obs.msg;
				for (let i = 0; i < nouvs.length; i++) {
					let nouv = nouvs[i].rotation;
					nouv.agent = nouvs[i].agentSecurite;
					
					let objetEvent = {
						id: "s" + nouvs[i].rotation.idRotation,
						start: nouvs[i].rotation.dateDebut + "T" + nouvs[i].rotation.heureDebut,
						end: nouvs[i].rotation.dateFin + "T" + nouvs[i].rotation.heureFin,
						title: "",
						backgroundColor: that.Rot.couleurRotation,
						textColor: "white",
						rotation: nouvs[i].rotation,
						agent: nouvs[i].agentSecurite
					};
					let observ3 = this.immoService.immoTopic("detailsLocalisationInt", nouvs[i].rotation.idLoc, false).subscribe(obs3 => {
						console.log("detailsLocalisationInt", obs3);
						if (obs3.success) {
							objetEvent.title = nouv.agent.matricule + " - " + obs3.msg.libelle;
							that.Rot.listeRotation.push(nouv);
							that.fullcalendar.fullCalendar('renderEvent', objetEvent);
						}
						observ3.unsubscribe();
					});
				}
				that.fermeModalRot();
				that.toast.success("Enregistré");
			}
			else {
				that.toast.error(obs.msg);
			}
			that.Rot.chargeModal = false;
			observ.unsubscribe();
		});
	}

	validerModifRotation() {
		this.Rot.chargeModal = true;
		let that = this;
		let argument = {
			idRotation: this.Rot.objetAModifier.rotation.idRotation,
			dateDebut: this.Rot.champ.dateDebut,
			heureDebut: this.Rot.champ.heureDebut+":00",
			dateFin: this.Rot.champ.dateFin,
			heureFin: this.Rot.champ.heureFin+":00",
			idAgentSec: this.Rot.objetAModifier.rotation.idAgentSec,
			idLoc: this.Rot.champ.idLoc
		};
		let observ = this.immoService.immoTopic("modifierRotationAgentSecInt", argument, true).subscribe(obs => {
			if (obs.success) {
				let modif = obs.msg;
				for (let i = 0; i < that.Rot.listeRotation.length; i++) {
					if (that.Rot.listeRotation[i].idRotation == that.Rot.objetAModifier.rotation.idRotation) {
						that.Rot.listeRotation[i].dateDebut = modif.dateDebut;
						that.Rot.listeRotation[i].heureDebut = modif.heureDebut;
						that.Rot.listeRotation[i].dateFin = modif.dateFin;
						that.Rot.listeRotation[i].heureFin = modif.heureFin;
						break;
					}
				}
				that.Rot.objetAModifier.rotation = modif;
				that.Rot.objetAModifier.start = modif.dateDebut + "T" + modif.heureDebut;
				that.Rot.objetAModifier.end = modif.dateFin + "T" + modif.heureFin;
				let observ3 = this.immoService.immoTopic("detailsLocalisationInt", modif.idLoc, false)
					.subscribe(obs3 => {
						if (obs3.success) {
							that.Rot.objetAModifier.title = that.Rot.objetAModifier.agent.matricule + " - " + obs3.msg.libelle;
							that.fullcalendar.fullCalendar('updateEvent', that.Rot.objetAModifier);
							that.fermeModalRot();
							that.toast.success("Element modifié");
						}
						else {
							that.toast.error("Erreur pendant la récupération du site de localisation");
						}
						observ3.unsubscribe();
					});
			}
			else {
				that.toast.error(obs.msg);
			}
			that.Rot.chargeModal = false;
			observ.unsubscribe();
		});
	}

	validerAjoutConge() {
		this.Rot.chargeModal = true;
		let that = this;
		let argument = {
			conge: {
				debutConge: this.Rot.champ.dateDebut,
				finConge: this.Rot.champ.dateFin
			},
			matricules: this.separeMatricule(this.Rot.champ.matricules)
		};
		let observ = this.immoService.immoTopic("ajoutCongeAgentSecInt", argument, true).subscribe(obs => {
			console.log("ajoutCongeAgentSecInt",obs);
			if (obs.success && obs.msg != null) {
				let nouvs = obs.msg;
				for (let i = 0; i < nouvs.length; i++) {
					let nouv = nouvs[i];
					let objetEvent = {
						id: "c" + nouvs[i].idConge,
						start: nouvs[i].debutConge,
						end: nouvs[i].finConge + "T23:59",
						title: null,
						backgroundColor: that.Rot.couleurConge,
						textColor: "white",
						conge: nouvs[i]
					};
					let observ2 = this.immoService.immoTopic("detailsAgentSecInt", nouv.idAgentSec, false).subscribe(obs2 => {
						console.log("detailsAgentSecInt",obs2);
						if (obs2.success) {
							nouv["agent"] = obs2.msg;
							that.Rot.listeConge.push(nouv);
							objetEvent["agent"] = obs2.msg;
							objetEvent.title = obs2.msg.matricule + " - En congé";
							that.fullcalendar.fullCalendar('renderEvent', objetEvent);
							that.fermeModalRot();
							that.toast.success("Enregistré");
						}
						else {
							that.toast.error(obs2.msg);
						}
						that.Rot.chargeModal = false;
						observ2.unsubscribe();
					});
				}
			}
			else {
				that.toast.error(obs.msg);
				that.Rot.chargeModal = false;
			}
			observ.unsubscribe();
		});
	}

	validerModifConge() {
		this.Rot.chargeModal = true;
		let that = this;
		let argument = {
			idConge: this.Rot.objetAModifier.conge.idConge,
			debutConge: this.Rot.champ.dateDebut,
			finConge: this.Rot.champ.dateFin
		};
		let observ = this.immoService.immoTopic("modifierCongeAgentSecInt", argument, true).subscribe(obs => {
			if (obs.success) {
				let modif = obs.msg;
				let indice = -1;
				for (let i = 0; i < that.Rot.listeConge.length; i++) {
					if (that.Rot.listeConge[i].idConde == that.Rot.objetAModifier.conge.idConge) {
						that.Rot.listeConge[i].debutConge = modif.debutConge;
						that.Rot.listeConge[i].finConge = modif.finConge;
						indice = i;
						break;
					}
				}
				that.Rot.objetAModifier.conge = that.Rot.listeConge[indice];
				that.Rot.objetAModifier.start = modif.debutConge;
				that.Rot.objetAModifier.end = modif.finConge + "T23:59";

				that.fullcalendar.fullCalendar('updateEvent', that.Rot.objetAModifier);
				that.fermeModalRot();
				that.toast.success("Element modifié");
			}
			else {
				that.toast.error(obs.msg);
			}
			that.Rot.chargeModal = false;
			observ.unsubscribe();
		});
	}

	fermeModalRot() {
		$(this.modalAjoutModifRot.nativeElement).modal("hide");
		this.Rot.champ.dateDebut = null;
		this.Rot.champ.heureDebut = null;
		this.Rot.champ.dateFin = null;
		this.Rot.champ.heureFin = null;
		this.Rot.champ.matricules = "";
		this.Rot.champ.idLoc = "";
		this.Rot.objetAModifier = null;
	}

	clickEvent(eventObject) {
		console.log("clickEvent", eventObject);
		this.Rot.objetAModifier = eventObject;
		let event = null;
		if (eventObject.rotation != undefined) {
			event = eventObject.rotation;
			this.Rot.typeChamp = "s";
			this.Rot.champ.heureDebut = this.prendHeureSansSeconde(event.heureDebut);
			this.Rot.champ.heureFin = this.prendHeureSansSeconde(event.heureFin);
			this.Rot.champ.dateDebut = event.dateDebut;
			this.Rot.champ.dateFin = event.dateFin;

			let that = this;
			let observ = this.immoService.immoTopic("detailsLocalisationInt", event.idLoc, false).subscribe(obs => {
				console.log("detailsLocalisationInt",obs);
				if (obs.success) {
					that.Rot.ngxSite = [];
					that.Rot.ngxSite.push({ id: obs.msg.idLoc, text: obs.msg.libelle });
					that.Rot.champ.idLoc = event.idLoc;
				}
				observ.unsubscribe();
			});
		}
		else {
			event = eventObject.conge;
			this.Rot.typeChamp = "c";
			this.Rot.champ.heureDebut = null;
			this.Rot.champ.heureFin = null;
			this.Rot.champ.dateDebut = event.debutConge;
			this.Rot.champ.dateFin = event.finConge;
		}
		this.Rot.titreModal = "Modification";
		this.Rot.typeAction = "m";
		this.Rot.champ.matricules = event.agent.matricule;

		$(this.modalAjoutModifRot.nativeElement).modal("show");
	}

	dropEvent(event) {
		console.log("dropEvent", event);
		let dateDebut = event.start.format().toString().split("T")[0];
		let dateFin = event.end.format().toString().split("T")[0];
		if (event.rotation != undefined) {
			this.majRotationDate(event, dateDebut, dateFin);
		}
		else {
			this.majCongeDate(event, dateDebut, dateFin);
		}
	}

	retailleEvent(event) {
		console.log("retailleEvent", event);
		let dateDebut = event.start.format().toString().split("T")[0];
		let dateFin = event.end.format().toString().split("T")[0];
		if (event.rotation != undefined) {
			this.majRotationDate(event, dateDebut, dateFin);
		}
		else {
			this.majCongeDate(event, dateDebut, dateFin);
		}
	}

	majRotationDate(eventObject, dateDebut, dateFin) {
		let that = this;
		let argument = {
			idRotation: eventObject.rotation.idRotation,
			dateDebut: dateDebut,
			dateFin: dateFin
		};
		let observ = this.immoService.immoTopic("modifierDateRotationAgentSecInt", argument, true).subscribe(obs => {
			console.log("modifierDateRotationAgentSecInt",obs);
			if (obs.success) {
				let modif = obs.msg;
				for (let i = 0; i < that.Rot.listeRotation.length; i++) {
					if (that.Rot.listeRotation[i].idRotation == eventObject.rotation.idRotation) {
						that.Rot.listeRotation[i] = modif;
						break;
					}
				}
				eventObject.rotation = modif;
				that.fullcalendar.fullCalendar('updateEvent', eventObject);
			}
			else {
				that.toast.error("Erreur réseau, mise à jour non pris en charge");
			}
			observ.unsubscribe();
		});
	}

	majCongeDate(eventObject, dateDebut, dateFin) {
		let that = this;
		let argument = {
			idConge: eventObject.conge.idConge,
			debutConge: dateDebut,
			finConge: dateFin
		};
		let observ = this.immoService.immoTopic("modifierCongeAgentSecInt", argument, true).subscribe(obs => {
			if (obs.success) {
				let modif = obs.msg;
				for (let i = 0; i < that.Rot.listeConge.length; i++) {
					if (that.Rot.listeConge[i].idConde == eventObject.conge.idConge) {
						that.Rot.listeConge[i] = modif;
					}
				}
				eventObject.conge = modif;
				that.fullcalendar.fullCalendar('updateEvent', eventObject);
			}
			else {
				that.toast.error("Erreur réseau, mise à jour non pris en charge");
			}
			observ.unsubscribe();
		});
	}

	chargerListeRot() {
		this.allerAdate();
		this.afficheChargement();
		this.Rot.listeRotation = [];
		this.fullcalendar.fullCalendar('removeEvents');
		let that = this;
		let argument = {
			annee: this.Rot.annee,
			mois: this.Rot.mois
		};
		let observ = this.immoService.immoTopic("listeRotationAgentSecInt", argument, true).subscribe(obs => {
			console.log("listeRotationAgentSecInt",obs);
			if(obs.success){
				let liste = obs.msg;
				let listeIdLoc = [];
				let listeObjetEvent = [];
				for (let i = 0; i < liste.length; i++) {
					let rot = liste[i].rotation;
					rot.agent = liste[i].agentSec;
					that.Rot.listeRotation.push(rot);

					listeIdLoc.push(liste[i].rotation.idLoc);
					listeObjetEvent.push({
						id: "s" + liste[i].rotation.idRotation,
						start: liste[i].rotation.dateDebut + "T" + liste[i].rotation.heureDebut,
						end: liste[i].rotation.dateFin + "T" + liste[i].rotation.heureFin,
						title: "",
						backgroundColor: that.Rot.couleurRotation,
						textColor: "white",
						rotation: liste[i].rotation,
						agent: liste[i].agentSec
					});
				}
				let observ3 = this.immoService.immoTopic("listeParTabIdLocalisationInt", listeIdLoc, true).subscribe(obs3 => {
					console.log("listeParTabIdLocalisationInt", obs3);
					if (obs3.success) {
						for(let i=0; i<listeIdLoc.length; i++){
							listeObjetEvent[i].title = listeObjetEvent[i].agent.matricule + " - " + obs3.msg[i].libelle;
							that.fullcalendar.fullCalendar('renderEvent', listeObjetEvent[i]);
						}
					}
					that.chargerListeConge();
					observ3.unsubscribe();
				});
				that.fermeChargement();
			}
			else{
				that.toast.error(obs.msg);
				that.fermeChargement();
			}
			observ.unsubscribe();
		});
	}

	chargerListeConge() {
		this.Rot.listeConge = [];
		let that = this;
		let argument = {
			annee: this.Rot.annee,
			mois: this.Rot.mois
		};
		let observ = this.immoService.immoTopic("listeCongeAgentSecInt", argument, true).subscribe(obs => {
			console.log("listeCongeAgentSecInt",obs);
			if(obs.success){
				let liste = obs.msg;
				for (let i = 0; i < liste.length; i++) {
					let nouv = liste[i];
					let objetEvent = {
						id: "c" + liste[i].idConge,
						start: liste[i].debutConge,
						end: liste[i].finConge + "T23:59",
						title: null,
						backgroundColor: that.Rot.couleurConge,
						textColor: "white",
						conge: liste[i]
					};
					let observ2 = this.immoService.immoTopic("detailsAgentSecInt", nouv.idAgentSec, false).subscribe(obs2 => {
						console.log("detailsAgentSecInt",obs2);
						if (obs2.success) {
							nouv["agent"] = obs2.msg;
							that.Rot.listeConge.push(nouv);
							objetEvent["agent"] = obs2.msg;
							objetEvent.title = obs2.msg.matricule + " - En congé";
							that.fullcalendar.fullCalendar('renderEvent', objetEvent);
						}
						else {
							that.toast.error(obs2.msg);
						}
						observ2.unsubscribe();
					});
				}
			}
			observ.unsubscribe();
		});
	}

	ouvreModalSite() {
		$(this.modalAjoutModifRot.nativeElement).modal("hide");
		$(this.modalAjoutSite.nativeElement).modal("show");
		if (this.Site.provinces.length == 0) {
			let that = this;
			let observ = this.immoService.immoTopic("listeProvinceInt", "", false).subscribe(obs => {
				if (obs.success) {
					that.Site.provinces = obs.msg;
				}
				observ.unsubscribe();
			});
		}
	}

	provinceChange() {
		let that = this;
		let observ = this.immoService.immoTopic("listeRegionInt", this.Site.champ.idProv, false).subscribe(obs => {
			if (obs.success) {
				that.Site.regions = obs.msg;
			}
			observ.unsubscribe();
		});
	}

	fermeModalSite() {
		$(this.modalAjoutSite.nativeElement).modal("hide");
		$(this.modalAjoutModifRot.nativeElement).modal("show");
	}

	champSiteBon() {
		this.Site.champ.libelleCommune = this.Site.champ.libelleCommune.trim();
		this.Site.champ.libelleLoc = this.Site.champ.libelleLoc.trim();
		if (this.Site.champ.idProv == "") {
			return { estBon: false, msg: "Veuillez choisir une province" };
		}
		if (this.Site.champ.idReg == "") {
			return { estBon: false, msg: "Veuillez choisir une région" };
		}
		if (this.Site.champ.libelleCommune == "") {
			return { estBon: false, msg: "Commune invalide" };
		}
		if (this.Site.champ.libelleLoc == "") {
			return { estBon: false, msg: "L'indication de la localisation est invalide" };
		}
		return { estBon: true, msg: null };
	}

	enregistreSite() {
		let verif = this.champSiteBon();
		if (!verif.estBon) {
			this.toast.error(verif.msg);
		}
		else {
			this.Site.chargeModal = true;
			let that = this;
			let observ = this.immoService.immoTopic("ajoutLocalisationInt", this.Site.champ, true).subscribe(obs => {
				console.log("ajoutLocalisationInt",obs);
				if (obs.success) {
					if (obs.msg != null) {
						let nouvSite = obs.msg;
						that.Rot.ngxSite = [{ id: nouvSite.idLoc, text: nouvSite.libelle }];
						that.Rot.champ.idLoc = nouvSite.idLoc;
						that.fermeModalSite();
						that.Site.champ.libelleCommune = "";
						that.Site.champ.libelleLoc = "";
					}
					else {
						that.toast.error("Erreur du serveur");
					}
				}
				else {
					that.toast.error(obs.msg);
				}
				this.Site.chargeModal = false;
				observ.unsubscribe();
			});
		}
	}

	afficheChargement() {
		$(this.modalChargement.nativeElement).modal("show");
	}

	fermeChargement() {
		$(this.modalChargement.nativeElement).modal('hide');
	}

	prendHeureSansSeconde(heure:string){
		let str = heure.split(":");
		return str[0]+":"+str[1];
	}

	/**
	 * 
	 * @param matricules string contenant une liste de matricule séparé par virgule
	 * retourne un tableau de string (matricule)
	 */
	separeMatricule(matricules:string){
		let liste = matricules.split(",");
		let resultat = [];
		for(let i=0; i<liste.length; i++){
			let matr = liste[i].trim();
			if(matr != ""){
				resultat.push(matr);
			}
		}
		return resultat;
	}

	avoirStatut(statut){
		if(statut == 1){
			return "ACTIVE";
		}
		return "NON ACTIVE";
	}

}
