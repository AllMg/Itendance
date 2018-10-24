import { Component, OnInit } from '@angular/core';
import {DnService} from '../../services/dn/dn.service';

@Component({
  selector: 'app-dn-validation',
  templateUrl: './dn-validation.component.html',
  styleUrls: ['./dn-validation.component.css']
})
export class DnValidationComponent implements OnInit {
  listeDn: any[];
	plafond: any;
	regime: any;
	tauxTrav: any;
	tauxPatr: any;
  somTotSalNonPlaf: any;
  somTotSalPlaf: any;
  somCotPartSalariale: any;
  somCotPartPatronale: any;
  somTotCotisation: any;
	user: any;
	entity: any;
	occ = ['CDD','CDI','OCCASIONNEL'];

  constructor(
    private dnService: DnService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
		console.log(this.user.id_acces);
		this.entity = this.user.type_entite;
  }

  searchDnMatr(periode: string, matricule: string){
    this.dnService.getDnByPeriode(matricule, periode).subscribe(data => {
      console.log(data);
      if (data.success) {
        console.log('data',data);
        this.listeDn = data.msg.listeTravailleur;
        this.somTotSalPlaf = Number(data.msg.somTotSalPlaf).toFixed(2);
        this.somTotSalNonPlaf = Number(data.msg.somTotSalNonPlaf).toFixed(2);
        this.somTotCotisation = Number(data.msg.somTotCotisation).toFixed(2);
        this.somCotPartSalariale = Number(data.msg.somCotPartSalariale).toFixed(2);
        this.somCotPartPatronale = Number(data.msg.somCotPartPatronale).toFixed(2);
        this.regime = data.msg.regime;
        this.tauxTrav = data.msg.tauxTrav;
        this.tauxPatr = data.msg.tauxEmpl;
        this.plafond = data.msg.montantPlafond;
      } else {
        alert(data.msg);
      }
    });
  }

}
