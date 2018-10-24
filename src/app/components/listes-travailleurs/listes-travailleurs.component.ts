import { Component, OnInit } from '@angular/core';
import { IndividuService } from '../../services/individu/individu.service';

@Component({
  selector: 'app-listes-travailleurs',
  templateUrl: './listes-travailleurs.component.html',
  styleUrls: ['./listes-travailleurs.component.css']
})
export class ListesTravailleursComponent implements OnInit {

  private user: any;
  infoContrat: any[];
  infoIndividu: any;

  matriculeIndiv;
  info: any[] = [];
  constructor(private individuService: IndividuService) { }

  ngOnInit() {
    this.liste_travailleur();
  }

  liste_travailleur() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.individuService.listTravailleur(this.user.id_acces).subscribe(
      (dataRes) => {
        this.infoContrat = dataRes.msg;

        for (let i = 0; this.infoContrat.length; i++) {
          const cc: any = {
            date: this.infoContrat[i].date_debut,
            salaire: this.infoContrat[i].salaire_fixe,
            matricule: this.infoContrat[i].id_individu
          };
          this.individuService.infoIndiv(this.infoContrat[i].id_individu).subscribe(
            (res) => {

              this.infoIndividu = res.msg;
              cc.nom = this.infoIndividu.nom;
              cc.prenom = this.infoIndividu.prenoms;
              this.info.push(cc);
            }
          );
        }
        // console.log(this.info);
      });
  }
}
