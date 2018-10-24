import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EmployeurService } from '../../services/employeur/employeur.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InfoService } from '../../services/info/info.service';
import set = Reflect.set;

@Component({
  selector: 'app-modifier-responsable',
  templateUrl: './modifier-responsable.component.html',
  styleUrls: ['./modifier-responsable.component.css']
})
export class ModifierResponsableComponent implements OnInit, AfterViewInit {
  public show: boolean;
  private user: any;
  nom: string;
  prenom: string;
  fonction: string;
  date_debut: string;
  date_fin: string;
  e_mail: string;
  dataResponsable: any;
  dataResponsableUpdate: any;
  textInput: any;

  constructor(
    private employeurService: EmployeurService,
    private infoService: InfoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.show = false;
  }
  ngAfterViewInit() {
    this.textInput = document.getElementById('matricule');
    let timeout = null;
    const text = this.textInput;
    const component = this;
    this.textInput.onkeyup = function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        component.initDataFind(component.textInput.value);
      }, 1000);
    };
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.employeurService.responsableEmployeur(this.user.id_acces).subscribe(data => {
      if (data.success) {
        this.dataResponsable = data.msg[0];
        if (this.dataResponsable) {
          this.nom = this.dataResponsable.nom_resp;
          this.prenom = this.dataResponsable.prenom_resp;
          this.fonction = this.dataResponsable.fonction_resp;
          this.date_debut = this.dataResponsable.date_debut;
          this.date_fin = this.dataResponsable.date_fin;
          this.e_mail = this.dataResponsable.resp_mail;
        }
      } else {
        setTimeout( () => this.toastr.error(data.msg));
      }
    });

  }
  ngOnSubmitChange() {

    this.show = true;
    this.dataResponsableUpdate = {
      nom_resp: this.nom,
      prenom_resp: this.prenom,
      fonction_resp: this.fonction,
      date_debut: this.date_debut,
      date_fin: this.date_fin,
      resp_mail: this.e_mail,
      id_empl: this.user.id_acces
    };
    const data = {
      data: this.dataResponsableUpdate
    };
    console.log(this.dataResponsable);
    if (this.dataResponsable !== undefined && this.dataResponsable.hasOwnProperty('date_fin')) {
      const now = new Date();
      const fin = new Date(this.dataResponsable.date_fin);
      if (fin <= now) {
        this.employeurService.updateResponsableEmployeur(data).subscribe(dataResponse => {
          if (dataResponse.success) {
            this.show = false;
            setTimeout( () => this.toastr.success(dataResponse.msg, 'Mise à jour'));
            this.router.navigate(['/accueil-connecte']);
          } else {
            this.show = false;
            setTimeout( () => this.toastr.error(dataResponse.msg, 'Erreur'));
          }
        }
        );
      } else {
        this.show = false;
        setTimeout( () => this.toastr.error('Vous ne pouvez pas encore changer de responsable', 'Erreur de date'));
      }
    } else {
      this.employeurService.updateResponsableEmployeur(data).subscribe(dataResponse => {
        if (dataResponse.success) {
          this.show = false;
          setTimeout( () => this.toastr.success(dataResponse.msg, 'Mise à jour'));
          this.router.navigate(['/accueil-connecte']);
        } else {
          this.show = false;
          setTimeout( () => this.toastr.error(dataResponse.msg, 'Erreur'));
        }
      }
      );
    }

  }
  initDataFind(matricule: string) {
    this.infoService.infoIndiv(matricule).subscribe(data => {
      if (data.success) {
        const dataTemp = data.msg;
        this.nom = dataTemp.nom;
        this.prenom = dataTemp.prenoms;
        this.infoService.infoAdresse(matricule).subscribe(dataAdresse => {
          if (dataAdresse.success) {
            if (dataAdresse.msg.length > 0) {
              const adresseTemp = dataAdresse.msg[0];
              this.e_mail = adresseTemp.adresse_e_mail;
            }
          } else {
            setTimeout( () => this.toastr.error(dataAdresse.msg));
          }
        });
      } else {
        setTimeout( () => this.toastr.error('impossible de trouver la personne cause : ' + data.msg));
      }
    });
  }

}

