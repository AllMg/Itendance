import { Component, OnInit } from '@angular/core';
import {DnService} from '../../services/dn/dn.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dn',
  templateUrl: './dn.component.html',
  styleUrls: ['./dn.component.css']
})
export class DnComponent implements OnInit {
	idEmpl: any;
	listeDn: any[];
	plafond: any;
	regime: any;
	tauxTrav: any;
	tauxTravRc: any;
	tauxPatr: any;
	tauxPatrRc: any;
  	somTotSalNonPlaf: any;
  	somTotSalPlaf: any;
  	somCotPartSalariale: any;
  	somCotPartSalarialeRc: any;
  	somCotPartPatronale: any;
  	somCotPartPatronaleRc: any;
	somTotCotisation: any;
	somTotCotisationRc: any;
	totCotisation: any;
	effectif: any;
	periode: any = '';
	rc: any;
	idDn: any;
	user: any;
	entity: any;
	occ = ['CDD','CDI','OCCASIONNEL'];
	selectedFiles: FileList;
	currentFileUpload: File  = null;
	public show: boolean = false;
	salM1: number[];
	salM2: number[];
	salM3: number[];
	statut: any = 'Non déclaré';
	dateDeclaration: any;
	dateValidation: any;
	error: any=false;

  constructor(
		private dnService: DnService,
		private router: Router,
		private toastr: ToastrService,
		private route: ActivatedRoute
  ) { 
  }	

  	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.entity = this.user.type_entite;
		this.route.params.subscribe((params: Params) => {
			if(typeof params['periode'] !== 'undefined') this.periode = params['periode'];
			else this.periode = this.getPeriodeByDate(new Date());
			if(typeof params['matricule'] !== 'undefined' && this.entity!=='E' && this.entity!=='T') this.idEmpl = params['matricule'];
			else this.idEmpl = this.user.id_acces;
		});
		// console.log(this.user);
		if(this.entity == 'E'){
			this.searchDn(this.periode, this.idEmpl);
		}
		// this.dnService.getHistoriqueDn(this.idEmpl, 50, 1).subscribe(data=>{console.log(data);});
	}
	
	onChange(value) {
		console.log(value);
		console.log(this.listeDn[0].typeContrat);
	}

  	searchDn(periode: string, matricule: string){
		if(matricule == '') matricule = this.user.id_acces;
		if(typeof matricule === 'undefined' || typeof periode === 'undefined' || periode == '') alert('Veuillez remplir tous les champs.');
		else {
			this.dnService.getDnByPeriode(matricule, periode).subscribe(data => {
				console.log(data);
				if (data.success) {
					this.show = true;
					this.listeDn = data.msg.listeTravailleur;
					this.periode = data.msg.periode;
					this.somTotSalPlaf = Number(data.msg.somTotSalPlaf).toFixed(2);
					this.somTotSalNonPlaf = Number(data.msg.somTotSalNonPlaf).toFixed(2);
					this.somTotCotisation = Number(data.msg.somTotCotisation).toFixed(2);
					this.somCotPartSalarialeRc = Number(data.msg.somCotPartSalarialeRc).toFixed(2);
					this.somCotPartSalariale = Number(data.msg.somCotPartSalariale).toFixed(2);
					this.somCotPartPatronaleRc = Number(data.msg.somCotPartPatronaleRc).toFixed(2);
					this.somCotPartPatronale = Number(data.msg.somCotPartPatronale).toFixed(2);
					this.totCotisation = Number(data.msg.totCotisation).toFixed(2);
					this.regime = data.msg.regime;
					this.tauxTrav = Number(data.msg.tauxTrav)/100;
					this.tauxTravRc = Number(data.msg.tauxTravRc)/100;
					this.tauxPatr = Number(data.msg.tauxEmpl)/100;
					this.tauxPatrRc = Number(data.msg.tauxEmplRc)/100;
					this.plafond = Number(data.msg.montantPlafond);
					this.dateDeclaration = data.msg.dateDeclaration;
					this.dateValidation = data.msg.dateValidation;
					this.rc = data.msg.rc;
					this.idDn = data.msg.idDn;
					if(this.dateDeclaration === null) this.statut = 'Non déclaré';
					if(this.dateDeclaration !== null) this.statut = 'Déclaré';
					if(this.dateValidation !== null) this.statut = 'Validé';
					this.salM1 = [];
					this.salM2 = [];
					this.salM3 = [];
					for (let index = 0; index < this.listeDn.length; index++) {
						this.salM1.push(this.listeDn[index].salM1);
						this.salM2.push(this.listeDn[index].salM2);
						this.salM3.push(this.listeDn[index].salM3);
					}
					// this.toastr.success("Affichage des données avec succès.");
				} else {
					this.error = true;
					this.show = true;
					this.listeDn = null;
					this.somTotSalPlaf = 0.00;
					this.somTotSalNonPlaf = 0.00;
					this.somTotCotisation = 0.00;
					this.somCotPartSalariale = 0.00;
					this.somCotPartSalarialeRc = 0.00;
					this.somCotPartPatronale = 0.00;
					this.somCotPartPatronaleRc = 0.00;
					this.toastr.error(data.msg);
				}
			});
		}
	}

	calcul(i: number){
		this.somTotSalNonPlaf = 0;
		this.somTotSalPlaf = 0;
		this.somCotPartSalariale = 0;
		this.somCotPartPatronale = 0;
		this.somCotPartSalarialeRc = 0;
		this.somCotPartPatronaleRc = 0;
		this.somTotCotisation = 0;
		this.somTotCotisationRc = 0;
		this.totCotisation = 0;
		if(this.regime=='REGIME GENERAL' || this.regime=='REGIME AGRICOLE'){
			this.listeDn[i].totSalNonPlaf = Number(this.listeDn[i].salM1) + Number(this.listeDn[i].avtM1) +
											Number(this.listeDn[i].salM2) + Number(this.listeDn[i].avtM2) + 
											Number(this.listeDn[i].salM3) + Number(this.listeDn[i].avtM3);
			if(this.listeDn[i].totSalNonPlaf<this.plafond*3) this.listeDn[i].totSalPlaf = this.listeDn[i].totSalNonPlaf;
			else this.listeDn[i].totSalPlaf = Number(this.plafond*3).toFixed(2);
			this.listeDn[i].cotPartSalariale = this.listeDn[i].totSalPlaf*this.tauxTrav;
			this.listeDn[i].cotPartPatronale = this.listeDn[i].totSalPlaf*this.tauxPatr;
			this.listeDn[i].cotPartSalarialeRc = this.listeDn[i].totSalPlaf*this.tauxTravRc;
			this.listeDn[i].cotPartPatronaleRc = this.listeDn[i].totSalPlaf*this.tauxPatrRc;
			this.listeDn[i].totCotisation = Number(this.listeDn[i].cotPartPatronale) + Number(this.listeDn[i].cotPartSalariale);
			this.listeDn[i].totCotisationRc = Number(this.listeDn[i].cotPartPatronaleRc) + Number(this.listeDn[i].cotPartSalarialeRc);
			this.listeDn[i].cotisation = this.listeDn[i].totCotisation + this.listeDn[i].totCotisationRc;
			document.getElementsByClassName("totSalNonPlaf")[i].textContent = Number(this.listeDn[i].totSalNonPlaf).toFixed(2);
			document.getElementsByClassName("totSalPlaf")[i].textContent = Number(this.listeDn[i].totSalPlaf).toFixed(2);
			document.getElementsByClassName("cotPartSalariale")[i].textContent = Number(this.listeDn[i].cotPartSalariale).toFixed(2);
			document.getElementsByClassName("cotPartPatronale")[i].textContent = Number(this.listeDn[i].cotPartPatronale).toFixed(2);
			document.getElementsByClassName("cotPartSalarialeRc")[i].textContent = Number(this.listeDn[i].cotPartSalarialeRc).toFixed(2);
			document.getElementsByClassName("cotPartPatronaleRc")[i].textContent = Number(this.listeDn[i].cotPartPatronaleRc).toFixed(2);
			document.getElementsByClassName("cotisation")[i].textContent = Number(this.listeDn[i].cotisation).toFixed(2);
			for (let k = 0; k < this.listeDn.length; k++) {
				this.somTotSalNonPlaf += this.listeDn[k].totSalNonPlaf;
				this.somTotSalPlaf += this.listeDn[k].totSalPlaf;
				this.somCotPartSalariale += this.listeDn[k].cotPartSalariale;
				this.somCotPartPatronale += this.listeDn[k].cotPartPatronale;
				this.somCotPartSalarialeRc += this.listeDn[k].cotPartSalarialeRc;
				this.somCotPartPatronaleRc += this.listeDn[k].cotPartPatronaleRc;
			}
			this.somTotCotisation += this.somCotPartSalariale + this.somCotPartPatronale;
			this.somTotCotisationRc += this.somCotPartSalarialeRc + this.somCotPartPatronaleRc;
			this.totCotisation = this.somTotCotisation + this.somTotCotisationRc;
			document.getElementById("somTotSalNonPlaf").textContent = ''+Number(this.somTotSalNonPlaf).toFixed(2)+' AR';
			document.getElementById("somTotSalPlaf").textContent = ''+Number(this.somTotSalPlaf).toFixed(2)+' AR';
			document.getElementById("somCotPartSalariale").textContent = ''+Number(this.somCotPartSalariale).toFixed(2)+' AR';
			document.getElementById("somCotPartPatronale").textContent = ''+Number(this.somCotPartPatronale).toFixed(2)+' AR';
			document.getElementById("somCotPartSalarialeRc").textContent = ''+Number(this.somCotPartSalarialeRc).toFixed(2)+' AR';
			document.getElementById("somCotPartPatronaleRc").textContent = ''+Number(this.somCotPartPatronaleRc).toFixed(2)+' AR';
			document.getElementById("totCotisation").textContent = ''+Number(this.totCotisation).toFixed(2)+' AR';
		}
		if(this.regime=='GENS DE MAISON'){
			this.listeDn[i].cotPartSalariale = this.tauxTrav;
			this.listeDn[i].cotPartPatronale = this.tauxPatr;		
			this.listeDn[i].totCotisation = this.listeDn[i].cotPartPatronale + this.listeDn[i].cotPartSalariale;
			document.getElementsByClassName("cotPartSalariale")[i].textContent = this.listeDn[i].cotPartSalariale;
			document.getElementsByClassName("cotPartPatronale")[i].textContent = this.listeDn[i].cotPartPatronale;
			document.getElementsByClassName("totCotisation")[i].textContent = this.listeDn[i].totCotisation;
			for (let k = 0; k < this.listeDn.length; k++) {
				this.somCotPartSalariale += this.listeDn[k].cotPartSalariale;
				this.somCotPartPatronale += this.listeDn[k].cotPartPatronale;
				this.somTotCotisation += this.listeDn[k].totCotisation;
			}
			document.getElementById("somCotPartSalariale").textContent = ''+this.somCotPartSalariale.toFixed(2)+' AR';
			document.getElementById("somCotPartPatronale").textContent = ''+this.somCotPartPatronale.toFixed(2)+' AR';
			document.getElementById("somTotCotisation").textContent = ''+this.somTotCotisation.toFixed(2)+' AR';
		}
	}

	checkSalM1(i:number){
		if(this.listeDn[i].salM1<this.salM1[i]){
			this.listeDn[i].salM1=this.salM1[i];
			this.toastr.error("Le salaire d'un travailleur ne peut pas être réduit.");
		}
		if(this.listeDn[i].salM1>this.listeDn[i].salM2) this.listeDn[i].salM2=this.listeDn[i].salM1;
	}
	checkSalM2(i:number){
		if(this.listeDn[i].salM2<this.salM2[i]){
			this.listeDn[i].salM2=this.salM2[i];
			this.toastr.error("Le salaire d'un travailleur ne peut pas être réduit.");
		}
		if(this.listeDn[i].salM2>this.listeDn[i].salM3) this.listeDn[i].salM3=this.listeDn[i].salM2;
	}
	checkSalM3(i:number){
		if(this.listeDn[i].salM3<this.salM3[i]){
			this.listeDn[i].salM3=this.salM3[i];
			this.toastr.error("Le salaire d'un travailleur ne peut pas être réduit.");
		}
	}

  	saveDn(event){
		if(typeof this.selectedFiles!=='undefined') this.upload(event);
		if(typeof this.selectedFiles==='undefined') this.saveWithoutFile(event);
	}

	saveWithoutFile(event){
		// var liste = [];
		// for(var i=0; i<this.listeDn.length; i++){
		// 	liste.push(
		// 		{
		// 			id_individu: this.listeDn[i].matricule,
		// 			id_empl: this.user.id_acces,
		// 			date_debut_contrat: this.listeDn[i].dateDebutContrat,
		// 			date_fin_contrat : this.listeDn[i].dateFinContrat,
		// 			sal_m1 : this.listeDn[i].salM1,
		// 			avt_m1 : this.listeDn[i].avtM1,
		// 			tp_m1 : this.listeDn[i].tpM1,
		// 			sal_m2 : this.listeDn[i].salM2,
		// 			avt_m2 : this.listeDn[i].avtM2,
		// 			tp_m2 : this.listeDn[i].tpM2,
		// 			sal_m3 : this.listeDn[i].salM3,
		// 			avt_m3 : this.listeDn[i].avtM3,
		// 			tp_m3 : this.listeDn[i].tpM3,
		// 			dn_rc : this.rc,
		// 			type_contrat : this.listeDn[i].typeContrat,
		// 			totSalPlaf : this.listeDn[i].totSalPlaf,
		// 			totSalNonPlaf : this.listeDn[i].totSalNonPlaf,
		// 			cotPartSalariale : this.listeDn[i].cotPartSalariale,
		// 			cotPartSalarialeRc : this.listeDn[i].cotPartSalarialeRc,
		// 			cotPartPatronale : this.listeDn[i].cotPartPatronale,
		// 			cotPartPatronaleRc : this.listeDn[i].cotPartPatronaleRc,
		// 			totCotisation : this.listeDn[i].totCotisation
		// 		}
		// 	);
		// }
		// console.log(liste);
		event.target.disabled=true;
		const msg = {
			idDn: this.idDn,
			idEmpl: this.idEmpl,
			montantPlafond: this.plafond,
			listeTravailleur: this.listeDn,
			periode: this.periode,
			somTotSalNonPlaf: this.somTotSalNonPlaf,
			somTotSalPlaf: this.somTotSalPlaf,
			somCotPartSalariale: this.somCotPartSalariale,
			somCotPartPatronale: this.somCotPartPatronale,
			somCotPartSalarialeRc: this.somCotPartSalarialeRc,
			somCotPartPatronaleRc: this.somCotPartPatronaleRc,
			somTotCotisation: this.somTotCotisation,
			somTotCotisationRc: this.somTotCotisationRc,
			totCotisation: this.totCotisation
		};
		console.log(msg);
		this.dnService.saveDn(msg).subscribe(data => {
			// console.log(data);
			if (data.success && data.msg.success==true) {
				this.toastr.success("Votre déclaration nominative des salaires a été effectué avec succès.");
				this.router.navigate(['/accueil-connecte']);
			} else {
				event.target.disabled=false;
				this.toastr.error(data.msg);
			}
		});
	}
	
	addLine(){
		this.listeDn.push({
			matricule: '',
			nom: '',
			prenoms: '',
			periode: this.periode,
			dateDebutContrat: null,
			dateFinContrat : null,
			salM1 : 0,
			avtM1 : 0,
			tpM1 : 30,
			salM2 : 0,
			avtM2 : 0,
			tpM2 : 30,
			salM3 : 0,
			avtM3 : 0,
			tpM3 : 30,
			typeContrat : 'CDD',
			totSalPlaf : 0,
			totSalNonPlaf : 0,
			cotPartSalariale : 0,
			cotPartPatronale : 0,
			totCotisation : 0,
			new: true
		});
	}
	deleteLine(){
		let del = document.querySelectorAll('[name="del"]:checked');
		let i = [];
		Array.prototype.forEach.call(del, function(el) {
			i.push(el.value);
		});
		for (let index = 0; index < i.length; index++) {
			// console.log(i[index]);
			this.listeDn.splice(i[index]-index, 1);
		}
	}

	handleFileInput(files: FileList) {
    	this.selectedFiles = files;
	}

	upload(event) {
		// 	console.log(this.selectedFiles);
		this.currentFileUpload = this.selectedFiles.item(0);
		this.dnService.pushFileToStorage(this.currentFileUpload).subscribe(
		data => {
			console.log(data);
		}, error => {
		  this.toastr.error(error);
		});
		this.selectedFiles = null;
	}  

	getPeriodeByDate(today: Date) {
		let periode = "";
		switch (today.getMonth()) {
		case 1:  periode = (today.getFullYear())+"01";
        break;
		case 2:  periode = (today.getFullYear())+"01";
        break;
		case 3:  periode = (today.getFullYear())+"01";
		break;
		case 4:  periode = (today.getFullYear())+"02";
        break;
		case 5:  periode = (today.getFullYear())+"02";
        break;
		case 6:  periode = (today.getFullYear())+"02";
        break;
		case 7:  periode = (today.getFullYear())+"03";
        break;
		case 8:  periode = (today.getFullYear())+"03";
        break;
        case 9:  periode = (today.getFullYear())+"03";
        break;
        case 10:  periode = (today.getFullYear())+"04";
        break;
        case 11:  periode = (today.getFullYear())+"04";
        break;
        case 0:  periode = (today.getFullYear())+"04";
        break;
		}
		return periode;
	}
}
